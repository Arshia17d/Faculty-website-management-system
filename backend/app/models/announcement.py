from pydantic import BaseModel, Field


class Announcement(BaseModel):
    id: int
    title: str
    content: str
    priority: str
    date: str
    created_by: str = Field(alias="createdBy")
    category: str = "general"

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True


class AnnouncementCreate(BaseModel):
    title: str
    content: str
    priority: str
    date: str
    created_by: str = Field(alias="createdBy")
    category: str = "general"

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True
