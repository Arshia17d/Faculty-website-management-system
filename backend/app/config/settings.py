import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "Faculty Website Backend")
    environment: str = os.getenv("ENVIRONMENT", "development")


settings = Settings()
