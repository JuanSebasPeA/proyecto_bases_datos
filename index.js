require("dotenv").config();
require("colors");
const express = require("express");
const mongoose = require("mongoose");

// Entidades
const Cliente = require('./models/Cliente');
const Mesa = require('./models/Mesa');
const Reserva = require('./models/Reserva');

const connectDB = require('./config/database');
connectDB();


const app = express();
app.use(express.json());

// Conexión a MongoDB
/* mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'.green))
    .catch(err => console.error('Error conectando a MongoDB:', err)); */


// Ruta básica donde se explica el comportamiento de la API de forma detallada
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de Reservas de Restaurante',
        rutas: {
            clientes: {
                POST: 'Crear un cliente',
                GET: 'Obtener todos los clientes'
            },
            mesas: {
                POST: 'Crear una mesa',
                GET: 'Obtener todas las mesas'
            },
            reservas: {
                POST: 'Crear una reserva',
                GET: 'Obtener todas las reservas'
            }
        }
    });
});

// Rutas para Clientes
app.post('/clientes', async (req, res) => {
    try {
        console.log(req.body);
        const cliente = new Cliente(req.body);
        await cliente.save();
        console.log("Cliente creado".bgYellow);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Obtener todos los clientes
app.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        console.log("Cliente encontrado".bgYellow);
        
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un cliente por ID
app.get('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        console.log("Cliente encontrado".bgYellow);
        
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un cliente por ID
app.put('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

);

// Eliminar un cliente por ID
app.delete('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

);

// Rutas para Mesas
// Crear una mesa
app.post('/mesas', async (req, res) => {
    console.log(req.body);
    try {
        const mesa = new Mesa(req.body);
        await mesa.save();
        res.status(201).json(mesa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todas las mesas
app.get('/mesas', async (req, res) => {
    console.log(req.body);
    try {
        const mesas = await Mesa.find();
        res.json(mesas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una mesa por ID
app.get('/mesas/:id', async (req, res) => {
    try {
        const mesa = await Mesa.findById(req.params.id);
        if (!mesa) {
            return res.status(404).json({ error: 'Mesa no encontrada' });
        }
        res.json(mesa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una mesa por ID
app.put('/mesas/:id', async (req, res) => {
    try {
        const mesa = await Mesa.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        if (!mesa) {
            return res.status(404).json({ error: 'Mesa no encontrada' });
        }
        res.json(mesa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una mesa por ID
app.delete('/mesas/:id', async (req, res) => {
    try {
        const mesa = await Mesa.findByIdAndDelete(req.params.id);
        if (!mesa) {
            return res.status(404).json({ error: 'Mesa no encontrada' });
        }
        res.json(mesa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rutas para Reservas
app.post('/reservas', async (req, res) => {
    console.log(req.body);
    try {
        // Verificar disponibilidad de la mesa
        const mesaExistente = await Mesa.findById(req.body.mesaId);
        if (!mesaExistente) {
            return res.status(404).json({ error: 'Mesa no encontrada' });
        }

        // Verificar si la mesa ya está reservada para esa fecha
        const reservaExistente = await Reserva.findOne({
            mesaId: req.body.mesaId,
            fecha: req.body.fecha
        });

        if (reservaExistente) {
            return res.status(400).json({ error: 'Mesa no disponible para esa fecha' });
        }

        const reserva = new Reserva(req.body);
        await reserva.save();
        res.status(201).json(reserva);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todas las reservas
app.get('/reservas', async (req, res) => {
    console.log(req.body);
    try {
        const reservas = await Reserva.find()
            .populate('clienteId')
            .populate('mesaId');
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una reserva por ID
app.get('/reservas/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id)
            .populate('clienteId')
            .populate('mesaId');
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una reserva por ID
app.put('/reservas/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una reserva por ID
app.delete('/reservas/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findByIdAndDelete(req.params.id);
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(process.env.PORT_SERVER, () => {
    console.log("Servidor en el puerto ".bgGreen + process.env.PORT_SERVER.bgGreen);
});