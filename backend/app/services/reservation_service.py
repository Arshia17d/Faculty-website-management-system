from app.models.reservation import Reservation, ReservationCreate
from app.services.data_store import RESERVATIONS, next_reservation_id


def list_reservations() -> list[Reservation]:
    return RESERVATIONS


def create_reservation(payload: ReservationCreate) -> Reservation:
    reservation = Reservation(
        id=next_reservation_id(),
        status="pending",
        **payload.model_dump(by_alias=True),
    )
    RESERVATIONS.append(reservation)
    return reservation
