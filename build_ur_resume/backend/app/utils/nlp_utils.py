# app/utils/nlp_utils.py
import re

EMAIL_RE = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")
PHONE_RE = re.compile(r"(\+?\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{6,12}")

def extract_basic_contacts(text: str):
    email = EMAIL_RE.search(text)
    phone = PHONE_RE.search(text)
    # name heuristic: first non-empty line with alphabetic words
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    name = None
    if lines:
        top = lines[0]
        # reject if top line looks like title or company (simple heuristic)
        if len(top.split()) <= 5 and any(c.isalpha() for c in top):
            name = top
    return {"email": email.group(0) if email else None, "phone": phone.group(0) if phone else None, "name": name}
