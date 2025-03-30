// backend/rutas/RuthHistorialAntecedentes.js
const express = require('express');
const HistorialAntecedentes = require('../Models/HistorialAntecedentes');
const router = express.Router();

// Obtener todos los historiales y antecedentes
router.get('/ver', async (req, res) => {
  try {
    const historialesAntecedentes = await HistorialAntecedentes.find();
    if (!historialesAntecedentes.length) {
      return res.status(404).json({ mensaje: 'No hay información registrada' });
    }
    res.json(historialesAntecedentes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la información', error });
  }
});

// Obtener el historial y antecedentes por id
router.get('/ver/:id', async (req, res) => {
  try {
    const historialAntecedentes = await HistorialAntecedentes.findById(req.params.id);
    if (!historialAntecedentes) {
      return res.status(404).json({ mensaje: 'No hay información registrada' });
    }
    res.json(historialAntecedentes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la información', error });
  }
});


// Crear un nuevo historial y antecedentes
router.post('/agregar', async (req, res) => {
  try {
    const { historial, antecedentes } = req.body;
    const nuevoHistorialAntecedentes = new HistorialAntecedentes({ historial, antecedentes });
    await nuevoHistorialAntecedentes.save();
    res.status(201).json({ mensaje: 'Información agregada exitosamente', historialAntecedentes: nuevoHistorialAntecedentes });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar la información', error });
  }
});

// Obtener todos los historiales y antecedentes
router.get('/ver', async (req, res) => {
  try {
    const historialesAntecedentes = await HistorialAntecedentes.find();
    if (!historialesAntecedentes.length) {
      return res.status(404).json({ mensaje: 'No hay información registrada' });
    }
    res.json(historialesAntecedentes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la información', error });
  }
});


// Actualizar el historial y antecedentes
router.put('/actualizar/:id', async (req, res) => {
  try {
    const { historial, antecedentes } = req.body;
    const historialAntecedentesActualizado = await HistorialAntecedentes.findByIdAndUpdate(
      req.params.id,
      { historial, antecedentes },
      { new: true }
    );
    if (!historialAntecedentesActualizado) {
      return res.status(404).json({ mensaje: 'No se encontró la información' });
    }
    res.json({ mensaje: 'Información actualizada exitosamente', historialAntecedentes: historialAntecedentesActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la información', error });
  }
});

// Eliminar el historial y antecedentes
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const historialAntecedentesEliminado = await HistorialAntecedentes.findByIdAndDelete(req.params.id);
    if (!historialAntecedentesEliminado) {
      return res.status(404).json({ mensaje: 'No se encontró la información' });
    }
    res.json({ mensaje: 'Información eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la información', error });
  }
});

module.exports = router;