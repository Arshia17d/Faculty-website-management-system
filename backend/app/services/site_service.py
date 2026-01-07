import json

from app.models.site import Site, SiteCreate
from app.services.database import get_connection


def list_sites() -> list[Site]:
    connection = get_connection()
    rows = connection.execute("SELECT * FROM sites ORDER BY id").fetchall()
    connection.close()
    sites: list[Site] = []
    for row in rows:
        sites.append(
            Site(
                id=row["id"],
                name=row["name"],
                location=row["location"],
                total_desks=row["total_desks"],
                free_desks=row["free_desks"],
                occupied_desks=row["occupied_desks"],
                reserved_desks=row["reserved_desks"],
                under_repair_desks=row["under_repair_desks"],
                software=json.loads(row["software"]),
            )
        )
    return sites


def create_site(payload: SiteCreate) -> Site:
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        INSERT INTO sites (name, location, total_desks, free_desks, occupied_desks, reserved_desks, under_repair_desks, software)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload.name,
            payload.location,
            payload.total_desks,
            payload.total_desks,
            0,
            0,
            0,
            json.dumps(payload.software, ensure_ascii=False),
        ),
    )
    site_id = cursor.lastrowid
    connection.commit()
    connection.close()
    return Site(
        id=site_id,
        name=payload.name,
        location=payload.location,
        total_desks=payload.total_desks,
        free_desks=payload.total_desks,
        occupied_desks=0,
        reserved_desks=0,
        under_repair_desks=0,
        software=payload.software,
    )


def update_site_software(site_id: int, software: list[str]) -> Site | None:
    connection = get_connection()
    row = connection.execute(
        "SELECT * FROM sites WHERE id = ?", (site_id,)).fetchone()
    if not row:
        connection.close()
        return None
    connection.execute(
        "UPDATE sites SET software = ? WHERE id = ?",
        (json.dumps(software, ensure_ascii=False), site_id),
    )
    connection.commit()
    connection.close()
    return Site(
        id=row["id"],
        name=row["name"],
        location=row["location"],
        total_desks=row["total_desks"],
        free_desks=row["free_desks"],
        occupied_desks=row["occupied_desks"],
        reserved_desks=row["reserved_desks"],
        under_repair_desks=row["under_repair_desks"],
        software=software,
    )


def update_site_desks(site_id: int, free_delta: int = 0, reserved_delta: int = 0) -> None:
    connection = get_connection()
    connection.execute(
        """
        UPDATE sites
        SET free_desks = free_desks + ?,
            reserved_desks = reserved_desks + ?
        WHERE id = ?
        """,
        (free_delta, reserved_delta, site_id),
    )
    connection.commit()
    connection.close()
