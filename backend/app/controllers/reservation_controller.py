from app.models.reservation import Reservation, ReservationCreate
from app.services.reservation_service import create_reservation, list_reservations


def get_reservations() -> list[Reservation]:
    return list_reservations()


def create(payload: ReservationCreate) -> Reservation:
    return create_reservation(payload)
