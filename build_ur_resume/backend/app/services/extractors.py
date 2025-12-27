# app/services/extractors.py
import fitz  # pymupdf

def extract_text_from_pdf_path(path: str) -> str:
    doc = fitz.open(path)
    texts = []
    for page in doc:
        texts.append(page.get_text("text"))
    return "\n".join(texts)
