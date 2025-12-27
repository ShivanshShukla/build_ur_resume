# app/utils/parser.py
import re
from typing import Dict, List
import pdfplumber
from docx import Document
import io

# small skills seed — extend later or load from DB/file
COMMON_SKILLS = [
    "python","java","javascript","react","node","django","flask","fastapi",
    "sql","mysql","postgres","mongodb","aws","docker","kubernetes",
    "selenium","pytest","graphql","html","css","typescript","aws","linux"
]

EMAIL_RE = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")
PHONE_RE = re.compile(r"(\+?\d[\d\s\-\(\)]{6,}\d)")

def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
    text_parts = []
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            try:
                text = page.extract_text() or ""
            except Exception:
                text = ""
            if text:
                text_parts.append(text)
    return "\n".join(text_parts)

def extract_text_from_docx_bytes(docx_bytes: bytes) -> str:
    doc = Document(io.BytesIO(docx_bytes))
    paragraphs = [p.text for p in doc.paragraphs if p.text]
    return "\n".join(paragraphs)

def extract_contact_info(text: str) -> Dict[str, List[str]]:
    emails = list(dict.fromkeys(EMAIL_RE.findall(text)))  # deduplicate
    phones = list(dict.fromkeys(PHONE_RE.findall(text)))
    return {"emails": emails, "phones": phones}

def extract_skills(text: str, skills_list: List[str] = None) -> List[str]:
    if skills_list is None:
        skills_list = COMMON_SKILLS
    found = set()
    t = text.lower()
    for s in skills_list:
        if re.search(rf"\b{re.escape(s)}\b", t):
            found.add(s)
    return sorted(found)

def parse_resume_from_bytes(file_bytes: bytes, filename: str) -> Dict:
    name = (filename or "").lower()
    text = ""
    if name.endswith(".pdf"):
        text = extract_text_from_pdf_bytes(file_bytes)
    elif name.endswith(".docx"):
        text = extract_text_from_docx_bytes(file_bytes)
    else:
        # fallback try PDF and DOCX
        try:
            text = extract_text_from_pdf_bytes(file_bytes)
        except Exception:
            text = extract_text_from_docx_bytes(file_bytes)
    contact = extract_contact_info(text)
    skills = extract_skills(text)
    # naive experience extraction: lines containing 'experience' or 'years'
    experience_lines = [ln.strip() for ln in text.splitlines() if re.search(r"\b(experience|years|year)\b", ln, re.I)]
    return {
        "text": text,
        "contact": contact,
        "skills": skills,
        "experience_lines": experience_lines,
    }


def score_ats(resume_text: str, job_description: str, expand_skills: List[str] = None):
    """
    Improved ATS scoring:
    - deduplicates required skills from JD
    - computes score based on unique required skills
    - returns matched, required_skills (unique), and missing lists
    """
    jd = (job_description or "").lower()
    if expand_skills is None:
        expand_skills = COMMON_SKILLS

    # find skills mentioned in JD (unique, ordered by appearance in expand_skills)
    jd_skills = []
    for s in expand_skills:
        if re.search(rf"\b{re.escape(s)}\b", jd) and s not in jd_skills:
            jd_skills.append(s)

    # find skills in resume text (unique)
    resume_t = (resume_text or "").lower()
    resume_skills = []
    for s in expand_skills:
        if re.search(rf"\b{re.escape(s)}\b", resume_t) and s not in resume_skills:
            resume_skills.append(s)

    matched = sorted(list(set(jd_skills) & set(resume_skills)))
    unique_total = len(jd_skills) or 1
    score = int(len(matched) / unique_total * 100)
    suggestions = [s for s in jd_skills if s not in matched]
    return {"score": score, "matched": matched, "required_skills": jd_skills, "missing": suggestions}
