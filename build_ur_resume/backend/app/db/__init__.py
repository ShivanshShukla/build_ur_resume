# app/db/__init__.py
# Provide package-level exports so  works.
from .db import get_db, get_mongo_client

__all__ = ['get_db', 'get_mongo_client']
