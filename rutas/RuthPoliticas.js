const express = require('express');
const Politica = require('../Models/ModelPolitica');

const router = express.Router();

// Agregar una nueva política
router.post('/agregar', async (req, res) => {
    console.log("Datos recibidos:", req.body); // Agrega este log
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
      console.error("Error al agregar la política:", error); // Agrega este log
      res.status(500).json({ mensaje: 'Error al agregar la política', error });
    }
  });
  

// Obtener las políticas
router.get('/ver', async (req, res) => {
  try {
    const politicas = await Politica.findOne();
    if (!politicas) {
      return res.status(404).json({ mensaje: 'No hay políticas registradas' });
    }
    res.json(politicas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las políticas', error });
  }
});

// Actualizar las políticas
router.put('/actualizar/:id', async (req, res) => {
  try {
    const { politicaDeUso, politicaDePrivacidad, terminosYCondiciones } = req.body;
    const politicasActualizadas = await Politica.findByIdAndUpdate(
      req.params.id,
      { politicaDeUso, politicaDePrivacidad, terminosYCondiciones },
      { new: true }
    );
    res.json({ mensaje: 'Políticas actualizadas exitosamente', politicas: politicasActualizadas });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar las políticas', error });
  }
});

// Eliminar las políticas
router.delete('/eliminar/:id', async (req, res) => {
  try {
    await Politica.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Políticas eliminadas exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar las políticas', error });
  }
});

module.exports = router;
