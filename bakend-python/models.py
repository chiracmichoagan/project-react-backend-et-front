from db import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text, Text, ForeignKey
from sqlalchemy.orm import relationship

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