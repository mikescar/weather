const express = require('express')
const router = express.Router()

const FetchWeather = require('../services/fetch_weather.js')

router.get('/:city', (req, res, next) => {
  const city = req.params.city
  new FetchWeather().run(city, 'imperial')
    .then(weather => res.render('index', { userinfo: req.userinfo, weather: weather, error: null }))
    .catch(error => res.render('index', { userinfo: req.userinfo, weather: null, error: error }))
})

// router.post('/', (req, res, next) => {
//   let city = req.body.city
//   let units = 'imperial'
//   new FetchWeather().run(city, units)
//     .then(weather => res.render('index', {userinfo: req.userinfo, weather: weather, error: null}))
//     .catch(error => res.render('index', {userinfo: req.userinfo, weather: null, error: error}))
// })
//

module.exports = router
