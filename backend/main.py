from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from users.routes import app as users_router
from open.routes import router as openai_router
from pomodoro.routes import router as pomodoro_router
from events.routes import router as events_router
from questions.routes import router as questions_router
from config import config

app = FastAPI()

bearer_scheme = HTTPBearer()

origins = [
    "http://localhost:3000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(openai_router)
app.include_router(events_router)
app.include_router(pomodoro_router)
app.include_router(questions_router)


@app.get('/')
def health_checker():
    return JSONResponse(status_code=200, content={"message":"success"})

