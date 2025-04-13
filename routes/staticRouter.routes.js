const express = require("express")
const URL = require("../models/url.model")
const {checkAuthorization} = require("../middlewares/auth.middleware")

const router = express.Router()

router.get('/',checkAuthorization,async (req, res) => {
    console.log("hey",req.user);
    
    if(!req.user) return res.redirect("/login")
        const allUrls = await URL.find({ createdBy: req.user.id });
        //console.log("Fetched URLs:", allUrls);
        res.render('frontend', {
            urls: allUrls
        });
       // console.log(allUrls);
        
});

router.get('/signup', async(req,res) => {
    return res.render("signup")
})

router.get('/login', async(req,res) => {
    return res.render("login")
})

module.exports = router;