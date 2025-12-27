from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import Field, validator
import json

class Settings(BaseSettings):
    # --------------------
    # Database / Infra
    # --------------------
    MONGO_URI: str = Field("mongodb://mongo:27017", env="MONGO_URI")
    DB_NAME: str = Field("resume_builder", env="DB_NAME")
    REDIS_URL: str = Field("redis://redis:6379/0", env="REDIS_URL")

    # --------------------
    # File Uploads
    # --------------------
    max_upload_size_mb: int = Field(8, env="MAX_UPLOAD_SIZE_MB")

    # --------------------
    # CORS
    # --------------------
    allow_origins: List[str] = Field(default_factory=lambda: ["*"], env="ALLOW_ORIGINS")

    # --------------------
    # JWT / Auth
    # --------------------
    JWT_SECRET: str = Field(..., env="JWT_SECRET")
    JWT_ALGORITHM: str = Field("HS256", env="JWT_ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(60, env="ACCESS_TOKEN_EXPIRE_MINUTES")

    # --------------------
    # Frontend / Backend URLs
    # --------------------
    FRONTEND_URL: str = Field("http://localhost:5173", env="FRONTEND_URL")
    BACKEND_URL: str = Field("http://localhost:8000", env="BACKEND_URL")

    # --------------------
    # OAuth Credentials
    # --------------------
    GOOGLE_CLIENT_ID: Optional[str] = Field(None, env="GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET: Optional[str] = Field(None, env="GOOGLE_CLIENT_SECRET")
    GITHUB_CLIENT_ID: Optional[str] = Field(None, env="GITHUB_CLIENT_ID")
    GITHUB_CLIENT_SECRET: Optional[str] = Field(None, env="GITHUB_CLIENT_SECRET")

    # Redirect URIs
    GOOGLE_REDIRECT_URI: Optional[str] = Field(None, env="GOOGLE_REDIRECT_URI")
    GITHUB_REDIRECT_URI: Optional[str] = Field(None, env="GITHUB_REDIRECT_URI")

    class Config:
        env_file = ".env"
        model_config = {"extra": "ignore"}  # ignore unknown env keys

    # --------------------
    # Validators
    # --------------------
    @validator("allow_origins", pre=True)
    def _parse_allow_origins(cls, v):
        """Support JSON list, CSV text, or raw list."""
        if v is None:
            return ["*"]

        if isinstance(v, list):
            return v

        if isinstance(v, str):
            v = v.strip()
            # JSON array string
            try:
                loaded = json.loads(v)
                if isinstance(loaded, list):
                    return loaded
            except Exception:
                pass

            # CSV format
            if "," in v:
                return [x.strip() for x in v.split(",") if x.strip()]

            return [v]

        return ["*"]


settings = Settings()