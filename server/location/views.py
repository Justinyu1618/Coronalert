from flask import Blueprint, request, jsonify
from server import db
from flask_sqlalchemy import SQLAlchemy
from server.models import User
# from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta
import sqlalchemy

location_bp = Blueprint("location", __name__)