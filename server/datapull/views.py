from flask import Blueprint, request, jsonify
from server import db
from server.models import Location
from flask_sqlalchemy import SQLAlchemy
# from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta
import sqlalchemy
import requests
from .jhu_csse_loader import jhu_csse_loader
from server.constants import *

datapull_bp = Blueprint("datapull", __name__)

# https://geo.fcc.gov/api/census/
FCC_API_REQUEST = "https://geo.fcc.gov/api/census/block/find?latitude=%s&longitude=%s&format=json"

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
    

@datapull_bp.route('/get_data', methods=['POST'])
def get_data():
    response = {
        "success": False,
        "fips": 0,
        "data": None,
        "msg": ""
    }

    location_info = request.get_json()

    try:
        lat, lon = location_info["location"]["lat"], location_info["location"]["lng"]
        county_data = requests.get(FCC_API_REQUEST % (lat, lon)).json()
        FIPS = county_data["County"]["FIPS"]
        loc = Location.query.filter_by(fips=FIPS).first()
    except Exception as e:
        print("[get_data] FCC request failed!")
        print(e)
        response["msg"] = "County info not found!"
        return jsonify(response), 400
    
    response["fips"] = FIPS

    desired_stats = ["Confirmed", "Deaths"]
    response["data"] = {k:v for k,v in loc.stats.items() if k in desired_stats}
    response["source"] = "JHU CSSE" #TODO
    response["last_updated"] = loc.last_update_time.strftime(TIME_DISPLAY_STR)
    print(response["last_updated"])
    return jsonify(response), 200


@datapull_bp.route('/test_get_data', methods=['GET'])
def test_get_data():
    response = {
        "success": False,
        "fips": 0,
        "data": None,
        "msg": ""
    }
    
    try:
        FIPS = "25017"
        loc = Location.query.filter_by(fips=FIPS).first()
    except Exception as e:
        print("[get_data] FCC request failed!")
        print(e)
        response["msg"] = "County info not found!"
        return jsonify(response), 400
    
    response["fips"] = FIPS
    response["data"] = loc.stats

    return jsonify(response), 200
