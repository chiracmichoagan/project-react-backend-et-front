from typing import List
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
import models
import schemas
from fastapi import APIRouter
from db import get_db

router = APIRouter(
    prefix='/todos',
    tags=['Todos']
)

@router.get('/', response_model=List[schemas.TodoBase])
def get_todos(db: Session = Depends(get_db)):

    todos = db.query(models.Todo).all()


    return  todos

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=List[schemas.TodoBase])
def create_todo(todo:schemas.TodoBase, db:Session = Depends(get_db)):

    new_todo = models.Todo(**todo.dict())
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return [new_todo]


@router.get('/{id}', response_model=schemas.TodoBase, status_code=status.HTTP_200_OK)
def get_todo(id:int ,db:Session = Depends(get_db)):

    todo  = db.query(models.Todo).filter(models.Todo.id == id).first()

    if todo is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"The id: {id} you requested for does not exist")
    return todo

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(id:int, db:Session = Depends(get_db)):

    todo = db.query(models.Todo).filter(models.Todo.id == id)


    if todo.first() is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"The id: {id} you requested for does not exist")
    todo.delete(synchronize_session=False)
    db.commit()



@router.put('/{id}', response_model=schemas.TodoBase)
def update_todo(update_todo:schemas.TodoBase, id:int, db:Session = Depends(get_db)):

    todo =  db.query(models.Todo).filter(models.Todo.id == id)

    if todo.first() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"The id:{id} does not exist")
    todo.update(update_todo.dict(), synchronize_session=False)
    db.commit()


    return  todo.first()