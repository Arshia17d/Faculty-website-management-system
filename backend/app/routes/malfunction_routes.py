from fastapi import APIRouter, Header, HTTPException

from app.controllers.malfunction_controller import create, get_reports
from app.models.malfunction_report import (
    MalfunctionReport,
    MalfunctionReportCreate,
    MalfunctionReportStatusUpdate,
)
from app.services.malfunction_service import update_report_status

router = APIRouter(prefix="/reports", tags=["malfunctions"])


@router.get("", response_model=list[MalfunctionReport])
def list_reports_route(user_id: str | None = None) -> list[MalfunctionReport]:
    return get_reports(user_id)


@router.post("", response_model=MalfunctionReport)
def create_report_route(
    payload: MalfunctionReportCreate,
    x_user_id: str | None = Header(default=None, alias="X-User-Id"),
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> MalfunctionReport:
    if x_user_role not in {"student", "professor", "admin"}:
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    if x_user_id and x_user_id != payload.user_id:
        raise HTTPException(status_code=400, detail="شناسه کاربر نامعتبر است")
    return create(payload)


@router.patch("/{report_id}/status", response_model=MalfunctionReport)
def update_report_status_route(
    report_id: int,
    payload: MalfunctionReportStatusUpdate,
    x_user_role: str | None = Header(default=None, alias="X-User-Role"),
) -> MalfunctionReport:
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="دسترسی غیرمجاز")
    if payload.status not in {"pending", "in-progress", "resolved"}:
        raise HTTPException(status_code=400, detail="وضعیت نامعتبر است")
    return update_report_status(report_id, payload.status)
