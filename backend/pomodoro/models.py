from database import Base
from sqlalchemy import Column, Integer, Date, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID


class PomodoroSession(Base):
    __tablename__ = "pomodoro_sessions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False)
    cycles = Column(Integer, default=1)

    __table_args__ = (UniqueConstraint("user_id", "date", name="uix_user_date"),)
    
    user = relationship("User", back_populates="pomodoro_sessions")