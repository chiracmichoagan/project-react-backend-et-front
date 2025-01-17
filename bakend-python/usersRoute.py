from typing import List
import fastapi
from sqlalchemy.orm import Session
from starlette import status
import models
import schemas
from functools import wraps 
from fastapi import APIRouter
from db import get_db
from fastapi import Depends
from auth_bearer import JWTBearer
router = APIRouter( 
    prefix='/users',
    tags=['Users']
)

def token_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
    
        payload = jwt.decode(kwargs['dependencies'], JWT_SECRET_KEY, ALGORITHM)
        user_id = payload['sub']
        data= kwargs['session'].query(models.TokenTable).filter_by(user_id=user_id,access_toke=kwargs['dependencies'],status=True).first()
        if data:
            return func(kwargs['dependencies'],kwargs['session'])
        
        else:
            return {'msg': "Token blocked"}
        
    return wrapper

@token_required 
@router.get('/', response_model=List[schemas.UserCreate])
def get_users(dependencies=Depends(JWTBearer()),db: Session = Depends(get_db)):

    users = db.query(models.User).all()

    return users

@router.post('/', status_code=status.HTTP_201_CREATED, response_model=List[schemas.UserCreate])
def create_user(user:schemas.UserCreate, db:Session = Depends(get_db)):

    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return [new_user]

@router.get('/{id}', response_model=schemas.UserCreate, status_code=status.HTTP_200_OK)
def get_user(id:int ,db:Session = Depends(get_db)):

    user  = db.query(models.User).filter(models.User.id == id).first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"The id: {id} you requested for does not exist")
    return user

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_user(id:int, db:Session = Depends(get_db)): 
    user = db.query(models.User).filter(models.User.id == id)
    
    if user.first() is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"The id: {id} you requested for does not exist")
    user.delete(synchronize_session=False)
    db.commit() 
    
@router.put('/{id}', response_model=schemas.UserCreate)
def update_user(update_user:schemas.UserCreate, id:int, db:Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"The id: {id} you requested for does not exist")
    user.username = update_user.username
    user.email = update_user.email
    user.password = update_user.password
    db.commit()
    db.refresh(user)
    return user.fisrt()


@router.post('/change-password', status_code=status.HTTP_200_OK)
def change_password(request: schemas.changepassword, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
    
    if not verify_password(request.old_password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid old password")
    
    encrypted_password = get_hashed_password(request.new_password)
    user.password = encrypted_password
    db.commit()
    
    return {"message": "Password changed successfully"}    

    