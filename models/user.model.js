const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model('user', userSchema)

module.exports = User;