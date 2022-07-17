from fastapi import APIRouter, HTTPException, Depends
from settings import settings

from sqlalchemy.exc import IntegrityError
from .schemas import *
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
import os
import json
from jose import jwt
import models
from dependencies import get_db, get_current_user, bcrypt_context, credentials_exception, get_password_hash, verify_password
router = APIRouter()


def authenticate_user(username: str, password: str, db):
    user = db.query(models.User).filter(
        models.User.username == username).first()

    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(username: str, user_id: int, expires_delta: Optional[timedelta] = None):
    encode = {
        "user_id": user_id,
        "sub": username
    }
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15*10000)
    encode.update({
        "exp": expire
    })
    return jwt.encode(encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


@router.post("/login")
async def login(form_data: LoginUserSchema, db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise credentials_exception

    if not user.is_admin:
        raise HTTPException(
            status_code=403, detail="Your account is not Authorized!")

    token_expires = timedelta(minutes=settings.TOKEN_EXPIRES_AFTER)
    token = create_access_token(
        user.username, user.id, expires_delta=token_expires)
    return {
        "token": token
    }


@router.post("/register")
async def create_user(create_user: CreateUserSchema, db: Session = Depends(get_db)):

    try:
        user = models.User()
        user.name = create_user.name
        user.username = create_user.username
        user.password = get_password_hash(create_user.password)

        db.add(user)

        db.commit()
        db.refresh(user)

        return user
    except IntegrityError as e:
        raise HTTPException(
            status_code=500, detail="Sorry, User Already Exist")


@router.get("/me")
async def who_Am_I(user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):

    return user
