from server import db
from datetime import datetime, timedelta
from flask import Flask
from .utils import JsonEncodedDict, user_location_table

class Datapull(db.Model):
    __tablename__ = "datapull"

    id = db.Column(db.Integer, primary_key=True)
    source_name = db.Column(db.String)
    timestamp = db.Column(db.DateTime)
    data_link = db.Column(db.String)
    source_update_timestamp = db.Column(db.DateTime)

    def populate(self, data, **kwargs):
        timestamp = datetime.now()
        for key, val in data.items():
            if hasattr(self, key): setattr(self, key, val)

        for key, val in kwargs.items():
            if hasattr(self, key): setattr(self, key, val)

    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}