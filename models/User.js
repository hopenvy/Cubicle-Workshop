const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongo.model('User', userSchema);