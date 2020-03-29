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
    #     return False
    locations = []
    location_fips = "25017"
    for place in places:
        address = place["address"]
        Loc = Location.query.filter_by(fips=location_fips).first()
        if not Loc:
            print("[process_locations] Location not found!")
            return 
        place["location_id"] = Loc.id
        locations.append(Loc)
    return places, locations
