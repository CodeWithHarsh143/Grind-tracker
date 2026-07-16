from sqlalchemy import String, Integer, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from flask_login import UserMixin
from .extension import db


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)

    username: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    password: Mapped[str] = mapped_column(String(255), nullable=False)

    profile: Mapped["UserProfile"] = relationship(back_populates="user", uselist=False)


class UserProfile(db.Model):
    __tablename__ = "profile"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(100), nullable=False)
    username: Mapped[str] = mapped_column(String(100), nullable=False)

    bio: Mapped[str | None] = mapped_column(String(500))

    leetcode: Mapped[str | None] = mapped_column(String)
    github: Mapped[str | None] = mapped_column(String)
    linkedin: Mapped[str | None] = mapped_column(String)
    personal_website: Mapped[str | None] = mapped_column(String)

    public_profile: Mapped[bool] = mapped_column(Boolean, default=False)
    streak_reminder: Mapped[bool] = mapped_column(Boolean, default=True)
    difficulty_filter: Mapped[str] = mapped_column(String, default="All")

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), unique=True, nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="profile")
