from geopy.geocoders import Nominatim
from server.models import Location
import json

geo = Nominatim(user_agent="Coronalert")

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
