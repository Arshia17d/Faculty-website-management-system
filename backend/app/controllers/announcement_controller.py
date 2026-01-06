from app.models.announcement import Announcement, AnnouncementCreate
from app.services.announcement_service import create_announcement, list_announcements


def get_announcements() -> list[Announcement]:
    return list_announcements()


def create(payload: AnnouncementCreate) -> Announcement:
    return create_announcement(payload)
