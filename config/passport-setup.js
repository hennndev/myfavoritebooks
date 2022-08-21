const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const Users = require('../models/Users')


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, 
    async function(accessToken, refreshToken, profile, done) {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            photoProfile: profile.photos[0].value
        }
        const existUser = await Users.findOne({googleId: profile.id})
        if(existUser) {
            done(null, newUser)
        } else {
            const user = await Users.create(newUser)
            done(null, user)
        }
    }
))

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback"
},
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
))


passport.serializeUser((user, done) => {
    return done(null, user)
})

passport.deserializeUser((user, done) => {
    return done(null, user)
})