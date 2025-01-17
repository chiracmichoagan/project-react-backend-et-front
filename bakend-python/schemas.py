from typing import Optional
from pydantic import BaseModel
import datetime


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

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

    class Config:
        orm_mode = True


class requestdetails(BaseModel):
    email:str
    password:str
        
class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str

class changepassword(BaseModel):
    email:str
    old_password:str
    new_password:str

class TokenCreate(BaseModel):
    user_id:str
    access_token:str
    refresh_token:str
    status:bool
    created_date:datetime.datetime