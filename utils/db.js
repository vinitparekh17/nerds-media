const mongoose = require('mongoose');
require('dotenv').config()
const URL = process.env.MONGOURL

exports.connection = async () => {
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("Database connected!"))
        .catch(err => {
            console.log(err);
            process.exit(1)
        })
} 