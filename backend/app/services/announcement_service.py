from app.models.announcement import Announcement, AnnouncementCreate
from app.services.database import get_connection


def list_announcements() -> list[Announcement]:
    connection = get_connection()
    rows = connection.execute(
        "SELECT * FROM announcements ORDER BY date DESC, id DESC").fetchall()
    connection.close()
    return [
        Announcement(
            id=row["id"],
            title=row["title"],
            content=row["content"],
            priority=row["priority"],
            date=row["date"],
            created_by=row["created_by"],
            category=row["category"],
        )
        for row in rows
    ]


def create_announcement(payload: AnnouncementCreate) -> Announcement:
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        INSERT INTO announcements (title, content, priority, date, created_by, category)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            payload.title,
            payload.content,
            payload.priority,
            payload.date,
            payload.created_by,
            payload.category,
        ),
    )
    announcement_id = cursor.lastrowid
    connection.commit()
    connection.close()
    return Announcement(
        id=announcement_id,
        title=payload.title,
        content=payload.content,
        priority=payload.priority,
        date=payload.date,
        created_by=payload.created_by,
        category=payload.category,
    )


def delete_announcement(announcement_id: int) -> None:
    connection = get_connection()
    connection.execute(
        "DELETE FROM announcements WHERE id = ?", (announcement_id,))
    connection.commit()
    connection.close()
