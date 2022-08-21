const Books = require('../models/Books')
const Users = require('../models/Users')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'hennnpermanadev', 
    api_key: 394938371368973, 
    api_secret: 'FUZbzaLtxZIehXJTYhe0hghLEbA'
});



const getBooks = async(req, res) => {
    try {
        const books = await Books.find({userId: req.user.googleId})
        res.status(200).json({
            message: 'Success get all books',
            books: books
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed get all books'
        })
    }
}

const getBook = async(req, res) => {
    try {
        const book = await Books.findOne({_id: req.params.bookId}).select('-updatedAt -__v')
        res.status(200).json({
            message: 'Success get detail book',
            book
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed get detail book'
        })
    }
}

const postBook = async(req, res) => {
    try {
        const newBook = await Books.create({
            userId: req.user.googleId,
            ...req.body
        })
        console.log(newBook)
        if(newBook) {
            await Users.updateOne({googleId: req.user.googleId}, {
                $push: {books: newBook._id}
            })
            res.status(201).json({
                message: 'Success post new favorite book'
            })
        }
    } catch (error) {
        res.status(400).json({
            error: 'Failed post new favorite book'
        })
    }
}

const deleteBook = async(req, res) => {
    try {
        await Books.deleteOne({_id: req.params.bookId}).then(async() => {
            await cloudinary.uploader.destroy(req.params.bookImageID, function(error, result) { })
        })
        res.status(200).json({
            message: 'Success delete book'
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed delete book'
        })
    }
}

const updateBook = async(req, res) => {
    const { oldBookImageID, ...queries } = req.body
    try {
        await Books.updateOne({_id: req.params.bookId}, {...queries})
        if(oldBookImageID) {
            await cloudinary.uploader.destroy(oldBookImageID, function(error, result) { })
        }
        await res.status(200).json({
            message: 'Success update book'
        })
    } catch (error) {
        await res.status(400).json({
            error: 'Failed update book'
        })
    }
}


module.exports = {
    getBooks,
    getBook,
    postBook,
    deleteBook,
    updateBook
}