const mongoose = require('mongoose'); // THis allows us to create a model that we can use to interact witht the db in an easy way

const subscribersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    subscribedToChannel: {
        type: String,
        require: true
    },
    subscribedDate: {
        type: Date,
        require: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', subscribersSchema);
// model function takes 2 properties, first is model in our database, next is schema that corresponds to that model
// Why we need this model function, when we export and import in a different file, this model allows us to interact directly with the database using this schema which is perfect
