Complete trash, but useful for having a containerized node app that gets
deployed into heterogenous environments, which has dynamic ENV bits to manage.

This app fetches and displays weather info via OpenWeatherMaps API.

Some canned cities are available, but in order to lookup weather anywhere,
the user must register / sign in (handled by Okta).
This helps avoid problems with bot traffic and free API limits.
