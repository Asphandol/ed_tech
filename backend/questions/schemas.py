from pydantic import BaseModel
from typing import List

class QuestionOut(BaseModel):
    id: int
    question: str
    options: List[str]

    class Config:
        orm_mode = True

class AnswerIn(BaseModel):
    question_id: int
    selected_option: str

class SubmitRequest(BaseModel):
    answers: List[AnswerIn]

class SubmitResponse(BaseModel):
    score: int
    points_awarded: int
    correct_answers: List[AnswerIn]
