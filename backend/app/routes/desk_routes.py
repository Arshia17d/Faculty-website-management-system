from fastapi import APIRouter, Header, HTTPException

from app.controllers.desk_controller import edit_desk_software
from app.models.desk import Desk, DeskSoftwareUpdate

router = APIRouter(prefix="/desks", tags=["desks"])


@router.patch("/{desk_id}/software", response_model=Desk)
def update_desk_software_route(
    desk_id: int,
    payload: DeskSoftwareUpdate,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> Desk:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    updated = edit_desk_software(desk_id, payload.software_ids)
    if not updated:
        raise HTTPException(status_code=404, detail="میز یافت نشد")
    return updated
