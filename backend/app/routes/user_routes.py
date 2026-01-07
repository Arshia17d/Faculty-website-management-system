from fastapi import APIRouter, Header, HTTPException

from app.controllers.user_controller import add_user, edit_user, get_users, remove_user
from app.models.user import User, UserCreate, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[User])
def list_users_route(x_user_role: str | None = Header(default=None, alias="X-User-Role")) -> list[User]:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    return get_users()


@router.post("", response_model=User)
def create_user_route(
    payload: UserCreate,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> User:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    return add_user(payload)


@router.patch("/{user_id}", response_model=User)
def update_user_route(
    user_id: str,
    payload: UserUpdate,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> User:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    updated = edit_user(user_id, payload)
    if not updated:
        raise HTTPException(status_code=404, detail="کاربر یافت نشد")
    return updated


@router.delete("/{user_id}", status_code=204)
def delete_user_route(
    user_id: str,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> None:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    deleted = remove_user(user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="کاربر یافت نشد")
