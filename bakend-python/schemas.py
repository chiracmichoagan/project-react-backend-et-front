from pydantic import BaseModel


class TodoBase(BaseModel):
    content: str
    title: str

    class Config:
        orm_mode = True


class CreatePost(TodoBase):
    class Config:
        orm_mode = True