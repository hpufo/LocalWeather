# LocalWeather

Deployed on: https://hpufo.github.io/LocalWeather

Technology used: React, styled-components, jest, enzyme, moment

Install dependices with: "yarn/npm install"

Start dev server with: "yarn/npm run"

Run tests in watch mode with: "yarn/npm test"

Build: "yarn/npm build"

About this project: The OpenWeatherAPI limits weather readings to one reading per device every ten mins. Because of this, I get the response and store it in local storage. I also try to use the cached reponse whenever possible refreshing the cache after ten mins. Since you are limited to one query per ten mins, I didn't think it would make sense to have the user request a weather reading for a city since they will have to wait 10 mins before getting another one. So instead I decided to just have this app display the five day forcast for the user's location. I attempt to get the user's location through the browser's geolocation, and then from their IP address if I couldn't get it from either then they cannot use this app. 