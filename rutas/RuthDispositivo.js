const express = require('express');
const { vincularDispositivo, desvincularDispositivo, verificarEstadoDispositivo, verificarDispositivoPorIP, agregarDispositivo } = require('../controllers/DispositivoController');
const router = express.Router();

// Ruta para vincular un dispositivo a un usuario
router.post('/vincular', vincularDispositivo);

router.post('/agregar', agregarDispositivo);

// Ruta para desvincular un dispositivo de un usuario
router.post('/desvincular', desvincularDispositivo);

// Ruta para verificar si un usuario tiene un dispositivo vinculado
router.get('/estado', verificarEstadoDispositivo);

// Ruta para verificar si un dispositivo con una IP específica ya está vinculado
router.get('/verificar-ip', verificarDispositivoPorIP);

module.exports = router;
