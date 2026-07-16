from flask import Blueprint, render_template

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/profile", methods=["GET", "POST"])
def profile():
    return render_template("profile.html")
