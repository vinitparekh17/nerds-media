const mongoose = require('mongoose');
const Webhook = require('./webhook');

require('dotenv').config()
const URL = process.env.MONGOURL

exports.connection = async () => {
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Database connected');
            Webhook(`Server is running!\nMongoDB is connected!`)
        })
        .catch(err => {
            Webhook(err)
            console.log(err);
            process.exit(1)
        })
} 