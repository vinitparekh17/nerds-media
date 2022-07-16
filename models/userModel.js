const { Schema, model } = require('mongoose')
require('dotenv').config()

const userSchema = new Schema({
    
    userName: {
        type: String
    },

    githubName: {
        type: String
    },
    
    profilePic: {
        type: String,
        default: 'https://mpchsschool.in/wp-content/uploads/2019/10/default-profile-picture.png'
    },

    email: {
        type: String,
        unique: true
    }

}, { timestamps: true })

module.exports = model('Users', userSchema)
