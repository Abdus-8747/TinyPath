const User = require("../models/user.model")
const {v4: uuidv4} = require("uuid")
const {setUser} = require("../service/auth")

async function createUser(req,res) {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password
    })
    //console.log(user);
    
    return res.render("frontend")
}

async function loginUser(req,res) {
    const { email, password } = req.body
    const user = await User.findOne({ email, password })
    //console.log("user:",user);
    
    if(!user){
        return res.render('login', {
            error: "Invalid email Or Password"
        })
    }
    const token = setUser(user)
    res.cookie("token", token)
    return res.render("frontend")
}


module.exports = {
    createUser,
    loginUser
}