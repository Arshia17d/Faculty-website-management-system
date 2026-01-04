from fastapi import APIRouter

from app.controllers.software_controller import get_software
from app.models.software import Software

router = APIRouter(prefix="/software", tags=["software"])


@router.get("", response_model=list[Software])
def list_software_route() -> list[Software]:
    return get_software()
