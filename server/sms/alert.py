from server.models import User, Location
from server import twilio_client, app, db
from datetime import datetime, timedelta
import json
from server.constants import *
from server.sms.msg_templates import *

#TODO: Option for neighboring counties


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
            prev_stats, prev_time = loc.prev_stats[0], loc.prev_stats[0]["timestamp"]
            prev_time = datetime.fromtimestamp(prev_time)
        else:
            prev_time, prev_stats = datetime.now(), loc.stats
    new_confirmed = int(loc.stats["Confirmed"]) - int(prev_stats["Confirmed"]) #TODO: don't assume always increase!
    new_deaths = int(loc.stats["Deaths"]) - int(prev_stats["Deaths"])
    return new_confirmed, new_deaths, prev_time.strftime(TIME_DISPLAY_STR)


def build_alert_msg(user):
    locs = filter_locations(user)
    msg = ""
    for loc in locs:
        place = [p for p in user.places if p["location_id"] == loc.id][0] # TODO: Ignores places with same location
        county = loc.name
        new_confirmed, new_deaths, time_since = calculate_stat_diffs(user, loc)
        total_confirmed, total_deaths = loc.stats["Confirmed"], loc.stats["Deaths"]
        last_updated = loc.last_update_time.strftime(TIME_DISPLAY_STR)
        source = "JHU CSSE" # TODO: make this general

        msg += ALERT_MSG % (place["address"], loc.name, new_confirmed, new_deaths, \
                             time_since, total_confirmed, total_deaths, last_updated, source)
        msg += "\n"
    msg += ALERT_FOOTER
    return msg

def build_starter_msg(user):
    msg = STARTER + build_alert_msg(user)
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
        msg = build_alert_msg(user)
        send_msg(user, msg)