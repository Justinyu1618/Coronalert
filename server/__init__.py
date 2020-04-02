from flask import Flask, render_template
# from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from twilio.rest import Client
from flask_migrate import Migrate
import os

STATIC_FOLDER = "../client/build/static"
TEMPLATE_FOLDER = "../client/build"
CONFIG_FILE = "./config.py"    
CONFIG_EXAMPLE = "server/config.example"

def load_from_env(app, *args):
    for a in args:
        app.config[a] = os.environ[a]

def load_models():
    """
    Load all database models and create tables
    """
    from server.models import User  # noqa
    from server.models import Location  # noqa

    db.create_all()


def load_blueprints():
    """
    Load all blueprints for app
    """
    from server.user.views import user_bp
    from server.location.views import location_bp
    from server.datapull.views import datapull_bp
    from server.sms.views import sms_bp

    app.register_blueprint(user_bp, url_prefix="/api/user")
    app.register_blueprint(location_bp, url_prefix="/api/location")
    app.register_blueprint(datapull_bp, url_prefix="/api/datapull")
    app.register_blueprint(sms_bp, url_prefix="/api/sms")


def setup_default_routes():
    """
    Set up default routes for app
    """
    @app.errorhandler(404)
    def default(error):
        return render_template("index.html")


def setup_debug():
    """
    Set up debug settings
    """
    from flask_cors import CORS

    app.config["JWT_COOKIE_CSRF_PROTECT"] = False
    CORS(app, origins=[app.config["FRONTEND_URL"]], supports_credentials=True)


def setup_jwt():
    """
    Set up JWT for app
    """
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_REFRESH_COOKIE_PATH"] = "/api/auth/token/refresh"


def create_app():
    """
    Creates flask app, setting up database and blueprints
    """
    global app
    global db
    global jwt
    global twilio_client
    global migrate

    # Set up and configure app
    app = Flask(__name__, static_folder=STATIC_FOLDER, template_folder=TEMPLATE_FOLDER)
    try:
        app.config.from_pyfile(CONFIG_FILE)
        print("Loading secret configs from file")
    except FileNotFoundError as e:
        env_vars = [line.split("=")[0] for line in open(CONFIG_EXAMPLE, "r")]
        load_from_env(app, *env_vars)
        print("Loading secret configs from env")


    if app.config["DEBUG"]:
        setup_debug()

    # Set up database
    db = SQLAlchemy(app)
    load_models()

    # Set up Flask Migrations
    migrate = Migrate(app, db)

    # Set up Twilio
    twilio_client = Client(app.config["TWILIO_SID"], app.config["TWILIO_AUTH_TOKEN"])



    # Setup routes and bps
    setup_default_routes()
    load_blueprints()

    # Set up JWT for app
    # setup_jwt()
    # jwt = JWTManager(app)

    

    return app






"""

TODO:
 - Self-reporting feature for sms
 - Domain name 
 - Manifest stuff


"""