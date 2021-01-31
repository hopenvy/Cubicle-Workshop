const uniqid = require('uniqid');
const Cube = require('../models/cubeModel');
const fs = require('fs');

let productsData = require('../config/database.json');
//const { json } = require('body-parser');

function getAll(query) {
    let result = productsData;
    if (query.search) {
        result = result.filter(x => x.name.toLowerCase().includes(query.search));
    }
    if (query.from) {
        result = result.filter(x => Number(x.level) >= query.from)
    }
    if (query.to) {
        result = result.filter(x => Number(x.level) <= query.to)
    }
    return result;
}

function getOne(id) {
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