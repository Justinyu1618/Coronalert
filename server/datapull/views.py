from flask import Blueprint, request, jsonify
from server import db
from flask_sqlalchemy import SQLAlchemy
# from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta
import sqlalchemy
from .jhu_csse_loader import jhu_csse_loader

datapull_bp = Blueprint("datapull", __name__)

@datapull_bp.route('/pull', methods=['GET'])
def pull():
    response = {
        "success": False,
        "changes": 0,
        "msg": ""
    }

    try:
        num_changed = jhu_csse_loader()
        assert type(num_changed) == int, "loader failed!"
        response["success"] = True
        response["changes"] = num_changed
        return response, 200
    except Exception as e:
        response["msg"] = str(e)
        return response, 400
    