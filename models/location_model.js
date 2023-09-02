const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    postId:{
        type: String,
        required: true
    },
    locationName:{
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required: true
    },
    latitude:{
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean
    }
})

module.exports = mongoose.model('Location', locationSchema)