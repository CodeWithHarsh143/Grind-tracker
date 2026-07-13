from flask import Blueprint, render_template , redirect , request , flash,url_for
from app.model import User
register_bp = Blueprint("register", __name__)
from werkzeug.security import generate_password_hash
from app.extension import db

@register_bp.route("/register",methods = ["GET","POST"])
def register():
    if request.method == "POST":
      name = (request.form.get("name") or "").strip()
      username =(request.form.get("username") or "").strip()
      email = (request.form.get("email") or "").strip()
      password = request.form.get("password") or ""
      # I alredy check if password is equal to or not of confirm password
      user = User.query.filter_by(email = email).first()
      if user:
          flash("Email already exists. Please log in instead.", "warning")
          return redirect(url_for('login.login'))
      new_user = User(
        name = name,
        email = email,
        username = username,
        password = generate_password_hash(password=password , method="scrypt",salt_length=8)
      )
      db.session.add(new_user)
      db.session.commit()

      flash("Account created successfully!", "success")
      return redirect(url_for('login.login'))
    return render_template("register.html")
