const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    likedList:{
        type: [String]
    },
    imageUrl:{
        type: String
    },
    tokens:{
        type: [String]
    }
})

module.exports = mongoose.model('User', userSchema)