# Server
VENV = venv/
PYTHON = $(VENV)bin/python
REQUIREMENTS = requirements.txt

# Directories
SERVER = server/
SERVER_TESTS = tests/server
CLIENT = client/
SERVER_CONFIG_EXAMPLE = $(SERVER)config.example
SERVER_CONFIG = $(SERVER)config.py

# Text formatting
ERROR_FORMAT = \e[41m
NORMAL_FORMAT = \e[49;39m
SUCCESS_FORMAT = \e[102;90m
NOTIFY_FORMAT = \e[44m

# git
HEROKU_BRANCH = heroku