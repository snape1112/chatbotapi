import uuid
import models
from jose import jwt
from jose.exceptions import JWTError
from database import SessionLocal
from fastapi import Depends, status
from settings import settings
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid


bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="login")

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_password_hash(password):
    return bcrypt_context.hash(password)


def verify_password(password, hashed_password):
    return bcrypt_context.verify(password, hashed_password)


async def get_current_user(token: str = Depends(oauth2_bearer), db: Session = Depends(get_db)):

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, settings.ALGORITHM)

        username = payload.get("sub")
        user_id = payload.get("user_id")
        if username is None or user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.query(models.User).filter_by(username=username).first()

    return user
