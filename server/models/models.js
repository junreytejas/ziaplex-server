const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UsersSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    dateRegistered: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const model = mongoose.model('user', UsersSchema)

module.exports = model