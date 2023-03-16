const mongoose = require('mongoose');

const creneauSchema = new mongoose.Schema
({
    userId: {
        type: mongoose.ObjectId,
        required: true
    },

    outilId: {
        type: mongoose.ObjectId,
        required: true
    },

    dateDebut: {
        type: Date,
        required: true
    },

    dateFin: {
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                return v >= this.dateDebut;
            },
            message: props => `La date de fin doit être postérieure à la date de début`
        }
    }
});


module.exports = mongoose.model('Creneau', creneauSchema);