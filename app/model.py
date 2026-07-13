from sqlalchemy import Integer, String, Text, ForeignKey, Float, Date
from sqlalchemy.orm import Relationship, Mapped, mapped_column
from .extension import db
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False , unique=True)
    password: Mapped[str] = mapped_column(String(100), nullable=False)
    username: Mapped[str] = mapped_column(String(100), nullable=False)
