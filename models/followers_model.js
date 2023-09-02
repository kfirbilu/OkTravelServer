const mongoose = require('mongoose')

const followersSchema = new mongoose.Schema({
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Follower', followersSchema)