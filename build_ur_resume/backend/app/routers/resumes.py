# app/routers/resumes.py
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Body
from app.config import settings
from bson import ObjectId, errors as bson_errors
from app.db.client import db  # keep this if your project exposes 'db' from this module
from app.services.storage import upload
from app.workers.tasks import enqueue_parse_resume
from app.models.pydantic_models import UploadResponse, ParsedResume
from bson import ObjectId
import datetime
import os

router = APIRouter(prefix="/api/resumes", tags=["resumes"])

# quick demo user dependency (replace with real auth later)
async def get_current_user():
    return {"_id": "demo_user_id", "email": "demo@example.com"}

@router.post("/upload", response_model=UploadResponse)
async def upload_resume(file: UploadFile = File(...), current_user=Depends(get_current_user)):
    # validate content type
    allowed = (
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    )
    if file.content_type not in allowed:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    contents = await file.read()
    size_mb = len(contents) / (1024 * 1024)
    # NOTE: settings name: if your Settings uses MAX_UPLOAD_SIZE_MB use that, else max_upload_size_mb
    max_mb = getattr(settings, "MAX_UPLOAD_SIZE_MB", None) or getattr(settings, "max_upload_size_mb", 8)
    if size_mb > int(max_mb):
        raise HTTPException(status_code=400, detail=f"File too large (max {max_mb} MB)")

    # build key (safe path)
    ts = int(datetime.datetime.utcnow().timestamp())
    filename = os.path.basename(file.filename)
    key = f"{current_user['_id']}/{ts}_{filename}"

    # store file (returns absolute path)
    storage_path = upload(key, contents, file.content_type)

    # create DB record - use db (pymongo Motor or client depends)
    rec = {
        "user_id": current_user["_id"],
        "filename": filename,
        "storage_path": storage_path,
        "status": "queued",
        "created_at": datetime.datetime.utcnow(),
        "updated_at": datetime.datetime.utcnow(),
    }

    # if 'db' is a motor async db, it has insert_one coroutine; if it's pymongo, it's sync.
    # You used 'await db.resumes.insert_one' earlier, so assume it's Motor (async). Keep that pattern:
    res = await db.resumes.insert_one(rec)
    resume_id = str(res.inserted_id)

    # enqueue background parse (RQ)
    enqueue_parse_resume(resume_id, storage_path)

    return UploadResponse(resume_id=resume_id, status="queued")

@router.get("/{resume_id}", response_model=ParsedResume)
async def get_resume(resume_id: str, current_user=Depends(get_current_user)):
    # if db is motor async
    doc = await db.resumes.find_one({"_id": ObjectId(resume_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Resume not found")
    parsed = doc.get("parsed", {})
    # pydantic model ParsedResume will accept this dict
    return parsed


@router.post("/ats/score")
async def ats_score(payload: dict = Body(...)):
    """
    Accepts JSON:
    {
      "resume_id": "OPTIONAL",
      "resume_text": "OPTIONAL, if not passing resume_id",
      "job_description": "required"
    }
    """
    from app.utils.parser import score_ats

    job_description = payload.get("job_description", "")
    if not job_description:
        raise HTTPException(status_code=400, detail="job_description is required")

    resume_text = payload.get("resume_text")
    resume_id = payload.get("resume_id")

    if not resume_text and resume_id:
        # use module-level `db` (imported at top of the router file)
        doc = None
        try:
            oid = ObjectId(resume_id)
            doc = await db.resumes.find_one({"_id": oid})
        except (bson_errors.InvalidId, TypeError):
            # invalid ObjectId; fallback to string-key lookup
            doc = await db.resumes.find_one({"_id": resume_id})

        if not doc:
            raise HTTPException(status_code=404, detail=f"Resume not found for id: {resume_id}")

        parsed = doc.get("parsed") or {}
        resume_text = parsed.get("text", "")

    if not resume_text:
        raise HTTPException(status_code=400, detail="resume_text not provided and resume has no parsed text yet")

    result = score_ats(resume_text, job_description)
    return result
