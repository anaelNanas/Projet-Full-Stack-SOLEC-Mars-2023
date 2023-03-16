const mongoose = require('mongoose');

const outilSchema = new mongoose.Schema
({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    specifications: [String],
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Outil', outilSchema);