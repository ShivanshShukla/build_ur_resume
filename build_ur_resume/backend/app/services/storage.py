# app/services/storage.py
import os

STORAGE_ROOT = os.path.abspath(os.path.join(os.getcwd(), "storage", "resumes"))
os.makedirs(STORAGE_ROOT, exist_ok=True)

def upload(key: str, data: bytes, content_type: str = None) -> str:
    # sanitize key - remove leading slashes
    safe_key = key.lstrip("/")

    target = os.path.join(STORAGE_ROOT, safe_key)
    dirpath = os.path.dirname(target)
    if not os.path.exists(dirpath):
        os.makedirs(dirpath, exist_ok=True)

    with open(target, "wb") as f:
        f.write(data)

    return target
