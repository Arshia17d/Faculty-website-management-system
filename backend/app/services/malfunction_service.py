from fastapi import HTTPException

from app.models.malfunction_report import (
    MalfunctionReport,
    MalfunctionReportCreate,
)
from app.services.database import get_connection


def list_reports(user_id: str | None = None) -> list[MalfunctionReport]:
    connection = get_connection()
    if user_id:
        rows = connection.execute(
            "SELECT * FROM malfunction_reports WHERE user_id = ? ORDER BY date DESC, id DESC",
            (user_id,),
        ).fetchall()
    else:
        rows = connection.execute("SELECT * FROM malfunction_reports ORDER BY date DESC, id DESC").fetchall()
    connection.close()
    return [_row_to_report(row) for row in rows]


def create_report(payload: MalfunctionReportCreate) -> MalfunctionReport:
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        INSERT INTO malfunction_reports (user_id, user_name, site_id, site_name, desk_id, description, priority, date, status, contact)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload.user_id,
            payload.user_name,
            payload.site_id,
            payload.site_name,
            payload.desk_id,
            payload.description,
            payload.priority,
            payload.date,
            "pending",
            payload.contact,
        ),
    )
    report_id = cursor.lastrowid
    connection.commit()
    connection.close()
    return MalfunctionReport(
        id=report_id,
        user_id=payload.user_id,
        user_name=payload.user_name,
        site_id=payload.site_id,
        site_name=payload.site_name,
        desk_id=payload.desk_id,
        description=payload.description,
        priority=payload.priority,
        date=payload.date,
        status="pending",
        contact=payload.contact,
    )


def update_report_status(report_id: int, status: str) -> MalfunctionReport:
    connection = get_connection()
    connection.execute(
        "UPDATE malfunction_reports SET status = ? WHERE id = ?",
        (status, report_id),
    )
    connection.commit()
    row = connection.execute("SELECT * FROM malfunction_reports WHERE id = ?", (report_id,)).fetchone()
    connection.close()
    if not row:
        raise HTTPException(status_code=404, detail="گزارش پیدا نشد")
    return _row_to_report(row)


def _row_to_report(row) -> MalfunctionReport:
    return MalfunctionReport(
        id=row["id"],
        user_id=row["user_id"],
        user_name=row["user_name"],
        site_id=row["site_id"],
        site_name=row["site_name"],
        desk_id=row["desk_id"],
        description=row["description"],
        priority=row["priority"],
        date=row["date"],
        status=row["status"],
        contact=row["contact"],
    )
