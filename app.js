const express = require('express');
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

// middleware
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

// cors middleware which allows to read external websites
// cors stands for Cross Origin Resource Locator
app.use(
    cors({
        origin: "http://localhost:3000",
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