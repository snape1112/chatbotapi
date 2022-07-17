import sqlalchemy as sa
from database import Base


class BaseModel(Base):
    __abstract__ = True
    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)


class User(BaseModel):
    __tablename__ = "users"

    name = sa.Column(sa.String(60))
    username = sa.Column(sa.String(50), unique=True, nullable=False)
    password = sa.Column(sa.String(255))
    is_admin = sa.Column(sa.Boolean, default=False)



    

    def __repr__(self) -> str:
        return f"(User| {self.email})"
