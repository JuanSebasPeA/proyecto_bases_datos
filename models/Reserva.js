const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    mesaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mesa',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    personas: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Reserva', reservaSchema); 