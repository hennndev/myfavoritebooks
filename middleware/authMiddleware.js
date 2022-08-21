

const checkIsAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/signin')
    }
}
const checkIsUnauthenticated = (req, res, next) => {
    if(req.isUnauthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = {
    checkIsAuthenticated,
    checkIsUnauthenticated
}