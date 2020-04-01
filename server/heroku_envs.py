import os
import config

config_vars = [item for item in dir(config) if not item.startswith("__")]
for k, v in [(k, getattr(config, k)) for k in dir(config) if not k.startswith("__")]:
    os.system(f"heroku config:set {k}='{v}' -a coronalert-dev")
