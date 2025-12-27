# app/db/client.py
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

# Async Motor client, used by FastAPI endpoints
client = AsyncIOMotorClient(settings.MONGO_URI)
db = client[settings.DB_NAME]
