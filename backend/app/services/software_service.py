from app.models.software import Software
from app.services.database import get_connection


def list_software() -> list[Software]:
    connection = get_connection()
    rows = connection.execute("SELECT * FROM software ORDER BY id").fetchall()
    connection.close()
    return [
        Software(
            id=row["id"],
            name=row["name"],
            version=row["version"],
            license_key=row["license_key"],
            installed_at=row["installed_at"],
            desks_count=row["desks_count"],
        )
        for row in rows
    ]
