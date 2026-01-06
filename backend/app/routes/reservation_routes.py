from fastapi import APIRouter, Header, HTTPException

from app.controllers.reservation_controller import create, get_reservations
from app.models.reservation import Reservation, ReservationCreate, ReservationStatusUpdate
from app.services.reservation_service import update_reservation_status

router = APIRouter(prefix="/reservations", tags=["reservations"])


@router.get("", response_model=list[Reservation])
def list_reservations_route(user_id: str | None = None) -> list[Reservation]:
    return get_reservations(user_id)


@router.post("", response_model=Reservation)
def create_reservation_route(
    payload: ReservationCreate,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
    x_user_id: str | None = Header(default=None, alias="X-User-Id"),
) -> Reservation:
    if x_user_role not in {"student", "professor"}:
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    if x_user_id and x_user_id != payload.user_id:
        raise HTTPException(status_code=400, detail="شناسه کاربر نامعتبر است")
    return create(payload)


@router.patch("/{reservation_id}/status", response_model=Reservation)
def update_reservation_status_route(
    reservation_id: int,
    payload: ReservationStatusUpdate,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> Reservation:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    if payload.status not in {"approved", "rejected", "cancelled"}:
        raise HTTPException(status_code=400, detail="وضعیت نامعتبر است")
    return update_reservation_status(reservation_id, payload.status)
