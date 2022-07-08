const express = require('express');
const app = express();
const cors = require('cors')

// database connection 
const database = require("./config/db")
database.connection()

// for reading cookies and handling 
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//passport package init (Google and Facebook login)
const passport = require('passport')
const session = require('cookie-session');
// This sequence of middleware is necessary for login sessions.  The first
// middleware loads session data and makes it available at `req.session`.  The
// next lines initialize Passport and authenticate the request based on session
// data.  If session data contains a logged in user, the user is set at
// `req.user`.

//option for cookie-session


app.use(session({
    name: 'session',
    keys: ['mrparekh'],
    maxAge: 3 * 24 * 60 * 60 * 1000
}))
app.use(passport.initialize())
app.use(passport.session())

// Passport configuration
require('./utils/passport')

// env variables 
require("dotenv").config()

// middlewares

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
// initilising the routes as a middleware 
app.use('/api',user)
app.use('/api', message)
app.use('/api', music)
app.use('/api', blog)

//google auth routes only
app.get('/api/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get('/api/google/callback', passport.authenticate('google', {
    failureRedirect: 'https://technetic.vercel.app/',
    successRedirect: 'http://localhost:3000/home'
}))


//github authentication
app.get('/api/github', passport.authenticate('github', {
    scope: ['user:email']
}))

app.get('/api/github/callback', passport.authenticate('github', {
    failureRedirect: 'https://technetic.vercel.app/',
    successRedirect: 'http://localhost:3000/home'
}))

module.exports = app
