from geopy.geocoders import Nominatim
from server.models import Location
import json, requests

geo = Nominatim(user_agent="Coronalert")

# https://geo.fcc.gov/api/census/
FCC_API_REQUEST = "https://geo.fcc.gov/api/census/block/find?latitude=%s&longitude=%s&format=json"

def process_places(places):
    # location = geo.geocode(str(zipcode))
    # county = [a for a in location.raw if "County" in a][0]
    # if not county:
    #     print("[parse_location]: No county info found!")
    #     return Falseg
    locations = []
    for place in places:
        Loc = Location.query.filter_by(fips=place["fips"]).first()
        if not Loc:
            print("[process_locations] Location not found!")
            return 
        place["location_id"] = Loc.id
        locations.append(Loc)
    return places, locations

def process_settings(inp):
    return inp 

    # settings = {}
    # settings["frequency"] = inp["freqValue"]
    # settings["only_changes"] = inp["reportChangesValue"]
    # settings["custom_freq"] = inp["showCustomFreq"]
    # return settings

def unprocess_settings(settings):
    return settings 
    # out = {}
    # out["freqValue"] = settings["frequency"]
    # out["reportChangesValue"] = settings["only_changes"]
    # out["showCustomFreq"] = settings["custom_freq"]
    # return out


def delete_user(user):
    user.locations = []
    db.session.commit()
    db.session.delete(user)
    db.session.commit()