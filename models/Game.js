const mongoose = require('mongoose')

const GameSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('game', GameSchema)