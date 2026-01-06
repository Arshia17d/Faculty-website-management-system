from app.models.user import User
from app.services.user_service import list_users


def get_users() -> list[User]:
    return list_users()
