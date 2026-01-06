import json

from fastapi import HTTPException

from app.models.reservation import Reservation, ReservationCreate
from app.services.database import get_connection
from app.services.site_service import update_site_desks


def list_reservations(user_id: str | None = None) -> list[Reservation]:
    connection = get_connection()
    if user_id:
        rows = connection.execute(
            "SELECT * FROM reservations WHERE user_id = ? ORDER BY date DESC, id DESC",
            (user_id,),
        ).fetchall()
    else:
        rows = connection.execute("SELECT * FROM reservations ORDER BY date DESC, id DESC").fetchall()
    connection.close()
    return [_row_to_reservation(row) for row in rows]


def create_reservation(payload: ReservationCreate) -> Reservation:
    _validate_payload(payload)
    _ensure_no_overlap(payload)

    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        INSERT INTO reservations (user_id, user_name, site_id, site_name, desk_id, date, start_time, end_time, software, status, type, purpose, students_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            payload.user_id,
            payload.user_name,
            payload.site_id,
            payload.site_name,
            payload.desk_id,
            payload.date,
            payload.start_time,
            payload.end_time,
            json.dumps(payload.software, ensure_ascii=False) if payload.software else None,
            "pending",
            payload.type,
            payload.purpose,
            payload.students_count,
        ),
    )
    reservation_id = cursor.lastrowid
    connection.commit()
    connection.close()

    if payload.desk_id:
        update_site_desks(payload.site_id, free_delta=-1, reserved_delta=1)

    return Reservation(
        id=reservation_id,
        status="pending",
        **payload.model_dump(by_alias=True),
    )


def update_reservation_status(reservation_id: int, status: str) -> Reservation:
    connection = get_connection()
    row = connection.execute("SELECT * FROM reservations WHERE id = ?", (reservation_id,)).fetchone()
    if not row:
        connection.close()
        raise HTTPException(status_code=404, detail="رزرو پیدا نشد")

    previous_status = row["status"]
    connection.execute("UPDATE reservations SET status = ? WHERE id = ?", (status, reservation_id))
    connection.commit()
    updated = connection.execute("SELECT * FROM reservations WHERE id = ?", (reservation_id,)).fetchone()
    connection.close()

    if row["desk_id"] and previous_status not in {"rejected", "cancelled"} and status in {"rejected", "cancelled"}:
        update_site_desks(row["site_id"], free_delta=1, reserved_delta=-1)

    return _row_to_reservation(updated)


def _row_to_reservation(row) -> Reservation:
    return Reservation(
        id=row["id"],
        user_id=row["user_id"],
        user_name=row["user_name"],
        site_id=row["site_id"],
        site_name=row["site_name"],
        desk_id=row["desk_id"],
        date=row["date"],
        start_time=row["start_time"],
        end_time=row["end_time"],
        software=json.loads(row["software"]) if row["software"] else None,
        status=row["status"],
        type=row["type"],
        purpose=row["purpose"],
        students_count=row["students_count"],
    )


def _validate_payload(payload: ReservationCreate) -> None:
    if not payload.date or not payload.start_time or not payload.end_time:
        raise HTTPException(status_code=400, detail="تاریخ و زمان رزرو الزامی است")
    if payload.start_time >= payload.end_time:
        raise HTTPException(status_code=400, detail="زمان پایان باید بعد از شروع باشد")

    connection = get_connection()
    row = connection.execute("SELECT name FROM sites WHERE id = ?", (payload.site_id,)).fetchone()
    connection.close()
    if not row:
        raise HTTPException(status_code=400, detail="سایت انتخاب شده معتبر نیست")


def _ensure_no_overlap(payload: ReservationCreate) -> None:
    if not payload.desk_id:
        return

    connection = get_connection()
    rows = connection.execute(
        """
        SELECT * FROM reservations
        WHERE site_id = ? AND desk_id = ? AND date = ? AND status IN ('pending', 'approved')
        """,
        (payload.site_id, payload.desk_id, payload.date),
    ).fetchall()
    connection.close()

    requested_start = _time_to_minutes(payload.start_time)
    requested_end = _time_to_minutes(payload.end_time)

    for row in rows:
        existing_start = _time_to_minutes(row["start_time"])
        existing_end = _time_to_minutes(row["end_time"])
        if requested_start < existing_end and requested_end > existing_start:
            raise HTTPException(status_code=409, detail="این میز در بازه انتخاب شده قبلا رزرو شده است")


def _time_to_minutes(value: str) -> int:
    hours, minutes = value.split(":")
    return int(hours) * 60 + int(minutes)
