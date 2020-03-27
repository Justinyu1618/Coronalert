from flask import Blueprint, request, jsonify
from server import db
from flask_sqlalchemy import SQLAlchemy
from server.models import User
# from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta
import sqlalchemy
import json
from .utils import process_places

user_bp = Blueprint("user", __name__)


@user_bp.route('/submit', methods=['POST'])
def submit():
    body = request.get_json()
    user = User.query.filter_by(phone_number=body["phone_number"]).first()
    if not user:
       user = User()

    # Build response object
    response = {
        "success": False,
        "msg": ""
    }

    # Modify places
    new_places = process_places(body["places"])
    if not new_places:
        response["msg"] = "Could not find County of one of your addresses!"
        return jsonify(response), 400

    body["places"] = new_places[0]
    body["locations"] = new_places[1]

    try:
        user.populate(body)
        db.session.add(user)
        db.session.commit()
        response["success"] = True
    except Exception as e:
        raise e #print(e)
        response["msg"] = str(e)
        return jsonify(response), 400
    return jsonify(response)

