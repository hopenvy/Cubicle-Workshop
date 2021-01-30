const uniqid = require('uniqid');
const Cube = require('../models/cubeModel');
const fs = require('fs');

const productsData = require('../config/database.json');
const { json } = require('body-parser');

function getAll() {
    return productsData;
}

function create(data) {
    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );
    productsData.push(cube);

    fs.writeFile(__dirname + '/../config/database.json', JSON.stringify(productsData), (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports = {
    getAll,
    create
}