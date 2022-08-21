const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    photoProfile: {
        type: String,
        required: true
    },
    books: { type: Array }

}, {timestamps: true})


const Users = mongoose.model('Users', usersSchema)
module.exports = Users