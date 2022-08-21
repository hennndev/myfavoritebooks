const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    bookDesc: {
        type: String,
        required: true
    },
    bookImage: {
        bookImageID: {
            type: String,
            required: true
        },
        bookImageURL: {
            type: String,
            required: true
        }
    }
}, {timestamps: true})


const Books = mongoose.model('Books', booksSchema)

module.exports = Books