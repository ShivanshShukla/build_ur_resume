# app/db.py
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

_mongo_client = None
_db = None

def get_mongo_client() -> AsyncIOMotorClient:
    global _mongo_client
    if _mongo_client is None:
        _mongo_client = AsyncIOMotorClient(settings.MONGO_URI)
    return _mongo_client

def get_db():
    global _db
    if _db is None:
        _db = get_mongo_client()[settings.DB_NAME]
    return _db
