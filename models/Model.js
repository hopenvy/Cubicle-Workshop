const fs = require('fs/promises');

const path = require('path');
const productsDb = require('../config/database.json');
const productData = require('../data/productData');

class Model {
  
    save() {
        productsDb.push(this);

        return fs.writeFile(
            path.join(__dirname, '/../config/database.json'),
            JSON.stringify(productsDb),
        );
    }

    static getAll() {
        return productsDb;
    }
    static getOne(id) {
        return productData.getOne(id);
    }
}
module.exports = Model;