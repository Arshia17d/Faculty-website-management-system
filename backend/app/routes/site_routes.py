from fastapi import APIRouter

from app.controllers.site_controller import get_sites
from app.models.site import Site

router = APIRouter(prefix="/sites", tags=["sites"])


@router.get("", response_model=list[Site])
def list_sites_route() -> list[Site]:
    return get_sites()
