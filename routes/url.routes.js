const express = require("express")
const {generateNewShortURL, getAnalytics, getUrlByShortId} = require("../controllers/url.controller")
const { checkAuthorization } = require("../middlewares/auth.middleware")

const router = express.Router()

router.post('/', checkAuthorization,generateNewShortURL)

router.get('/:shortId', getUrlByShortId)

router.get('/analytics/:shortId', getAnalytics)

module.exports = router;
