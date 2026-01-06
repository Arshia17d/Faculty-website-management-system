from app.models.malfunction_report import MalfunctionReport, MalfunctionReportCreate
from app.services.malfunction_service import create_report, list_reports


def get_reports(user_id: str | None = None) -> list[MalfunctionReport]:
    return list_reports(user_id)


def create(payload: MalfunctionReportCreate) -> MalfunctionReport:
    return create_report(payload)
