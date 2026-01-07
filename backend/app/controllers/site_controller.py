from app.models.site import Site, SiteCreate
from app.services.site_service import create_site, list_sites, update_site_software


def get_sites() -> list[Site]:
    return list_sites()


def add_site(payload: SiteCreate) -> Site:
    return create_site(payload)


def edit_site_software(site_id: int, software: list[str]) -> Site | None:
    return update_site_software(site_id, software)
