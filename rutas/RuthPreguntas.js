const express = require('express');
const Preguntas = require('../Models/Preguntas');
const router = express.Router();

// Crear una nueva pregunta
router.post('/agregar', async (req, res) => {
  try {
    const { pregunta, respuesta } = req.body;
    const nuevaPregunta = new Preguntas({ pregunta, respuesta });
    await nuevaPregunta.save();
    res.status(201).json({ mensaje: 'Pregunta agregada exitosamente', pregunta: nuevaPregunta });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar la pregunta', error });
  }
});

// Obtener todas las preguntas
router.get('/ver', async (req, res) => {
  try {
    const preguntas = await Preguntas.find();
    if (!preguntas.length) {
      return res.status(404).json({ mensaje: 'No hay preguntas registradas' });
    }
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las preguntas', error });
  }
});

// Actualizar una pregunta
router.put('/actualizar/:id', async (req, res) => {
  try {
    const { pregunta, respuesta } = req.body;
    const preguntaActualizada = await Preguntas.findByIdAndUpdate(
      req.params.id,
      { pregunta, respuesta },
      { new: true }
    );
    if (!preguntaActualizada) {
      return res.status(404).json({ mensaje: 'Pregunta no encontrada' });
    }
    res.json({ mensaje: 'Pregunta actualizada exitosamente', pregunta: preguntaActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la pregunta', error });
  }
});

// Eliminar una pregunta
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const preguntaEliminada = await Preguntas.findByIdAndDelete(req.params.id);
    if (!preguntaEliminada) {
      return res.status(404).json({ mensaje: 'Pregunta no encontrada' });
    }
    res.json({ mensaje: 'Pregunta eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la pregunta', error });
  }
});

module.exports = router;
