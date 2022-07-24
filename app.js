const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

// database connection 
const database = require("./config/db")
database.connection()

// for reading cookies and handling 
const cookieParser = require('cookie-parser')
app.use(cookieParser())


// env variables 
require("dotenv").config()

// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}))

// cors middleware which allows to read external websites
// cors stands for Cross Origin Resource Locator
app.use(
    cors({
        origin: "https://technetic.vercel.app",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

// To get data from URL ( GET method in form )
app.use(express.urlencoded({ extended: true }))

// To get data from web page's body in json format ( POST method in form )
app.use(express.json())

// defining routes
const user = require('./routes/user');
const message = require('./routes/messages');
const music = require('./routes/music');
const blog = require('./routes/blog');
const study = require('./routes/study');

// initilising the routes as a middleware 
app.use('/api',user)
app.use('/api', message)
app.use('/api', music)
app.use('/api', blog)
app.use('/api', study)

module.exports = app;