from flask import Blueprint, request, jsonify
from server import db
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
import sqlalchemy
import json
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse

sms_bp = Blueprint("sms", __name__)

@sms_bp.route("/sms", methods=['GET', 'POST'])
def sms_ahoy_reply():
    """Respond to incoming messages with a friendly SMS."""
    # Start our response
    resp = MessagingResponse()

    # Add a message
    resp.message("Ahoy! Thanks so much for your message.")

    return str(resp)
