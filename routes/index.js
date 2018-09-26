const express = require('express')
const router = express.Router()

const branch = process.env.APP_BRANCH || 'N/A'
const buildDate = process.env.APP_BUILD_DATE || 'N/A'
const commitHash = process.env.APP_COMMIT_HASH || 'N/A'

router.get('/', function (req, res, next) {
  res.render('index', { userinfo: req.userinfo, error: null, branch, buildDate, commitHash })
})

module.exports = router
