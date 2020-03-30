from flask import Blueprint, request, jsonify
from server import db
from server.models import User
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
import sqlalchemy
import json
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse

sms_bp = Blueprint("sms", __name__)

@sms_bp.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    """Respond to incoming messages with a friendly SMS."""
    # Start our response
    resp = MessagingResponse()

    body = request.values.get('Body', None)
    number = requeset.values.get('From', None)

    if body.lower() == "update":
        user = User.query.filter_by(phone_number=number)
        msg = build_update_msg(user)
        resp.message(msg)
    else:
        msg = "I don't recognize this message"
    return str(resp)



    #CombinedMultiDict([ImmutableMultiDict([]), ImmutableMultiDict([('ToCountry', 'US'), ('ToState', 'AL'), ('SmsMessageSid', 'SM0e85f49f40fe3b7d21a854641232dd25'), ('NumMedia', '0'), ('ToCity', ''), ('FromZip', '02148'), ('SmsSid', 'SM0e85f49f40fe3b7d21a854641232dd25'), ('FromState', 'MA'), ('SmsStatus', 'received'), ('FromCity', 'MELROSE'), ('Body', 'Hi'), ('FromCountry', 'US'), ('To', '+12058467029'), ('ToZip', ''), ('NumSegments', '1'), ('MessageSid', 'SM0e85f49f40fe3b7d21a854641232dd25'), ('AccountSid', 'AC8f73ee090e440b4d35b1020952e45fed'), ('From', '+16179570655'), ('ApiVersion', '2010-04-01')])])