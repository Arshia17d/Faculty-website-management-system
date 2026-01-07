from typing import Optional

from pydantic import BaseModel, Field


class User(BaseModel):
    id: str
    name: str
    role: str
    faculty: Optional[str] = None
    department: Optional[str] = None
    access_level: Optional[str] = Field(default=None, alias="accessLevel")
    status: Optional[str] = None

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True


class UserCreate(BaseModel):
    id: str
    name: str
    role: str
    faculty: Optional[str] = None
    department: Optional[str] = None
    access_level: Optional[str] = Field(default=None, alias="accessLevel")
    status: Optional[str] = "active"

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True


class UserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    faculty: Optional[str] = None
    department: Optional[str] = None
    access_level: Optional[str] = Field(default=None, alias="accessLevel")
    status: Optional[str] = None

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True
