// external libraries
const passport = require('passport')
const User = require('../models/UserModel')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GithubStrategy = require('passport-github2').Strategy
require('dotenv').config()

// env variables
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

//google strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
<<<<<<< HEAD
    callbackURL:  process.env.G_CALLBACK || 'http://localhost:3001/api/google/callback'
=======
    callbackURL: 'https://bot02a.herokuapp.com/api/google/callback'
>>>>>>> ab3c8b9ccf91b986f74bc55933fbb75309f68368
},
    (accessToken, refreshToken, profile, next) => {
        User.findOne({ email: profile._json.email })
            .then(user => {
                if (user) {
                    next(null, user)

                    // cookie token 
                } else {
                    User.create({
                        userName: profile.displayName,
                        googleId: profile.id,
                        email: profile._json.email,
                        profilePic: profile._json.picture
                    })
                        .then(user => {
                            next(null, user)
                            //cookie token
                        })
                        .catch(e => console.log(e))
                }
            })
    }
)
)

//github strategy
passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
<<<<<<< HEAD
    callbackURL: process.env.GIT_CALLBACK ||'http://localhost:3001/api/github/callback'
=======
    callbackURL: 'https://bot02a.herokuapp.com/api/github/callback'
>>>>>>> ab3c8b9ccf91b986f74bc55933fbb75309f68368
},
    (accessToken, refreshToken, profile, next) => {
        User.findOne({ email: profile._json.email })
            .then(user => {
                if (user) {
                    next(null, user)

                    // cookie token 
                } else {
                    User.create({
                        userName: profile.displayName,
                        gitid: profile.id,
                        email: profile._json.email,
                        profilePic: profile.photos[0].value
                    })
                        .then(user => {
                            next(null, user)
                            //cookie token
                        })
                        .catch(e => console.log(e))
                }
            })
    }
)
)
