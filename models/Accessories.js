const Model = require("./Model");

const mongoose = required('mongoose');

const accessorySchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: String,
    imageUrl: String,
    description: String,
})

module.exports = mongoose.model('Accessories', accessorySchema);