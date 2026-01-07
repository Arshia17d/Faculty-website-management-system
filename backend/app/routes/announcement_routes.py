from fastapi import APIRouter, Header, HTTPException

from app.controllers.announcement_controller import create, get_announcements, remove
from app.models.announcement import Announcement, AnnouncementCreate

router = APIRouter(prefix="/announcements", tags=["announcements"])


@router.get("", response_model=list[Announcement])
def list_announcements_route() -> list[Announcement]:
    return get_announcements()


@router.post("", response_model=Announcement)
def create_announcement_route(
    payload: AnnouncementCreate,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> Announcement:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    if payload.priority not in {"high", "medium", "low"}:
        raise HTTPException(status_code=400, detail="اولویت نامعتبر است")
    return create(payload)


@router.delete("/{announcement_id}", status_code=204)
def delete_announcement_route(
    announcement_id: int,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> None:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    remove(announcement_id)
