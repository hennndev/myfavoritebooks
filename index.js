const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const homeRoutes = require('./routes/homeRoutes')
const authRoutes = require('./routes/authRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
require('dotenv').config({path: './config/.env'})
require('./config/passport-setup')

const app = express()

mongoose.connect(process.env.MONGOODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(process.env.PORT || 5000, () => console.log('Success connected to server'))
}).catch(() => console.log('Failed connected to server'))

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(session({
    secret: 'my-agustina',
    resave: false,
    saveUninitialized: false,
    //store session in mongoodb, and soon this session will reuse by user
    store: MongoStore.create({
        mongoUrl: process.env.MONGOODB_URI
    })
}))
app.use(passport.initialize()) //initialize oauth google
app.use(passport.session()) //when signin with auth, automation create session and store in storage (db)

app.use(homeRoutes)
app.use(authRoutes)
app.use(dashboardRoutes)
app.get('*', (req, res) => res.render('404', { title: 'Page Not Found' , isAuth: req.isAuthenticated(), user: req.user})) //implement page not found page