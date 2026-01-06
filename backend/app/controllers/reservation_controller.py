from app.models.reservation import Reservation, ReservationCreate
from app.services.reservation_service import create_reservation, list_reservations


def get_reservations(user_id: str | None = None) -> list[Reservation]:
    return list_reservations(user_id)


def create(payload: ReservationCreate) -> Reservation:
    return create_reservation(payload)
