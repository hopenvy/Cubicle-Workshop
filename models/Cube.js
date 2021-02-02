//const productsDb = require('../config/database.json');
//const Model = require('./Model');


const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 50,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/,
    },
    difficultyLeve: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessories'
    }]
});



module.exports = mongoose.model('Cube', cubeSchema);