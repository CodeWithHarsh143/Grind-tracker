from flask import Blueprint, render_template, jsonify, request, redirect, url_for
from flask_login import current_user
from ..model import User, UserProfile

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/profile-setting", methods=["GET", "POST"])
def profile():
    data = request.get_json()
    if request.method == "POST":
        try:
            user = UserProfile.query.filter_by(user_id=current_user.id).first()
            user.name = data["name"]
            user.username = data["username"]
            user.bio = data["bio"]
            user.streak_reminder = data["streak_reminder"]
            user.public_profile = data["public_profile"]
            user.difficulty_filter = data["difficulty_select"]
            user.leetcode_url = data["leetcode"]
            user.github_url = data["github"]
            user.linkedin_url = data["linkedin"]
            user.website_link = data["website"]
            user.session.commit()
            flask("Profile Setting is Saved", "success")
            return redirect(url_for("home.home"))
        except NotImplementedError:
            flask("Error")
            return redirect(url_for("profile.profile"))
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
