# wrapper module so  works
# The real implementation is in the app/db package (app/db/<files>)
try:
    from app.db.db import get_db, get_mongo_client  # primary location
except Exception:
    # fallback: try other common module names if project used different file name:
    try:
        from app.db.main import get_db, get_mongo_client
    except Exception:
        raise

__all__ = ['get_db', 'get_mongo_client']
