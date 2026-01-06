from pydantic import BaseModel, Field


class Software(BaseModel):
    id: int
    name: str
    version: str
    license_key: str = Field(alias="licenseKey")
    installed_at: str | None = Field(default=None, alias="installedAt")
    desks_count: int | None = Field(default=None, alias="desksCount")

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True
