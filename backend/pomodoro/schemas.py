from pydantic import BaseModel
from datetime import date

class PomodoroLogRequest(BaseModel):
    date: date 

class PomodoroHistoryResponse(BaseModel):
    date: date
    cycles: int

    class Config:
        orm_mode = True
