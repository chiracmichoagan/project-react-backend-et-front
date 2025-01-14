from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text  
from database import Base  # Assurez-vous que database.py est dans le même répertoire ou ajustez le chemin  

class Post(Base):  
    __tablename__ = "posts"  

    id = Column(Integer, primary_key=True, nullable=False)  
    title = Column(String, nullable=False)  
    content = Column(String, nullable=False)  
    published = Column(Boolean, server_default='TRUE')  
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))  

# Optionnel : Créer toutes les tables dans la base de données  
Base.metadata.create_all(bind=engine)