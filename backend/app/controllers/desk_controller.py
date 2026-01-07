from app.models.desk import Desk
from app.services.desk_service import list_desks, update_desk_software


def get_desks(site_id: int) -> list[Desk]:
    return list_desks(site_id)


def edit_desk_software(desk_id: int, software_ids: list[int]) -> Desk | None:
    return update_desk_software(desk_id, software_ids)
