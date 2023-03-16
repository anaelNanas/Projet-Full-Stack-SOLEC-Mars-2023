const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema
({
    name: {
        type: String,
        required: true
    },
    hashMdp: {
        type: Number,
        required: true
    },
    numTelephone: {
        type: String,
        required: true,
        match: [/^\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}$/, "Numéro de téléphone invalide, il faut cette forme par exemple '01.02.03.04.05'"]
    }
});

module.exports = mongoose.model('Customer', customerSchema); 