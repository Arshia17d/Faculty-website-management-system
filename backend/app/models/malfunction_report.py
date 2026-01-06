from pydantic import BaseModel, Field


class MalfunctionReport(BaseModel):
    id: int
    user_id: str = Field(alias="userId")
    user_name: str = Field(alias="userName")
    site_id: int = Field(alias="siteId")
    site_name: str = Field(alias="siteName")
    desk_id: str | None = Field(default=None, alias="deskId")
    description: str
    priority: str
    date: str
    status: str
    contact: str | None = None

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True


class MalfunctionReportCreate(BaseModel):
    user_id: str = Field(alias="userId")
    user_name: str = Field(alias="userName")
    site_id: int = Field(alias="siteId")
    site_name: str = Field(alias="siteName")
    desk_id: str | None = Field(default=None, alias="deskId")
    description: str
    priority: str
    date: str
    contact: str | None = None

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True


class MalfunctionReportStatusUpdate(BaseModel):
    status: str
