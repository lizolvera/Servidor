const express = require('express');
const Politica = require('../Models/ModelPolitica');

const router = express.Router();

// Agregar una nueva política
router.post('/agregar', async (req, res) => {
  try {
    const { politicaDeUso, politicaDePrivacidad, terminosYCondiciones } = req.body;
    const nuevaPolitica = new Politica({
      politicaDeUso,
      politicaDePrivacidad,
      terminosYCondiciones
    });
    await nuevaPolitica.save();
    res.status(201).json({ mensaje: 'Política agregada exitosamente', politica: nuevaPolitica });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar la política', error });
  }
});

// Obtener todas las políticas
router.get('/ver', async (req, res) => {
  try {
    const politicas = await Politica.find();
    if (!politicas.length) {
      return res.status(404).json({ mensaje: 'No hay políticas registradas' });
    }
    res.json(politicas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las políticas', error });
  }
});

// Actualizar una política específica
router.put('/actualizar/:id', async (req, res) => {
  try {
    const { politicaDeUso, politicaDePrivacidad, terminosYCondiciones } = req.body;
    const politicasActualizadas = await Politica.findByIdAndUpdate(
      req.params.id,
      { politicaDeUso, politicaDePrivacidad, terminosYCondiciones },
      { new: true }
    );
    res.json({ mensaje: 'Política actualizada exitosamente', politicas: politicasActualizadas });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la política', error });
  }
});

// Eliminar una política específica
router.delete('/eliminar/:id', async (req, res) => {
  try {
    await Politica.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Política eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la política', error });
  }
});

module.exports = router;
