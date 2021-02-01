//const productsDb = require('../config/database.json');
const Model = require('./Model');


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
        type: Number
    },
});

class Cube extends Model {
    constructor(id, name, description, imageUrl, level) {
        super()
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.level = level;
    }

}




module.exports = Cube;