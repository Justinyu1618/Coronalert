from server.models import User, Location
from server import twilio_client, app, db
from datetime import datetime, timedelta
import json

DATETIME_STR = ""
#TODO: Option for neighboring counties

ALERT_MSG = """
\nLOCATION: %s\n
County: %s
There are %s new CONFIRMED cases and %s DEATHS since %s
    
    Total Confirmed: %s
    Total Deaths: %s

Last Updated: %s
Source: %s
"""

ALERT_FOOTER = """
    You are recieving this because you subscribed to Coronalert. Wash your hands!
"""
def filter_users_to_alert(users):
    final = []
    for user in users:
        freq = user.settings["frequency"]
        if user.last_sms_timestamp + timedelta(seconds=int(freq)) <= datetime.now():
            final.append(user)
    return final

def filter_locations(user):
    print(f"LOCATIONS: {user.locations}")
    final = []
    for loc in user.locations:
        if user.settings["only_changes"]:
            if loc.last_change_time <= user.last_sms_timestamp:
                continue
        final.append(loc)
    return final

def calculate_stat_diffs(user, loc):
    prev_stats = user.prev_stats
    prev_time = user.last_sms_timestamp
    if prev_stats is None:
        # grab most recent previous stat of location
        if loc.prev_stats:
            prev_time, prev_stats = loc.prev_stats[0], loc.prev_stats[0].timestamp
            prev_time = datetime.fromtimestamp(prev_time)
        else:
            prev_time, prev_stats = datetime.now(), loc.stats
    new_confirmed = int(loc.stats["Confirmed"]) - int(prev_stats["Confirmed"]) #TODO: don't assume always increase!
    new_deaths = int(loc.stats["Deaths"]) - int(prev_stats["Deaths"])
    return new_confirmed, new_deaths, prev_time.strftime("%H:%M %p, %m/%d/%y")


def build_alert_msg(user, locs):
    msg = ""
    for loc in locs:
        place = [p for p in user.places if p["location_id"] == loc.id][0] # TODO: Ignores places with same location
        county = loc.name
        new_confirmed, new_deaths, time_since = calculate_stat_diffs(user, loc)
        total_confirmed, total_deaths = loc.stats["Confirmed"], loc.stats["Deaths"]
        last_updated = loc.last_update_time.strftime("%H:%M %p, %m/%d/%y")
        source = "JHU CSSE" # TODO: make this general

        msg += ALERT_MSG % (place["address"], loc.name, new_confirmed, new_deaths, \
                             time_since, total_confirmed, total_deaths, last_updated, source)
        msg += "\n"
    msg += ALERT_FOOTER
    return msg


def send_msg(user, msg):
    message = twilio_client.messages \
                    .create(
                         body=msg,
                         from_=app.config["TWILIO_NUMBER"],
                         to=user.phone_number
                     )
    print(f"Sent Message. ID: {message.sid}")



def run_alerts():
    all_users = User.query.all()
    all_locations = Location.query.all()
    users_to_alert = filter_users_to_alert(all_users)
    
    for user in users_to_alert:
        locs = filter_locations(user)
        msg = build_alert_msg(user, locs)
        send_msg(user, msg)

if __name__ == '__main__':
    run_alerts()