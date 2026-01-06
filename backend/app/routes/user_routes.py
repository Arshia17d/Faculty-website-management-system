from fastapi import APIRouter, Header, HTTPException

from app.controllers.user_controller import get_users
from app.models.user import User

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[User])
def list_users_route(x_user_role: str | None = Header(default=None, alias="X-User-Role")) -> list[User]:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    return get_users()
