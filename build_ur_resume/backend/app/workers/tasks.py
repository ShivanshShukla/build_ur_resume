# app/workers/tasks.py
from redis import Redis
from rq import Queue
from app.config import settings

redis_conn = Redis.from_url(settings.REDIS_URL)
q = Queue("default", connection=redis_conn, default_timeout=600)

def enqueue_parse_resume(resume_id: str, storage_path: str):    
    job = q.enqueue("app.workers.worker.parse_resume_task", resume_id, storage_path)
    return job.get_id()
