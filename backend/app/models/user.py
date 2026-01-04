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
