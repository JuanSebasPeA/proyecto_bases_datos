const mongoose = require('mongoose');
require('dotenv').config();

require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB'.green);
    } catch (error) {
        console.error('Error conectando a MongoDB:'.red, error);
        process.exit(1);
    }
};

module.exports = connectDB; 