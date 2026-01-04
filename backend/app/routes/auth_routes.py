from fastapi import APIRouter

from app.controllers.auth_controller import login, logout
from app.models.auth import LoginRequest, LoginResponse, LogoutResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
def login_route(payload: LoginRequest) -> LoginResponse:
    return login(payload)


@router.post("/logout", response_model=LogoutResponse)
def logout_route() -> LogoutResponse:
    return logout()
