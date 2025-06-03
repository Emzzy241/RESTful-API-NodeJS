const mongoose = require('mongoose');
const followersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    followedToPage: {
        type: String,
        require: true
    },
    followedDate: {
        type: Date,
        require: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Follower', followersSchema);