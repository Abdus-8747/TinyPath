const { getUser } = require("../service/auth");

function checkAuthorization(req, res, next) {
    req.user = null;

    const token = req.cookies?.token;

    if (token) {
        try {
            const user = getUser(token);
            console.log(user);
            
            req.user = user;
        } catch (error) {
            console.log("Invalid token:", error.message);
            req.user = null;
        }
    }
    console.log(req.user);
    
    return next();
}

module.exports = {
    checkAuthorization,
};
