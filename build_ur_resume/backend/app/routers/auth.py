from fastapi import APIRouter, HTTPException, status, Depends, Request, Header
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from typing import Optional
from app.core.security import hash_password, verify_password, create_access_token, decode_access_token
# NOTE: do NOT import get_db at module level to avoid circular imports
from app.models.user import RegisterIn, LoginIn, TokenOut, UserOut
from authlib.integrations.starlette_client import OAuth
from app.config import settings
from bson import ObjectId
import logging
import json
from authlib.integrations.base_client import OAuthError
import httpx


logger = logging.getLogger("auth")
router = APIRouter(prefix="/api/auth", tags=["auth"])

# Initialize OAuth (Authlib)
oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)
oauth.register(
    name="github",
    client_id=settings.GITHUB_CLIENT_ID,
    client_secret=settings.GITHUB_CLIENT_SECRET,
    access_token_url="https://github.com/login/oauth/access_token",
    authorize_url="https://github.com/login/oauth/authorize",
    api_base_url="https://api.github.com/",
    client_kwargs={"scope": "user:email"},
)


# ---------- email/password ----------
@router.post("/register", status_code=201)
async def register(payload: RegisterIn):
    # lazy import to avoid circular import issues
    from app.db import get_db
    db = get_db()

    existing = await db.users.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    doc = {
        "email": payload.email,
        "hashed_password": hash_password(payload.password),
        "full_name": payload.full_name,
        "oauth_provider": None,
    }
    res = await db.users.insert_one(doc)
    return {"msg": "registered", "user_id": str(res.inserted_id)}


