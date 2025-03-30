const express = require('express');
const MisionVision = require('../Models/MisionVision');
const router = express.Router(); // Asegúrate de que esta línea esté presente

// Crear una nueva misión, visión y valores
router.post('/agregar', async (req, res) => {
  try {
    const { mision, vision, valores } = req.body;
    const nuevaMisionVision = new MisionVision({ mision, vision, valores });
    await nuevaMisionVision.save();
    res.status(201).json({ mensaje: 'Información agregada exitosamente', misionVision: nuevaMisionVision });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar la información', error });
  }
});

// Obtener todas las misiones, visiones y valores
router.get('/ver', async (req, res) => {
  try {
    const misionesVisiones = await MisionVision.find();
    if (!misionesVisiones.length) {
      return res.status(404).json({ mensaje: 'No hay información registrada' });
    }
    res.json(misionesVisiones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la información', error });
  }
});

// Obtener la misión, visión y valores por id
router.get('/ver/:id', async (req, res) => {
  try {
    const misionVision = await MisionVision.findById(req.params.id);
    if (!misionVision) {
      return res.status(404).json({ mensaje: 'No hay información registrada' });
    }
    res.json(misionVision);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la información', error });
  }
});


// Obtener la misión, visión y valores (devuelve un solo objeto)
router.get('/ver', async (req, res) => {
  try {
    const misionVision = await MisionVision.findOne();
    if (!misionVision) {
      return res.status(404).json({ mensaje: 'No hay información registrada' });
    }
    res.json(misionVision);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la información', error });
  }
});

// Actualizar la misión, visión y valores
router.put('/actualizar/:id', async (req, res) => {
  try {
    const { mision, vision, valores } = req.body;
    const misionVisionActualizada = await MisionVision.findByIdAndUpdate(
      req.params.id,
      { mision, vision, valores },
      { new: true }
    );
    if (!misionVisionActualizada) {
      return res.status(404).json({ mensaje: 'No se encontró la información' });
    }
    res.json({ mensaje: 'Información actualizada exitosamente', misionVision: misionVisionActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la información', error });
  }
});

// Eliminar la misión, visión y valores
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const misionVisionEliminada = await MisionVision.findByIdAndDelete(req.params.id);
    if (!misionVisionEliminada) {
      return res.status(404).json({ mensaje: 'No se encontró la información' });
    }
    res.json({ mensaje: 'Información eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la información', error });
  }
});

module.exports = router;