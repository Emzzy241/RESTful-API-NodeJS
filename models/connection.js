const mongoose = require('mongoose')

const connectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    connectedToAccount: {
        type: String,
        required: true
    },
    connectedDate: {
        type: Date,
        require: true,
        default: Date.now
    }
})





module.exports = mongoose.model("Connecter", connectionSchema)