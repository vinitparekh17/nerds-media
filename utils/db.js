const mongoose = require('mongoose');
const Logger = require('./logger');
const Webhook = require('./webhook');

require('dotenv').config();
const URL = process.env.MONGOURL;

exports.connection = async () => {
    const osData = await Logger();
    mongoose
        .connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            Webhook(`Server is running!\nMongoDB is connected!\n\n ${osData}`);
            console.log('Database connected');
        })
        .catch((err) => {
            Webhook(err);
            console.log(err);
            process.exit(1);
        });
};
