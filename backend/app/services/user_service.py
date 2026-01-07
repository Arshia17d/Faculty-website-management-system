from app.models.user import User, UserCreate, UserUpdate
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
    row = connection.execute(
        "SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
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


def create_user(payload: UserCreate) -> User:
    user = User(
        id=payload.id,
        name=payload.name,
        role=payload.role,
        faculty=payload.faculty,
        department=payload.department,
        access_level=payload.access_level,
        status=payload.status,
    )
    return upsert_user(user)


def update_user(user_id: str, payload: UserUpdate) -> User | None:
    existing = get_user(user_id)
    if not existing:
        return None
    updated = User(
        id=user_id,
        name=payload.name or existing.name,
        role=payload.role or existing.role,
        faculty=payload.faculty if payload.faculty is not None else existing.faculty,
        department=payload.department if payload.department is not None else existing.department,
        access_level=payload.access_level if payload.access_level is not None else existing.access_level,
        status=payload.status if payload.status is not None else existing.status,
    )
    return upsert_user(updated)


def delete_user(user_id: str) -> bool:
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
    deleted = cursor.rowcount > 0
    connection.commit()
    connection.close()
    return deleted
