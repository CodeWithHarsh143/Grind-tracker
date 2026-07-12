from flask import Flask, abort, flash, redirect, render_template, request, url_for
from login import login_bp
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

app.register_blueprint(login_bp)
if __name__ == "__main__":
    app.run(debug=True)


