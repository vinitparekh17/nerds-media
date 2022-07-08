const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
require('dotenv').config()
const { JWT_SECRET, JWT_EXPIRY } = process.env

const userSchema = new Schema({
    
    userName: {
        type: String
    },

    googleId: {
        type: String
    },

    gitid: {
        type: String
    },

    profilePic: {
        type: String,
        default: 'https://mpchsschool.in/wp-content/uploads/2019/10/default-profile-picture.png'
    },

    email: {
        type: String,
        validate: [validator.isEmail, 'Invalid email is not allowed!'],
        unique: true
    }

}, { timestamps: true })

module.exports = model('Users', userSchema)
