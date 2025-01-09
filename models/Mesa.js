const mongoose = require('mongoose');

const mesaSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true,
        unique: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Mesa', mesaSchema); 