from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from questions.schemas import QuestionOut, AnswerIn, SubmitRequest, SubmitResponse

from questions.models import Question

from database import get_db
from fastapi.exceptions import HTTPException
import random
from users.permissions import get_current_user
from users.models import User



router  = APIRouter(prefix="/quiz", tags=["quiz"])


@router.get("/questions/", response_model=List[QuestionOut])
def get_questions(db: Session = Depends(get_db)):
    total_questions = db.query(Question).count()
    if total_questions == 0:
        raise HTTPException(status_code=404, detail="No questions found")


    question_ids = [q.id for q in db.query(Question.id).all()]
    sampled_ids = random.sample(question_ids, min(5, total_questions))
    questions = db.query(Question).filter(Question.id.in_(sampled_ids)).all()
    return questions

@router.post("/submit/", response_model=SubmitResponse)
def submit_answers(submit_req: SubmitRequest, db: Session = Depends(get_db), user:User =  Depends(get_current_user)):
    score = 0
    correct_answers_list = []

    for ans in submit_req.answers:
        question = db.query(Question).filter(Question.id == ans.question_id).first()
        if not question:
            continue
        if ans.selected_option == question.correct_option:
            score += 1
        correct_answers_list.append(
            {"question_id": question.id, "selected_option": question.correct_option}
        )

    user.credits += score
    db.commit()

    return {
        "score": score,
        "points_awarded": score,
        "correct_answers": correct_answers_list
    }