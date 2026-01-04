from typing import List, Optional

from pydantic import BaseModel, Field


class Reservation(BaseModel):
    id: int
    user_id: str = Field(alias="userId")
    user_name: str = Field(alias="userName")
    site_id: int = Field(alias="siteId")
    site_name: str = Field(alias="siteName")
    desk_id: Optional[str] = Field(default=None, alias="deskId")
    date: str
    start_time: str = Field(alias="startTime")
    end_time: str = Field(alias="endTime")
    software: Optional[List[str]] = None
    status: str
    type: str
    purpose: Optional[str] = None
    students_count: Optional[int] = Field(default=None, alias="studentsCount")

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True


class ReservationCreate(BaseModel):
    user_id: str = Field(alias="userId")
    user_name: str = Field(alias="userName")
    site_id: int = Field(alias="siteId")
    site_name: str = Field(alias="siteName")
    desk_id: Optional[str] = Field(default=None, alias="deskId")
    date: str
    start_time: str = Field(alias="startTime")
    end_time: str = Field(alias="endTime")
    software: Optional[List[str]] = None
    type: str
    purpose: Optional[str] = None
    students_count: Optional[int] = Field(default=None, alias="studentsCount")

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True
