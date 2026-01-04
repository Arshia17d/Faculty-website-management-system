from app.models.software import Software
from app.services.software_service import list_software


def get_software() -> list[Software]:
    return list_software()
