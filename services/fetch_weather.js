const md5 = require('js-md5')
const NodeCache = require('node-cache-promise')
const RequestPromise = require('request-promise')

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 0 })

// TODO Break down into OpenWeather model and cache here.
module.exports = function FetchWeather () {
  const apiKey = process.env.API_KEY_OPENWEATHERMAP
  const apiURI = 'http://api.openweathermap.org/data/2.5/weather'

  const that = this
  this.resolve = null
  this.reject = null
  this.response = null

  this.run = function (cityName, units) {
    return new Promise(
      function (resolve, reject) {
        that.resolve = resolve
        that.reject = reject
        fetchWeatherInfo(cityName, units).then(onSuccess, onFail)
      }
    )
  }

  function fetchWeatherInfo (cityName, units) {
    const key = `openweathermap_city_${units}_${md5(cityName)}`

    return cache.get(key)
      .then(value => {
        if (value === undefined) { throw new Error('Not in cache: ', cityName, units) }

        console.log('Found in cache: ', cityName, units, key)
        return Promise.resolve(value)
      })
      .catch(() => {
        return requestWeather(cityName, units)
          .then(value => {
            cache.set(key, value)
            return Promise.resolve(value)
          })
      })
  }

  function requestWeather (cityName, units) {
    console.log('Going to call API for ', cityName, units)

    const options = {
      uri: apiURI,
      qs: {
        appid: apiKey,
        q: cityName,
        units: units,
      },
      json: true,
    }
    return RequestPromise.get(options)
  }

  function onSuccess (parsedBody) {
    that.response = parsedBody
    validateResponse()
    that.resolve(parseResponse())
  }

  function onFail (error) {
    try {
      that.reject(error.error.message)
    } catch (e) {
      that.reject(error)
    }
  }

  function validateResponse () {
    if (!that.response.main) { that.reject('No main info provided!!') }
  }

  function parseResponse () {
    const body = that.response

    return {
      cityName: body.name,
      coord: body.coord,
      description: `${body.weather[0].main} - ${body.weather[0].description}`,
      humidity: body.main.humidity,
      sunrise: new Date(body.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(body.sys.sunset * 1000).toLocaleTimeString(),
      temp: body.main.temp,
      tempHigh: body.main.temp_max,
      tempLow: body.main.temp_min,
    }
  }
}
