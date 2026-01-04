from app.models.software import Software
from app.services.data_store import SOFTWARE_LIST


def list_software() -> list[Software]:
    return SOFTWARE_LIST
