const Accessories = require('../models/Accessories');

function getAll() {
    return Accessories.find().lean();
}

function getAllUnattached(ids) {
    return Accessories.find({ _id: {$nin: ids} }).lean();
}

function create(data) {
    let accessories = new Accessories(data);

    return accessories.save();
}

module.exports = {
    getAll,
    getAllUnattached,
    create,
};