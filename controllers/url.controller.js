const { nanoid } = require("nanoid")
const URL = require("../models/url.model")

async function generateNewShortURL(req,res) {
    const body = req.body;

    if(!body.url){
        return res.status(400).json({ err: "Url Is Required!" })
    }

    const shortId = nanoid(7);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.json({ id: shortId })
}

async function getUrlByShortId(req,res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push: {
        visitHistory: {
            timestamp: Date.now()
         },
        }
    }
)
console.log(entry);
console.log(shortId);

    res.redirect(entry.redirectURL)
}

async function getAnalytics(req,res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}
module.exports = {
    generateNewShortURL,
    getAnalytics,
    getUrlByShortId
}