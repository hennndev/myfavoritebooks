const router = require('express').Router()
const Books = require('../models/Books')


router.get('/', async(req, res) => {
    let books = []
    if(req.user) {
        books = await Books.find({userId: req.user.googleId}).select("-updatedAt, -__v").sort({createdAt: -1})
    }
    res.render('homepage', {title: 'Home Page', isAuth: req.isAuthenticated(), books, user: req.user})
})

router.get('/favorite-books/:bookId', async(req, res) => {
    try {
        const book = await Books.findOne({_id: req.params.bookId}).select("-updatedAt -__v")
        res.render('book-detail', {title: 'Book Detail Page', isAuth: req.isAuthenticated(), book, user: req.user })
    } catch (error) {
        res.render('404', {title: 'Page Not Found', isAuth: req.isAuthenticated()})
    }
})

module.exports = router