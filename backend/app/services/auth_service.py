from app.models.user import User
from app.services.user_service import get_user, upsert_user


def _build_dynamic_user(user_id: str, role: str | None) -> User:
    user_role = role
    user_name = "کاربر سیستم"
    additional_info = {}

    if user_id.startswith("98") and len(user_id) == 8:
        user_role = "student"
        user_name = "دانشجوی نمونه"
        additional_info = {
            "faculty": "مهندسی کامپیوتر",
            "studentNumber": user_id,
        }
    elif user_id.startswith("emp-"):
        user_role = "professor"
        user_name = "استاد نمونه"
        additional_info = {
            "department": "علوم کامپیوتر",
            "employeeId": user_id,
        }
    elif "admin" in user_id:
        user_role = "admin"
        user_name = "ادمین سیستم"
        additional_info = {
            "accessLevel": "full",
        }

    return User(id=user_id, name=user_name, role=user_role or "guest", **additional_info)


def login_user(user_id: str, role: str | None = None) -> User:
    user = get_user(user_id)
    if user:
        return user

    created = _build_dynamic_user(user_id, role)
    return upsert_user(created)
