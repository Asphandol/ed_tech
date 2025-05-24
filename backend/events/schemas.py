
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class EventCreate(BaseModel):
    title: str
    start: datetime
    end: datetime

class EventOut(EventCreate):
    id: UUID

    class Config:
        orm_mode = True
