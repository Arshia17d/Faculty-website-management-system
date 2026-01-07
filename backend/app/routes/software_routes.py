from fastapi import APIRouter, Header, HTTPException

from app.controllers.software_controller import add_software, edit_software, get_software, remove_software
from app.models.software import Software, SoftwareCreate, SoftwareUpdate

router = APIRouter(prefix="/software", tags=["software"])


@router.get("", response_model=list[Software])
def list_software_route() -> list[Software]:
    return get_software()


@router.post("", response_model=Software)
def create_software_route(
    payload: SoftwareCreate,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> Software:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    return add_software(payload)


@router.patch("/{software_id}", response_model=Software)
def update_software_route(
    software_id: int,
    payload: SoftwareUpdate,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> Software:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    updated = edit_software(software_id, payload)
    if not updated:
        raise HTTPException(status_code=404, detail="نرم افزار یافت نشد")
    return updated


@router.delete("/{software_id}", status_code=204)
def delete_software_route(
    software_id: int,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> None:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    deleted = remove_software(software_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="نرم افزار یافت نشد")
