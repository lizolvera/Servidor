require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/database');

// Importar rutas
const productosRoutes = require('./rutas/RuthProductos');
const usuariosRoutes = require('./rutas/RuthUsuarios');
const politicasRoutes = require('./rutas/RuthPoliticas'); // Nuevas rutas de políticas

// Conectar a la base de datos
conectarDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ Servidor funcionando correctamente!');
});

// Usar rutas
app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/politicas', politicasRoutes); // Usar las nuevas rutas de políticas

// Definir puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});