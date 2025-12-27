# app/models/pydantic_models.py
from pydantic import BaseModel
from typing import Optional, List, Dict

class UploadResponse(BaseModel):
    resume_id: str
    status: str

class ParsedResume(BaseModel):
    # The parsed data shape depends on your parser; here's a permissive model.
    text: Optional[str] = None
    contact: Optional[Dict[str, List[str]]] = None
    skills: Optional[List[str]] = None
    experience_lines: Optional[List[str]] = None
