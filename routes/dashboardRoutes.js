const router = require('express').Router()
const Books = require('../models/Books')
const { checkIsAuthenticated } = require('../middleware/authMiddleware')
const { getBooks, getBook, postBook, deleteBook, updateBook } = require('../controllers/dashboardController')


router.get('/dashboard', checkIsAuthenticated, async (req, res) => {
    const books = await Books.find({userId: req.user.googleId}).select('-updatedAt -__v')
    res.render('dashboard', { title: 'Dashboard Page', isAuth: req.isAuthenticated(), books, user: req.user })
})
router.get('/dashboard/add-favorite-book', checkIsAuthenticated, (req, res) => {
    res.render('add-form', { title: 'Add Form Page', isAuth: req.isAuthenticated(), user: req.user })
})
router.get('/dashboard/edit-favorite-book/:bookId', checkIsAuthenticated, (req, res) => {
    res.render('edit-form', {title: 'Edit Form Page', isAuth: req.isAuthenticated(), user: req.user})
})

router.get('/api/v1/books', async(req, res) => await getBooks(req, res))
router.get('/api/v1/books/:bookId', async(req, res) => await getBook(req, res))
router.post('/api/v1/books', async(req, res) => await postBook(req, res))
router.delete('/api/v1/books/:bookId/:bookImageID', async(req, res) => await deleteBook(req, res))
router.put('/api/v1/books/:bookId', async(req, res) => await updateBook(req, res))

module.exports = router