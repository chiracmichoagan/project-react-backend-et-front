from db import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP,DateTime, Boolean, text, Text, ForeignKey
from sqlalchemy.orm import relationship
import datetime

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    # completed = Column(Boolean, server_default='FALSE')
    published = Column(Boolean, server_default='TRUE')
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

class Livre(Base):
    __tablename__ = "livres"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String(255), index=True)
    contenu = Column(Text, nullable=True)
    author_id = Column(Integer, ForeignKey("auteurs.id"))

    # author = relationship("Auteur", back_populates="livres") 
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True,)
    username = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)

class TokenTable(Base):
    __tablename__ = "token"
    user_id = Column(Integer)
    access_toke = Column(String(450), primary_key=True)
    refresh_toke = Column(String(450),nullable=False)
    status = Column(Boolean)
    created_date = Column(DateTime, default=datetime.datetime.now)    