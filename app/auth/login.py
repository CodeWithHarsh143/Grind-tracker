from werkzeug.security import check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from flask import Blueprint, render_template, request, flash, redirect, url_for
from app.extension import db
from app.model import User
from app.extension import login_manager

login_bp = Blueprint("login", __name__)


@login_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = (request.form.get("email") or "").strip()
        password = request.form.get("password")
        user = User().query.filter_by(email=email).first()
        # print("Email" , email)
        # print("Password" ,password)
        if not user or not check_password_hash(user.password, password=password):
            return render_template("login.html", user=False)
        login_user(user)
        flash("Logged in successfully!", "success")
        return redirect(url_for("home.home"))
    return render_template("login.html", user=True)


@login_bp.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You have been logged out", "success")
    return redirect(url_for("home.home"))


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@login_bp.route("/delete-account")
@login_required
def delete_account():
    user = current_user
    logout()
    db.session.delete(user)
    db.session.commit()
    return 200, ""
