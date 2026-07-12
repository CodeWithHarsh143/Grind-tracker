from flask import Flask,render_template
from .extension import db
from .auth.login import login_bp
from .auth.register  import register_bp
from .config import Config

def create_app():
  app = Flask(__name__,template_folder='../templates' , static_folder='../static')
  app.config.from_object(Config)
  db.init_app(app)
  #login_manager.init_app(app)
  #login_manager.login_view = "auth.login"
  @app.route('/')
  def home():
    return render_template('home.html')
  app.register_blueprint(register_bp)
  app.register_blueprint(login_bp)

  with app.app_context():
    db.create_all()

  return app

