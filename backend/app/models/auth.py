from typing import Optional

from pydantic import BaseModel

from app.models.user import User


class LoginRequest(BaseModel):
    user_id: str
    password: Optional[str] = None
    role: Optional[str] = None


class LoginResponse(BaseModel):
    success: bool
    user: User


class LogoutResponse(BaseModel):
    success: bool
    message: str
