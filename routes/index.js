const express = require('express')
const router = express.Router()

const FetchWeather = require('../services/fetch_weather.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Gimme Weather' })
})

module.exports = router
