const router = require('express').Router()
const passport = require('passport')
const { checkIsUnauthenticated } = require('../middleware/authMiddleware')


router.get('/signin', checkIsUnauthenticated , (req, res) => {
    res.render('signin', {title: 'Signin Page', isAuth: req.isAuthenticated(), user: req.user})
})

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if(err) next()
        res.redirect('/signin')
    })
})

router.get('/auth/google', passport.authenticate("google", { scope: ["profile"] }))
router.get('/auth/google/callback', passport.authenticate("google", {
    successRedirect: 'http://localhost:5000',
    failureRedirect: '/signin'
}), (req, res) => {
    res.redirect('/')
})

module.exports = router