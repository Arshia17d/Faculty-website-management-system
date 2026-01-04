from pydantic import BaseModel, Field


class Software(BaseModel):
    id: int
    name: str
    version: str
    license_key: str = Field(alias="licenseKey")

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True
