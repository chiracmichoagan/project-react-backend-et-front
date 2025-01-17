import jose
from typing import List
from fastapi import HTTPException, Depends, FastAPI, status, HTTPException
from sqlalchemy.orm import Session
from starlette import status
import models
import schemas
from fastapi import APIRouter
from db import get_db
from passlib.context import CryptContext
import jwt 
from datetime import datetime
from models import User, TokenTable
from fastapi.security import OAuth2PasswordBearer
from auth_bearer import JWTBearer
from functools import wraps
from utils import create_access_token, create_refresh_token,verify_password, get_hashed_password
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days
ALGORITHM = "HS256"
JWT_SECRET_KEY = "narscbjim@$@&^@&%^&RFghgjvbdsha"   # should be kept secret
JWT_REFRESH_SECRET_KEY = "13ugfdfgh@#$%^@&jkl45678902"



# Configuration de l'algorithme de hachage
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Fonction pour hacher le mot de passe
def get_hashed_password(password: str) -> str:
    return pwd_context.hash(password)

# Fonction pour vérifier le mot de passe
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

router = APIRouter( 
    prefix='/auth',
    tags=['Auth']
)

@router.post('/register', status_code=status.HTTP_201_CREATED)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter_by(email=user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    encrypted_password =get_hashed_password(user.password)

    new_user = models.User(username=user.username, email=user.email, password=encrypted_password )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message":"user created successfully"}

@router.post('/login', response_model=schemas.TokenSchema)
def login_user(request: schemas.requestdetails, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email")
    hashed_pass = user.password
    if not verify_password(request.password, hashed_pass):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password")  

    access = create_access_token(user.id)
    refresh = create_refresh_token(user.id)

    token_db = models.TokenTable(user_id=user.id, access_toke=access, refresh_toke=refresh, status=True)
    db.add(token_db)
    db.commit()
    db.refresh(token_db)
    return {"access_token":access, "refresh_token":refresh}

    @router.post('/logout', status_code=status.HTTP_200_OK)
    def logout(dependencies=Depends(JWTBearer()), db: Session = Depends(get_db)):
        token=dependencies
        playload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        user_id = playload.get("sub")
        token_record = db.query(models.TokenTable).all()
        info=[]
        for record in token_record:
            print("record",record)
            if (datetime.utcnow()- record.created_date) > 1:
                info.append(record.user_id)  
            if info:
                existing_token = db.query(models.TokenTable).where(TokenTable.user_id.in_(info)).delete()
                db.commit()   
            existing_token = db.query(models.TokenTable).filter(models.user_id == user_id, models.TokenTable.access_token).first()
            if existing_token:
                existing_token.status=False
                db.add(existing_token)
                db.commit()
                db.refresh(existing_token)
            return {"message": "Logout Successfully"}                 