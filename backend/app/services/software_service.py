from app.models.software import Software, SoftwareCreate, SoftwareUpdate
from app.services.database import get_connection


def list_software() -> list[Software]:
    connection = get_connection()
    rows = connection.execute(
        """
        SELECT s.*, COUNT(ds.software_id) as desk_count
        FROM software s
        LEFT JOIN desk_software ds ON s.id = ds.software_id
        GROUP BY s.id
        ORDER BY s.id
        """
    ).fetchall()
    connection.close()
    return [
        Software(
            id=row["id"],
            name=row["name"],
            version=row["version"],
            license_key=row["license_key"],
            installed_at=row["installed_at"],
            desks_count=row["desk_count"] if row["desk_count"] is not None else row["desks_count"],
        )
        for row in rows
    ]


def create_software(payload: SoftwareCreate) -> Software:
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        INSERT INTO software (name, version, license_key, installed_at, desks_count)
        VALUES (?, ?, ?, ?, 0)
        """,
        (payload.name, payload.version, payload.license_key, payload.installed_at),
    )
    software_id = cursor.lastrowid
    connection.commit()
    connection.close()
    return Software(
        id=software_id,
        name=payload.name,
        version=payload.version,
        license_key=payload.license_key,
        installed_at=payload.installed_at,
        desks_count=0,
    )


def update_software(software_id: int, payload: SoftwareUpdate) -> Software | None:
    connection = get_connection()
    row = connection.execute(
        "SELECT * FROM software WHERE id = ?", (software_id,)).fetchone()
    if not row:
        connection.close()
        return None
    data = {
        "name": payload.name or row["name"],
        "version": payload.version or row["version"],
        "license_key": payload.license_key or row["license_key"],
        "installed_at": payload.installed_at if payload.installed_at is not None else row["installed_at"],
    }
    connection.execute(
        """
        UPDATE software
        SET name = ?, version = ?, license_key = ?, installed_at = ?
        WHERE id = ?
        """,
        (
            data["name"],
            data["version"],
            data["license_key"],
            data["installed_at"],
            software_id,
        ),
    )
    connection.commit()
    connection.close()
    return Software(
        id=software_id,
        name=data["name"],
        version=data["version"],
        license_key=data["license_key"],
        installed_at=data["installed_at"],
        desks_count=row["desks_count"],
    )


def delete_software(software_id: int) -> bool:
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM software WHERE id = ?", (software_id,))
    deleted = cursor.rowcount > 0
    connection.commit()
    connection.close()
    return deleted
