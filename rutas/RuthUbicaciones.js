const express = require('express');
const Ubicacion = require('../Models/Ubicacion');

const router = express.Router();

// Agregar una nueva ubicación
router.post('/agregar', async (req, res) => {
  try {
    const nuevaUbicacion = new Ubicacion(req.body);
    await nuevaUbicacion.save();
    res.status(201).json({ mensaje: 'Ubicación agregada exitosamente', ubicacion: nuevaUbicacion });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar la ubicación', error });
  }
});

// Obtener todas las ubicaciones
router.get('/ver', async (req, res) => {
  try {
    const ubicaciones = await Ubicacion.find();
    if (!ubicaciones.length) {
      return res.status(404).json({ mensaje: 'No hay ubicaciones registradas' });
    }
    res.json(ubicaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las ubicaciones', error });
  }
});

// Actualizar una ubicación específica
router.put('/actualizar/:id', async (req, res) => {
  try {
    const ubicacionActualizada = await Ubicacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ mensaje: 'Ubicación actualizada exitosamente', ubicacion: ubicacionActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la ubicación', error });
  }
});

// Eliminar una ubicación específica
router.delete('/eliminar/:id', async (req, res) => {
  try {
    await Ubicacion.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Ubicación eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la ubicación', error });
  }
});

module.exports = router;
