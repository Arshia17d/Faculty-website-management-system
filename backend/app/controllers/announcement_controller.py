from app.models.announcement import Announcement, AnnouncementCreate
from app.services.announcement_service import create_announcement, delete_announcement, list_announcements


def get_announcements() -> list[Announcement]:
    return list_announcements()


def create(payload: AnnouncementCreate) -> Announcement:
    return create_announcement(payload)


def remove(announcement_id: int) -> None:
    delete_announcement(announcement_id)
