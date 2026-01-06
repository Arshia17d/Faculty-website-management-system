from app.models.user import User
from app.services.database import get_connection


def list_users() -> list[User]:
    connection = get_connection()
    rows = connection.execute("SELECT * FROM users ORDER BY name").fetchall()
    connection.close()
    return [
        User(
            id=row["id"],
            name=row["name"],
            role=row["role"],
            faculty=row["faculty"],
            department=row["department"],
            access_level=row["access_level"],
            status=row["status"],
        )
        for row in rows
    ]


def get_user(user_id: str) -> User | None:
    connection = get_connection()
    row = connection.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    connection.close()
    if not row:
        return None
    return User(
        id=row["id"],
        name=row["name"],
        role=row["role"],
        faculty=row["faculty"],
        department=row["department"],
        access_level=row["access_level"],
        status=row["status"],
    )


def upsert_user(user: User) -> User:
    connection = get_connection()
    connection.execute(
        """
        INSERT INTO users (id, name, role, faculty, department, access_level, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            role = excluded.role,
            faculty = excluded.faculty,
            department = excluded.department,
            access_level = excluded.access_level,
            status = excluded.status
        """,
        (
            user.id,
            user.name,
            user.role,
            user.faculty,
            user.department,
            user.access_level,
            user.status,
        ),
    )
    connection.commit()
    connection.close()
    return user
