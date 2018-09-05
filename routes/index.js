const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { userinfo: req.userinfo, error: null })
})

module.exports = router
