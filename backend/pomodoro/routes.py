from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from datetime import date
from database import get_db
from users.permissions import get_current_user
from pomodoro.models import PomodoroSession
from users.models import User
from pomodoro.schemas import PomodoroLogRequest, PomodoroHistoryResponse
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/pomodoro", tags=["Pomodoro"])

@router.post("/")
def log_pomodoro(
    request: PomodoroLogRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    session = db.query(PomodoroSession).filter_by(
        user_id=current_user.id,
        date=request.date
    ).first()

    if session:
        session.cycles += 1
    else:
        session = PomodoroSession(user_id=current_user.id, date=request.date, cycles=1)
        db.add(session)

    db.commit()
    return JSONResponse(status_code=200, content={"me": "Logged successfully", "date": str(request.date)})

@router.get("/history", response_model=list[PomodoroHistoryResponse])
def get_pomodoro_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sessions = db.query(PomodoroSession)\
        .filter_by(user_id=current_user.id)\
        .order_by(PomodoroSession.date.desc())\
        .all()
    
    return sessions



