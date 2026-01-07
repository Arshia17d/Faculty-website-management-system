from typing import List

from pydantic import BaseModel, Field

from app.models.software import Software


class Desk(BaseModel):
    id: int
    site_id: int = Field(alias="siteId")
    label: str
    status: str
    software: List[Software] = []

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True


class DeskSoftwareUpdate(BaseModel):
    software_ids: List[int] = Field(alias="softwareIds")

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True
