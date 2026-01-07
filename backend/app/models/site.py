from typing import List

from pydantic import BaseModel, Field


class Site(BaseModel):
    id: int
    name: str
    location: str
    total_desks: int = Field(alias="totalDesks")
    free_desks: int = Field(alias="freeDesks")
    occupied_desks: int = Field(alias="occupiedDesks")
    reserved_desks: int = Field(alias="reservedDesks")
    under_repair_desks: int = Field(alias="underRepairDesks")
    software: List[str]

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True


class SiteCreate(BaseModel):
    name: str
    location: str
    total_desks: int = Field(alias="totalDesks")
    software: List[str] = []

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True


class SiteSoftwareUpdate(BaseModel):
    software: List[str]

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True
