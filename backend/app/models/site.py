from typing import List

from pydantic import BaseModel


class Site(BaseModel):
    id: int
    name: str
    location: str
    total_desks: int
    free_desks: int
    occupied_desks: int
    reserved_desks: int
    under_repair_desks: int
    software: List[str]
