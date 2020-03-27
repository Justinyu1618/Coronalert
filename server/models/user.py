from server import db
from datetime import datetime, timedelta
from flask import Flask
from .utils import JsonEncodedDict, user_location_table

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(50), unique=True)
    settings = db.Column(JsonEncodedDict)
    last_sms_timestamp = db.Column(db.DateTime)
    prev_stats = db.Column(JsonEncodedDict)
    places = db.Column(JsonEncodedDict)
    locations = db.relationship('Location', secondary=user_location_table, backref='user')
    last_updated = db.Column(db.DateTime)

    def populate(self, data, **kwargs):
        for key, val in data.items():
            if hasattr(self, key): setattr(self, key, val)

        for key, val in kwargs.items():
            if hasattr(self, key): setattr(self, key, val)
        last_updated = datetime.now()

    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}





# Make places a dict, keyed by locations id