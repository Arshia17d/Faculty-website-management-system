from app.models.user import User, UserCreate, UserUpdate
from app.services.user_service import create_user, delete_user, list_users, update_user


def get_users() -> list[User]:
    return list_users()


def add_user(payload: UserCreate) -> User:
    return create_user(payload)


def edit_user(user_id: str, payload: UserUpdate) -> User | None:
    return update_user(user_id, payload)


def remove_user(user_id: str) -> bool:
    return delete_user(user_id)
