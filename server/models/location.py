from server import db
from datetime import datetime, timedelta
from flask import Flask
from .utils import JsonEncodedDict, user_location_table

class Location(db.Model):
    __tablename__ = "location"

    id = db.Column(db.Integer, primary_key=True)
    fips = db.Column(db.String(50), unique=True)
    name = db.Column(db.String)
    combined_key = db.Column(db.String, unique=True)
    province_state = db.Column(db.String)
    country_region = db.Column(db.String)
    lat_ = db.Column(db.Float)
    long_ = db.Column(db.Float)
    source_update_time = db.Column(db.DateTime)
    last_update_time = db.Column(db.DateTime)
    last_change_time = db.Column(db.DateTime)
    # last_update_datapull_id = 
    # last_update_source_id = db.relationship('Source', backref='location')
    change_flag = db.Column(db.Boolean)
    stats = db.Column(db.JSON)
    prev_stats = db.Column(db.JSON) #TODO: is this necessary?
    users = db.relationship('User', secondary=user_location_table, backref='location')
    
    def populate_jhu_csse(self, data, **kwargs):
        self.fips = data["FIPS"]
        self.name = data["Admin2"]
        self.combined_key = data["Combined_Key"]
        self.province_state = data["Province_State"]
        self.country_region = data["Country_Region"]
        self.lat_ = float(data["Lat"])
        self.long_ = float(data["Long_"])
        self.source_update_time = datetime.strptime(data["Last_Update"], "%Y-%m-%d %H:%M:%S")
        self.last_update_time = datetime.now()
        self.last_change_time = datetime.now()
        self.change_flag = True
        self.prev_stats = []

        for key, val in kwargs.items():
            if hasattr(self, key): setattr(self, key, val)

    def is_stats_same(self, new):
        original = self.stats
        assert set(original.keys()) == set(new.keys()), f"[is_stats_same] Stats object keys don't match!\n OG: {set(original.keys())}, NEW: {set(new.keys())}"
        return all([original[k] == new[k] for k in original])

    def update_stats(self, new_stats, source_update_time=None): # TODO: source_update_time necessary?
        if self.is_stats_same(new_stats):
            self.change_flag = False
        else:
            epoch = datetime.now().timestamp()
            self.stats["timestamp"] = epoch
            self.prev_stats.insert(0, self.stats)
            self.change_flag = True
            self.stats = new_stats
            self.last_change_time = datetime.now()
            if source_update_time:
                self.source_update_time = datetime.strptime(source_update_time, "%Y-%m-%d %H:%M:%S")
        self.last_update_time = datetime.now()

    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}