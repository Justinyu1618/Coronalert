from server import create_app
from datetime import datetime, timedelta

if __name__ == '__main__':
    app = create_app()
    
    from server.sms.alert import run_alerts
    from server.datapull.jhu_csse_loader import jhu_csse_loader

    # jhu_csse_loader(datetime.now() - timedelta(days=1))
    # jhu_csse_loader(datetime.now())
    run_alerts()
