//const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const mongoose = require('mongoose');
const productsData = require('../data/productData');

//const { json } = require('body-parser');

function getAll(query) {
    let result = productsData.getAll();
    //let result = Cube.getAll();

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
    return productsData.getOne(id);
    //return Cube.getOne(id);
}

function create(data) {
    let cube = new Cube(data);


    //return productData.create(cube);
    return cube.save();

}

module.exports = {
    getAll,
    getOne,
    create
}