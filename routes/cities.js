const express = require('express')
const router = express.Router()

const FetchWeather = require('../services/fetch_weather.js')

const hackyHandler = (req, res, next, city, units) => {
  if (!req.userinfo && !['seattle', 'denver', 'richmond', 'barcelona'].includes(city)) {
    res.render('index', { userinfo: req.userinfo, error: 'Must be signed in for custom cities, ya h4xx0r' })
    return
  }

  new FetchWeather().run(city, units)
    .then(weather => res.render('index', { userinfo: req.userinfo, weather: weather }))
    .catch(error => res.render('index', { userinfo: req.userinfo, error: error }))
}

router.get('/:city', (req, res, next) => {
  const city = req.params.city
  const units = 'imperial' // TODO make this a param

  hackyHandler(req, res, next, city, units)
})

// TODO DRY this whole thing
router.post('/', (req, res, next) => {
  const city = req.body.city
  const units = 'imperial' // TODO make this a param

  hackyHandler(req, res, next, city, units)
})

module.exports = router
