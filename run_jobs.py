from server import create_app



if __name__ == '__main__':
    app = create_app()
    
    from jobs.alert import run_alerts
    run_alerts()
