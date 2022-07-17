from typing import Optional

from pydantic import BaseModel


# from pydantic_sqlalchemy import sqlalchemy_to_pydantic
# from models import User
# CreateUserModel = sqlalchemy_to_pydantic(User)



# class CreatePersonalAccountSchema(BaseModel):

class CreateUserSchema(BaseModel):
    name: str
    username: str
    password: str

class LoginUserSchema(BaseModel):
    username: str
    password: str