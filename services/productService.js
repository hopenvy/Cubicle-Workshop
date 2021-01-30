const uniqid = require('uniqid');
const Cube = require('../models/cubeModel');
const fs = require('fs');

const productsData = require('../config/database.json');
const { json } = require('body-parser');

function getAll() {
    return productsData;
}

function getOne (id) {
return productsData.find(x => x.id == id);
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
    getOne,
    create
}