from flask import Blueprint, render_template, jsonify, request
from flask_login import current_user
from ..model import User

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/profile", methods=["GET", "POST"])
def profile():
    return render_template("profile.html")


@profile_bp.route("/check-username")
def checkUsername():
    username = request.args.get("username", "").strip()
    if username == current_user.username:
        return jsonify({"available": True})
    user = User.query.filter_by(username=username).first()

    return jsonify(
        {
            "available": user is None  # return true if user is not avialable
        }
    )
