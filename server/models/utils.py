import json
from server import db
from sqlalchemy.ext import mutable

class JsonEncodedDict(db.TypeDecorator):
    impl = db.Text
    def process_bind_param(self, value, dialect):
        if value is None:
            return '{}'
        else:
            return json.dumps(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return {}
        else:
            return json.loads(value)

mutable.MutableDict.associate_with(JsonEncodedDict)

user_location_table = db.Table('user_location_table', 
                            db.Column('user_id', db.Integer, db.ForeignKey('user.id'), nullable=False),
                            db.Column('location_id',db.Integer, db.ForeignKey('location.id'), nullable=False),
                            )