@router.post("/login", response_model=TokenOut)
async def login(payload: LoginIn):
    from app.db import get_db
    db = get_db()

    user = await db.users.find_one({"email": payload.email})
    if not user or not user.get("hashed_password"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not verify_password(payload.password, user["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(str(user["_id"]))
    return {"access_token": token, "token_type": "bearer"}


# ---------- simple protected endpoint ----------
async def get_current_user(token: Optional[str] = None):
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    try:
        payload = decode_access_token(token)
        sub = payload.get("sub")
        from app.db import get_db
        db = get_db()

        user = await db.users.find_one({"_id": ObjectId(sub)})
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")
        user["_id"] = str(user["_id"])
        return user
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_user_from_header(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header")
    token = authorization.split(" ", 1)[1].strip()
    return await get_current_user(token)


@router.get("/me", response_model=UserOut)
async def me(user=Depends(get_user_from_header)):
    user["_id"] = str(user["_id"])
    return user


# ---------- OAuth endpoints ----------
@router.get("/oauth/{provider}/login")
async def oauth_login(request: Request, provider: str):
    if provider not in ("google", "github"):
        raise HTTPException(status_code=400, detail="unknown provider")
    redirect_uri = f"{settings.BACKEND_URL}/api/auth/oauth/{provider}/callback"
    return await oauth.create_client(provider).authorize_redirect(request, redirect_uri)

@router.get("/oauth/{provider}/callback")
async def oauth_callback(request: Request, provider: str):
    if provider not in ("google", "github"):
        raise HTTPException(status_code=400)

    client = oauth.create_client(provider)
    if client is None:
        raise HTTPException(status_code=500, detail=f"OAuth client for {provider} not available")

    # 1) exchange code for token
    try:
        token = await client.authorize_access_token(request)
    except OAuthError as e:
        logger.exception("OAuthError during authorize_access_token")
        raise HTTPException(status_code=400, detail=f"OAuth token exchange failed: {str(e)}")
    except Exception as e:
        logger.exception("Unexpected error during token exchange")
        raise HTTPException(status_code=500, detail="Unexpected token exchange error")

    # Log token (dev only)
    logger.info("OAuth token response for %s: %s", provider, json.dumps(token, default=str))

    email = None
    name = None
    profile = {}

    # -------------------------
    # GOOGLE flow
    # -------------------------
    if provider == "google":
        # 2) If id_token is present, try to parse it (OIDC)
        id_token = token.get("id_token")
        if id_token:
            try:
                # FIX: Pass None for nonce to satisfy the required argument
                userinfo = await client.parse_id_token(token, None)
                profile = userinfo or {}
                email = profile.get("email")
                name = profile.get("name") or profile.get("given_name")
                logger.info("Parsed id_token userinfo: %s", profile)
            except Exception:
                logger.exception("Failed to parse id_token; will try userinfo endpoint")

        # 3) If email is still missing, try client.get('userinfo')
        if not email:
            try:
                # FIX: Use absolute URL to prevent httpx.UnsupportedProtocol error
                google_userinfo_url = "https://openidconnect.googleapis.com/v1/userinfo"
                resp = await client.get(google_userinfo_url, token=token)
                
                # resp may be a Response-like object; try .json() first
                try:
                    profile = resp.json() if hasattr(resp, "json") else dict(resp)
                except Exception:
                    # fallback: if resp is httpx.Response but .json() raises, call as await resp.json()
                    try:
                        profile = await resp.json()  # in case it's async
                    except Exception:
                        profile = {}
                email = profile.get("email")
                name = profile.get("name") or profile.get("given_name")
                logger.info("Userinfo via client.get: %s", profile)
            except Exception:
                logger.exception("client.get('userinfo') failed — will try manual HTTP call")

        # 4) Final fallback: manual HTTP GET to Google's known endpoint using access_token
        if not email:
            access_token = token.get("access_token")
            if not access_token:
                logger.error("No access_token available in token response: %s", token)
                raise HTTPException(status_code=400, detail="No access token returned by provider")
            try:
                # use Google's standard OIDC userinfo endpoint
                userinfo_url = "https://openidconnect.googleapis.com/v1/userinfo"
                async with httpx.AsyncClient(timeout=10.0) as client_http:
                    r = await client_http.get(userinfo_url, headers={"Authorization": f"Bearer {access_token}"})
                    r.raise_for_status()
                    profile = r.json()
                email = profile.get("email")
                name = profile.get("name") or profile.get("given_name")
                logger.info("Userinfo via manual HTTP call: %s", profile)
            except httpx.HTTPStatusError as e:
                logger.exception("HTTP error while calling Google userinfo endpoint: %s", e)
                raise HTTPException(status_code=502, detail="Failed to fetch userinfo from Google (HTTP error)")
            except Exception:
                logger.exception("Final fallback to userinfo endpoint failed")
                raise HTTPException(status_code=500, detail="Failed to obtain user profile from Google")

    # -------------------------
    # GITHUB flow
    # -------------------------
    else:  # github
        try:
            resp = await client.get("user", token=token)
            profile = resp.json()
            email = profile.get("email")
            name = profile.get("name") or profile.get("login")
            if not email:
                # try /user/emails
                emails_resp = await client.get("user/emails", token=token)
                emails = emails_resp.json() or []
                for e in emails:
                    if e.get("primary") or e.get("verified"):
                        email = e.get("email")
                        break
            logger.info("GitHub profile: %s", profile)
        except Exception:
            logger.exception("Failed to fetch GitHub profile")
            raise HTTPException(status_code=500, detail="Failed to obtain user profile from GitHub")

    # At this point we should have an email
    if not email:
        logger.error("OAuth login did not yield an email. profile: %s token: %s", profile, token)
        raise HTTPException(status_code=400, detail="No email returned by OAuth provider")

    # create or update user in DB
    from app.db import get_db
    db = get_db()
    existing = await db.users.find_one({"email": email})
    if existing:
        await db.users.update_one({"_id": existing["_id"]}, {"$set": {"oauth_provider": provider}})
        user_id = str(existing["_id"])
    else:
        new_doc = {"email": email, "full_name": name, "oauth_provider": provider}
        res = await db.users.insert_one(new_doc)
        user_id = str(res.inserted_id)

    # create JWT and redirect to frontend with token (quick dev flow)
    access_token = create_access_token(user_id)
    frontend_redirect = f"{settings.FRONTEND_URL}/oauth-callback?access_token={access_token}"
    return RedirectResponse(frontend_redirect)