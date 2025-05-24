from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import JSONB
from database import Base  

class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, nullable=False)
    options = Column(JSONB, nullable=False) 
    correct_option = Column(String, nullable=False)