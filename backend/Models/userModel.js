const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        default: ""
    },
    userName: {
        type: String,
    },
    password: {
        type: String,
    },
    emailId: {
        type: String
    },
    mobile: {
        type: String,
    },
    role: {
        type: Number,
    },
    emailVerification: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
    },
    token: {
        type: String,
        default: ''
    },
}, { timestamps: true });

const User = mongoose.model('user', userSchema)
module.exports = User;
