require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/database');
const nodemailer = require('nodemailer');

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Conectar a la base de datos
conectarDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Pasar transporter a userRoutes
app.use("/usuarios", (req, res, next) => {
  req.transporter = transporter;
  next();
}, require("./rutas/RuthUsuarios"));

// Importar rutas
const productosRoutes = require('./rutas/RuthProductos');
const usuariosRoutes = require('./rutas/RuthUsuarios');
const politicasRoutes = require('./rutas/RuthPoliticas');
const misionVisionRoutes = require('./rutas/RuthMisionVision');
const historialAntecedentesRoutes = require('./rutas/RuthHistorialAntecedentes');
const preguntasRoutes = require('./rutas/RuthPreguntas');
const ubicacionRoutes = require('./rutas/RuthUbicaciones');

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ Servidor funcionando correctamente!');
});

// Usar rutas
app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/politicas', politicasRoutes);
app.use('/mision-vision', misionVisionRoutes);
app.use('/historial-antecedentes', historialAntecedentesRoutes);
app.use('/preguntas', preguntasRoutes);
app.use('/ubicaciones', ubicacionRoutes);

// Definir puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});