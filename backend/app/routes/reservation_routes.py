from fastapi import APIRouter

from app.controllers.reservation_controller import create, get_reservations
from app.models.reservation import Reservation, ReservationCreate

router = APIRouter(prefix="/reservations", tags=["reservations"])


@router.get("", response_model=list[Reservation])
def list_reservations_route() -> list[Reservation]:
    return get_reservations()


@router.post("", response_model=Reservation)
def create_reservation_route(payload: ReservationCreate) -> Reservation:
    return create(payload)
