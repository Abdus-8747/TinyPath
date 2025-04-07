const express = require("express")
const {generateNewShortURL, getAnalytics, getUrlByShortId} = require("../controllers/url.controller")

const router = express.Router()

router.post('/', generateNewShortURL)

router.get('/:shortId', getUrlByShortId)

router.get('/analytics/:shortId', getAnalytics)

module.exports = router;
