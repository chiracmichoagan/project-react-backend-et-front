from db import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer,primary_key=True,nullable=False)
    title = Column(String,nullable=False)
    content = Column(String,nullable=False)
    # completed = Column(Boolean, server_default='FALSE')
    published = Column(Boolean, server_default='TRUE')
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))