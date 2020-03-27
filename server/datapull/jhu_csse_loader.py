import requests, csv
from datetime import datetime, timedelta
from io import StringIO
from server.models import Location
from server import db

BASE_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/%s.csv"

def jhu_csse_loader():
    date_str = (datetime.now() - timedelta(days=1)).strftime("%m-%d-%Y")
    url = BASE_URL % date_str
    print(url)
    resp = requests.get(url)
    if resp.status_code != 200:
        print("[jhu_csse_loader] Could not pull JHU_CSSE data!")
        return
    f = StringIO(resp.text)
    reader = csv.DictReader(f)
    num_changed = 0
    for row in reader:
        try:
            update_db_row(row)
            num_changed += 1
        except Exception as e:
            print(f"[jhu_csse_loader] Failed to write row\nError: {e}")
    return num_changed

def update_db_row(data):
    if not data["FIPS"]: # TODO: restricts to US counties
        return True
    new_stats = {k:v for k,v in data.items() if k in {"Confirmed", "Deaths", "Recovered", "Active"}}

    location = Location.query.filter_by(fips=data["FIPS"]).first()
    if not location:
        location = Location()
        location.populate_jhu_csse(data, stats=new_stats)
        db.session.add(location)
    else:
        # source_update_time = datetime.strptime(data["Last Update"], "%Y-%m-%d %H:%M:%S")
        location.update_stats(new_stats)
    print(f"Updated stats for {location.combined_key}")
    db.session.commit()

def is_stats_same(original, new):
    assert set(original.keys()) != set(new.keys()), "[compare_stats] Stats object keys don't match!"
    return all([original[k] == new[k] for k in original])


if __name__ == '__main__':
    jhu_csse_loader()