from server import db
from datetime import datetime, timedelta
from flask import Flask
from .utils import JsonEncodedDict, user_location_table

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(50), unique=True)
    settings = db.Column(db.JSON)
    last_sms_timestamp = db.Column(db.DateTime)
    prev_stats = db.Column(db.JSON)
    places = db.Column(db.JSON)
    locations = db.relationship('Location', secondary=user_location_table, backref='user')
    last_updated = db.Column(db.DateTime)
    # flagged = db.Column(db.Boolean)

    def populate(self, data, **kwargs):
        # self.flagged = False

        for key, val in data.items():
            if hasattr(self, key): setattr(self, key, val)
        if self.last_sms_timestamp is None:
            self.last_sms_timestamp = datetime.now()
        self.last_updated = datetime.now()


        for key, val in kwargs.items():
            if hasattr(self, key): setattr(self, key, val)
        
    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def update_stats(self, stats):
        print(f"updating stats:\nPrev: {self.prev_stats}")
        temp_stats = {} if self.prev_stats is None else self.prev_stats.copy()
        for k,v in stats.items():
            temp_stats[k] = v
        self.prev_stats = temp_stats
        print(f"New:{self.prev_stats}")
        self.last_sms_timestamp = datetime.now()
        db.session.commit()

    # def flag(self, value):
    #     self.flagged = value