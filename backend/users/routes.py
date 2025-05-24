from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from users.permissions import get_current_user
from users.models import Base, User
from database import engine
from users.schemas import UserCreate, UserOut, Token, UserLogin
from users.auth import (
    get_password_hash, authenticate_user,
    create_access_token, get_user_by_email
)
from datetime import timedelta
from jose import JWTError, jwt
from config import config

from database import get_db

app = APIRouter()
Base.metadata.create_all(bind=engine)


@app.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = get_password_hash(user.password)
    new_user = User(username=user.username, hashed_password=hashed, email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=Token)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, user_in.email, user_in.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.email}, timedelta(minutes=config.access_exp))
    return {"access_token": token, "token_type": "bearer"}


@app.get("/me", response_model=UserOut)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
