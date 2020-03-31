from server.models import User, Location
from server import app, db, twilio_client
from datetime import datetime, timedelta
import json
from server.constants import *
from server.sms.msg_templates import *

#TODO: Option for neighboring counties


def filter_users_to_alert(users):
    final = []
    for user in users:
        freq = user.settings["freqValue"]
        if user.last_sms_timestamp + timedelta(days=int(freq)) <= datetime.now():
            final.append(user)
        else:
            print(f"User {user.phone_number}: Not time yet")
    return final

def filter_locations(user):
    print(f"LOCATIONS: {user.locations}")
    final = []
    for loc in user.locations:
        if user.settings["reportChangesValue"]:
            if loc.last_change_time <= user.last_sms_timestamp:
                continue
        final.append(loc)
    return final

def calculate_stat_diffs(user, loc):
    prev_stats = None if not user.prev_stats or str(loc.id) not in user.prev_stats else user.prev_stats[str(loc.id)]
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
    time_since = (datetime.now() - prev_time).seconds / (60*60*24)
    time_since = f"{round(time_since * 24)} hours" if time_since < 1 else f"{round(time_since)} days"
    return new_confirmed, new_deaths, time_since


def build_alert_msg(user, locs=None, update_stats=True):
    locs = user.locations if locs is None else locs
    print(f"LOCS: {locs}")
    msg = ""
    for loc in locs:
        place = [p for p in user.places if p["location_id"] == loc.id][0] # TODO: Ignores places with same location
        county = loc.name
        new_confirmed, new_deaths, time_since = calculate_stat_diffs(user, loc)
        total_confirmed, total_deaths = loc.stats["Confirmed"], loc.stats["Deaths"]

        msg += ALERT_MSG % (place["data"]["description"], loc.name, new_confirmed, new_deaths, \
                             time_since, total_confirmed, total_deaths)
        msg += "\n"
    last_updated = loc.last_update_time.strftime(TIME_DISPLAY_STR)
    source = "JHU CSSE" # TODO: make this general
    msg += ALERT_SOURCE % (last_updated, source)
    msg += ALERT_FOOTER

    if update_stats:
        stats = {loc.id:loc.stats for loc in locs}
        user.update_stats(stats)
    return msg

def build_starter_msg(user):
    msg = STARTER + build_alert_msg(user, user.locations)
    return msg

def send_msg(user, msg, update_stats=True):
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
        if len(locs) == 0:
            print(f"User {user.phone_number}: No locations updated!")
            continue
        msg = build_alert_msg(user, locs)
        send_msg(user, msg)