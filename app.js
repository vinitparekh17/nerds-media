const express = require('express');
const cors = require('cors');
const app = express();

// database connection
const database = require('./utils/db');
database.connection();

// for reading cookies and handling
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// env variables
require('dotenv').config();

// session
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
//     }
// }))

// To get data from URL ( GET method in form )
app.use(express.urlencoded({ extended: true }));

// To get data from web page's body in json format ( POST method in form )
app.use(express.json());

// defining routes
const user = require('./routes/user');
const message = require('./routes/messages');
const blog = require('./routes/blog');
const study = require('./routes/study');
const code = require('./routes/code');
const admin = require('./routes/admin');
const payment = require('./routes/payment');

//cors
app.use(
    cors({
        origin: '*',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    })
);

// initilising the routes as a middleware
app.use('/api/v1', user, message, blog, study, code, admin, payment);

module.exports = app;
