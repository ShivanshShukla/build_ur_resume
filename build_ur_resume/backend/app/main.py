# backend/app/main.py
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

# add this import
from starlette.middleware.sessions import SessionMiddleware

from app.routers import resumes
from app.config import settings
from app.routers import auth

app = FastAPI(title="Resume Builder Backend")

# CORS (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allow_origins,  # note: use lowercase attr from your Settings
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ADD SESSION MIDDLEWARE HERE ---
# session secret: use a dedicated SESSION_SECRET in env or fallback to JWT_SECRET for dev
session_secret = getattr(settings, "SESSION_SECRET", None) or settings.JWT_SECRET
app.add_middleware(
    SessionMiddleware,
    secret_key=session_secret,
    session_cookie="resume_session",     # optional: cookie name
    same_site="lax",                     # lax is good for most OAuth flows
    https_only=False,                    # set True in production (HTTPS)
)

# include routers AFTER middleware installation
app.include_router(resumes.router)
app.include_router(auth.router)

@app.get("/", summary="Root health check")
async def root():
    return {"message": "Backend is running!"}
