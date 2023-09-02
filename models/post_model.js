const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postTitle:{
        type: String,
        required: true
    },
    postDescription:{
        type: String,
        required: true
    },
    likes:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    categoriesList:{
        type: String,
        required: true
    },
    videoUrl:{
        type:String,
        required: true
    },
    isDeleted:{
        type: Boolean,
    },
    longitude:{
        type: String
    },
    latitude:{
        type: String
    },
    postID:{
        type: String
    },
    updateDate:{
        type: String
    }
})

module.exports = mongoose.model('Post', postSchema)