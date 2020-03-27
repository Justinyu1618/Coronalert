from flask import Flask, render_template
# from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from twilio.rest import Client

STATIC_FOLDER = "../client/build/static"
TEMPLATE_FOLDER = "../client/build"
CONFIG_FILE = "./config.py"    


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

    app.register_blueprint(user_bp, url_prefix="/api/user")
    app.register_blueprint(location_bp, url_prefix="/api/location")
    app.register_blueprint(datapull_bp, url_prefix="/api/datapull")


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

    # Set up and configure app
    app = Flask(__name__, static_folder=STATIC_FOLDER, template_folder=TEMPLATE_FOLDER)
    app.config.from_pyfile(CONFIG_FILE)

    if app.config["DEBUG"]:
        setup_debug()

    # Set up database
    db = SQLAlchemy(app)
    load_models()

    setup_default_routes()
    load_blueprints()

    # Set up JWT for app
    # setup_jwt()
    # jwt = JWTManager(app)

    twilio_client = Client(app.config["TWILIO_SID"], app.config["TWILIO_AUTH_TOKEN"])

    return app