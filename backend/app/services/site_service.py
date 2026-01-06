import json

from app.models.site import Site
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
