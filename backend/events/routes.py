# routes/event.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import uuid4

from database import get_db
from users.permissions import get_current_user
from events.models import Event
from events.schemas import EventCreate, EventOut
from users.models import User

router = APIRouter(prefix="/events", tags=["Events"])

@router.post("/", response_model=EventOut)
def create_event(event: EventCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_event = Event(
        id=uuid4(),
        user_id=current_user.id,
        title=event.title,
        start=event.start,
        end=event.end
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@router.get("/", response_model=List[EventOut])
def get_events(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Event).filter(Event.user_id == current_user.id).all()
