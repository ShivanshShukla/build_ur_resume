# app/workers/worker.py
import os
import traceback
from pymongo import MongoClient
from app.config import settings
from app.utils.parser import parse_resume_from_bytes

def parse_resume_task(resume_id: str, storage_path: str):
    """
    Called by RQ worker process. Uses pymongo (sync) to update resume doc.
    """
    try:
        client = MongoClient(settings.MONGO_URI)
        db = client[settings.DB_NAME]

        # read file
        if not os.path.exists(storage_path):
            db.resumes.update_one({"_id": resume_id}, {"$set": {"status": "failed", "error": "file missing"}})
            return

        with open(storage_path, "rb") as f:
            b = f.read()

        parsed = parse_resume_from_bytes(b, os.path.basename(storage_path))

        # update DB - note: resume_id stored as string _id? If you used ObjectId, convert
        # If stored as ObjectId in DB, worker should convert to ObjectId. We'll try both.
        from bson import ObjectId
        try:
            oid = ObjectId(resume_id)
            db.resumes.update_one({"_id": oid}, {"$set": {"status": "done", "parsed": parsed}})
        except Exception:
            # fallback to string id
            db.resumes.update_one({"_id": resume_id}, {"$set": {"status": "done", "parsed": parsed}})
    except Exception:
        # best-effort logging
        traceback.print_exc()
        try:
            client = MongoClient(settings.MONGO_URI)
            db = client[settings.DB_NAME]
            from bson import ObjectId
            try:
                oid = ObjectId(resume_id)
                db.resumes.update_one({"_id": oid}, {"$set": {"status": "failed", "error": "worker exception"}})
            except Exception:
                db.resumes.update_one({"_id": resume_id}, {"$set": {"status": "failed", "error": "worker exception"}})
        except Exception:
            pass
