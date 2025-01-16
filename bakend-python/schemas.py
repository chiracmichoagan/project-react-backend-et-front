from typing import Optional
from pydantic import BaseModel


class TodoBase(BaseModel):
    content: str
    title: str
    id: int
    

    class Config:
        orm_mode = True


class CreatePost(TodoBase):
    class Config:
        orm_mode = True

class BookBase (BaseModel):
    titre: str
    author_id: int
    contenu: Optional[str] = None # Nouveau champ de contenu

    class Config:
        orm_mode = True