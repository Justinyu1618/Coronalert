from server import db
from datetime import datetime, timedelta
from flask import Flask
from .utils import JsonEncodedDict, user_location_table

class Source(db.Model):
    __tablename__ = "source"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    link = db.Column(db.String)
    pull_freq = db.Column(db.Integer) #in seconds
    last_pull_time = db.Column(db.DateTime)

    def populate(self, data, **kwargs):
        for key, val in data.items():
            if hasattr(self, key): setattr(self, key, val)

        for key, val in kwargs.items():
            if hasattr(self, key): setattr(self, key, val)

    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}