# Coronalert
Coronalert is an SMS-based, "amber-alert" style app for alerting users of active Covid-19 cases in their area. The sign up interface is very simple and easy to use, and the alerts are meant to reflect the most up to date data at a frequency chosen by the user.

![image](https://raw.githubusercontent.com/Justinyu1618/Coronalert/master/client/public/coronalert.png)


## Development (Fullstack/Backend)
Coronalert is built with Flask and React, serving built React templates through a Flask backend.

**Note**: running this will not track live changes to frontend code. You will need to rebuild the React templates to see frontend changes.

1. Create Python3 virtual environment
```sh
virtualenv -p python3 venv
source venv/bin/activate
```

If you are running windows, your Python3 may just be called `python` instead of `python3`. In that case, run:
```sh
virtualenv -p python venv
source venv/bin/activate
```

2. Install dependencies
```sh
make install
```

3. Build React templates
```sh
make build
```

4. Fill in server config accordingly
```sh
vi server/config.py
```

5. Run Flask server
```sh
python run.py
```

## Development (Frontend)

**Note**: running this alone will not have any of the backend logic running, but it will track live changes to frontend code. To track frontend code and have backend functionality, run both the frontend and backend development servers locally.

1. Change to `client` directory
```sh
cd client
```
2. Install all dependencies
```sh
npm install
```
3. Start development server
```sh
npm start
```

## Contributing
Before commiting code changes, *always* run:
```sh
make pre-commit
```

## Deploying to Heroku
Currently supports two heroku instances, development and production.

Add both instances as remotes under the names `heroku` and `heroku-prod`:
```sh
git add remote heroku <development instance url>
git add remote heroku-prod <production instance url>
```

Deploy changes using the commands:
```sh
make deploy
make deploy-prod
```

**Note**: Currently it will force add the build directory to git and push it to heroku, then remove it after. There are probably better alternatives so this is a temporary solution.

