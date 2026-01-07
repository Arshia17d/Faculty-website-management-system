from app.models.desk import Desk
from app.models.software import Software
from app.services.database import get_connection


def list_desks(site_id: int) -> list[Desk]:
    connection = get_connection()
    desks = connection.execute(
        "SELECT * FROM desks WHERE site_id = ? ORDER BY label",
        (site_id,),
    ).fetchall()
    if not desks:
        connection.close()
        return []

    desk_ids = [desk["id"] for desk in desks]
    software_rows = connection.execute(
        """
        SELECT ds.desk_id,
               s.id as software_id,
               s.name,
               s.version,
               s.license_key,
               s.installed_at,
               s.desks_count
        FROM desk_software ds
        JOIN software s ON s.id = ds.software_id
        WHERE ds.desk_id IN ({placeholders})
        ORDER BY s.name
        """.format(placeholders=",".join(["?"] * len(desk_ids))),
        desk_ids,
    ).fetchall()
    connection.close()

    software_map: dict[int, list[Software]] = {
        desk_id: [] for desk_id in desk_ids}
    for row in software_rows:
        software_map[row["desk_id"]].append(
            Software(
                id=row["software_id"],
                name=row["name"],
                version=row["version"],
                license_key=row["license_key"],
                installed_at=row["installed_at"],
                desks_count=row["desks_count"],
            )
        )

    return [
        Desk(
            id=desk["id"],
            site_id=desk["site_id"],
            label=desk["label"],
            status=desk["status"],
            software=software_map.get(desk["id"], []),
        )
        for desk in desks
    ]


def update_desk_software(desk_id: int, software_ids: list[int]) -> Desk | None:
    connection = get_connection()
    desk = connection.execute(
        "SELECT * FROM desks WHERE id = ?", (desk_id,)).fetchone()
    if not desk:
        connection.close()
        return None

    existing_rows = connection.execute(
        "SELECT software_id FROM desk_software WHERE desk_id = ?",
        (desk_id,),
    ).fetchall()
    existing_ids = {row["software_id"] for row in existing_rows}
    connection.execute(
        "DELETE FROM desk_software WHERE desk_id = ?", (desk_id,))
    connection.executemany(
        "INSERT INTO desk_software (desk_id, software_id) VALUES (?, ?)",
        [(desk_id, software_id) for software_id in software_ids],
    )
    connection.commit()

    affected_ids = list(existing_ids.union(software_ids))
    _refresh_software_counts(connection, affected_ids)

    software_rows = connection.execute(
        """
        SELECT s.id, s.name, s.version, s.license_key, s.installed_at, s.desks_count
        FROM software s
        JOIN desk_software ds ON s.id = ds.software_id
        WHERE ds.desk_id = ?
        ORDER BY s.name
        """,
        (desk_id,),
    ).fetchall()
    connection.close()
    software = [
        Software(
            id=row["id"],
            name=row["name"],
            version=row["version"],
            license_key=row["license_key"],
            installed_at=row["installed_at"],
            desks_count=row["desks_count"],
        )
        for row in software_rows
    ]
    return remember_desk(desk, software)


def remember_desk(row, software: list[Software]) -> Desk:
    return Desk(
        id=row["id"],
        site_id=row["site_id"],
        label=row["label"],
        status=row["status"],
        software=software,
    )


def _refresh_software_counts(connection, software_ids: list[int]) -> None:
    if not software_ids:
        return
    placeholders = ",".join(["?"] * len(software_ids))
    rows = connection.execute(
        f"""
        SELECT software_id, COUNT(*) as desk_count
        FROM desk_software
        WHERE software_id IN ({placeholders})
        GROUP BY software_id
        """,
        software_ids,
    ).fetchall()
    counts = {row["software_id"]: row["desk_count"] for row in rows}
    for software_id in software_ids:
        connection.execute(
            "UPDATE software SET desks_count = ? WHERE id = ?",
            (counts.get(software_id, 0), software_id),
        )
    connection.commit()
