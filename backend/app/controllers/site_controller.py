from app.models.site import Site
from app.services.site_service import list_sites


def get_sites() -> list[Site]:
    return list_sites()
