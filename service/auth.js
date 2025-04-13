const jwt = require("jsonwebtoken")
const secret = "abdus@8747"

function setUser(user) {
    //console.log(user);
    
    return jwt.sign({
        _id: user._id,
        email: user.email
        }
        , secret)
}

function getUser(token) {
    if(!token) return null
    //console.log(token);
    
   return jwt.verify(token, secret)
}

module.exports = {
    setUser,
    getUser
}