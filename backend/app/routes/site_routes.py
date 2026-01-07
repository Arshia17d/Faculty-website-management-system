from fastapi import APIRouter, Header, HTTPException

from app.controllers.desk_controller import get_desks
from app.controllers.site_controller import add_site, edit_site_software, get_sites
from app.models.desk import Desk
from app.models.site import Site, SiteCreate, SiteSoftwareUpdate

router = APIRouter(prefix="/sites", tags=["sites"])


@router.get("", response_model=list[Site])
def list_sites_route() -> list[Site]:
    return get_sites()


@router.post("", response_model=Site)
def create_site_route(
    payload: SiteCreate,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> Site:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    return add_site(payload)


@router.patch("/{site_id}/software", response_model=Site)
def update_site_software_route(
    site_id: int,
    payload: SiteSoftwareUpdate,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> Site:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    updated = edit_site_software(site_id, payload.software)
    if not updated:
        raise HTTPException(status_code=404, detail="سایت یافت نشد")
    return updated


@router.get("/{site_id}/desks", response_model=list[Desk])
def list_site_desks_route(
    site_id: int,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> list[Desk]:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    return get_desks(site_id)
