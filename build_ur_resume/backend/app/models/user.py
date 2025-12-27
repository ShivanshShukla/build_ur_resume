# app/models/user.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class RegisterIn(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: Optional[str] = Field(alias="_id")
    email: EmailStr
    full_name: Optional[str] = None
    oauth_provider: Optional[str] = None

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
