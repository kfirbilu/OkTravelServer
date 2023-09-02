const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VideoSchema = new Schema(
    {
        filePath: String,
    },
    {
        timestamps: true
    }
)

const Video = mongoose.model('Video',VideoSchema)

module.exports = Video