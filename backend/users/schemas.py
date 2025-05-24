from pydantic import BaseModel, EmailStr, UUID4

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: UUID4
    username: str
    email: EmailStr
    

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str


