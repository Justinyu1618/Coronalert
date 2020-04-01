include config.mk

MAKEFLAGS += --silent

# Install dependencies for server and client
install:
	echo "\n\n$(NOTIFY_FORMAT)Installing server dependencies...$(NORMAL_FORMAT)"
	$(VENV)bin/pip install -r $(REQUIREMENTS) 
	echo "\n\n$(NOTIFY_FORMAT)Installing client dependencies...$(NORMAL_FORMAT)"
	npm install -C $(CLIENT)

# Remove unnecessary build/temp files
clean:
	echo "Cleaning project directories...$(NORMAL_FORMAT)"
	find . | grep -E "(__pycache__|\.pyc|\.pyo$$)" | xargs rm -rf

# Build templates from client code
build: clean
	echo "\n\n$(NOTIFY_FORMAT)Building client side code...$(NORMAL_FORMAT)"
	npm run build -C $(CLIENT)
	
	if ! test -f $(SERVER_CONFIG); then \
		echo "\n\n$(NOTIFY_FORMAT)Creating server config...$(NORMAL_FORMAT)"; \
		cp $(SERVER_CONFIG_EXAMPLE) $(SERVER_CONFIG); \
	fi

# Deploy to Heroku 
deploy:
	echo "\n\n$(NOTIFY_FORMAT)Deploying to Heroku ... (do not ctrl-C)$(NORMAL_FORMAT)"
	if ! test -f "Procfile"; then \
	    echo "web: python3 run.py" > Procfile; \
	fi
	make build
	git add -f $(CLIENT)/build; git commit -m "temp build folder for Heroku deploy" > /dev/null
	git push heroku master
	git rm -r --cached $(CLIENT)/build; git commit -m "rm temp build folder" > /dev/null 2>&1
	# git reset --hard HEAD~1
	
# Deploy to Heroku 
deploy-prod:
	echo "\n\n$(NOTIFY_FORMAT)Deploying to Heroku ... (do not ctrl-C)$(NORMAL_FORMAT)"
	if ! test -f "Procfile"; then \
	    echo "web: python3 run.py" > Procfile; \
	fi
	make build
	git add -f $(CLIENT)/build; git commit -m "temp build folder for Heroku deploy" > /dev/null
	git push heroku-prod master
	git rm -r --cached $(CLIENT)/build; git commit -m "rm temp build folder" > /dev/null 2>&1
	# git reset --hard HEAD~1

# Lint code files
lint-server: clean
	echo "\n$(NOTIFY_FORMAT)Linting server code...$(NORMAL_FORMAT)\n"
	$(VENV)bin/isort -rc $(SERVER)
	$(VENV)bin/black $(SERVER) $(SERVER_TESTS)	
	if $(VENV)bin/flake8 --ignore=E501 $(SERVER) $(SERVER_TESTS); then \
		echo "\n\n$(SUCCESS_FORMAT)Server code check passed!$(NORMAL_FORMAT)"; \
	else \
		echo "\n\n$(ERROR_FORMAT)Server code check failed! Please check through and make the appropriate changes.$(NORMAL_FORMAT)"; \
		exit 1; \
	fi

lint-client: clean
	echo "\n$(NOTIFY_FORMAT)Linting client code...$(NORMAL_FORMAT)\n"
	
	if npm run lint -C $(CLIENT); then \
		echo "\n\n$(SUCCESS_FORMAT)Client code check passed!$(NORMAL_FORMAT)"; \
	else \
		echo "\n\n$(ERROR_FORMAT)Client code check failed! Please check through to make the appropriate changes.$(NORMAL_FORMAT)"; \
		exit 1; \
	fi

lint: clean lint-server lint-client	

# Test all server and client code
test: clean
	echo "$(NOTIFY_FORMAT)Running server tests...$(NORMAL_FORMAT)"
	$(VENV)bin/pytest
	echo "\n\n$(SUCCESS_FORMAT)All tests passed! Congrats :)$(NORMAL_FORMAT)"

# Run all formatting and checks before commit
pre-commit: lint build test