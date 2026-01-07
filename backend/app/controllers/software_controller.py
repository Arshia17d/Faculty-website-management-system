from app.models.software import Software, SoftwareCreate, SoftwareUpdate
from app.services.software_service import create_software, delete_software, list_software, update_software


def get_software() -> list[Software]:
    return list_software()


def add_software(payload: SoftwareCreate) -> Software:
    return create_software(payload)


def edit_software(software_id: int, payload: SoftwareUpdate) -> Software | None:
    return update_software(software_id, payload)


def remove_software(software_id: int) -> bool:
    return delete_software(software_id)
