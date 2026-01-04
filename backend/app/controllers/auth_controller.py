from app.models.auth import LoginRequest, LoginResponse, LogoutResponse
from app.services.auth_service import login_user


def login(payload: LoginRequest) -> LoginResponse:
    user = login_user(payload.user_id, payload.role)
    return LoginResponse(success=True, user=user)


def logout() -> LogoutResponse:
    return LogoutResponse(success=True, message="Logged out")
