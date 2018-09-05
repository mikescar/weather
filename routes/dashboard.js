const express = require('express')
const { startCase } = require('lodash')

const router = express.Router()

router.get('/', (req, res, next) => {
  const userInfoList = Object.keys(req.userinfo).sort()
    .map(key => ({
      term: startCase(key),
      details: (key === 'updated_at' ? new Date(req.userinfo[key] * 1000) : req.userinfo[key]),
    }))

  res.render('index', {
    userinfo: req.userinfo,
    userInfoList,
  })
})

module.exports = router
