// backend/Models/HistorialAntecedentes.js
const mongoose = require('mongoose');

const HistorialAntecedentesSchema = new mongoose.Schema({
  historial: { type: String, required: true },
  antecedentes: { type: String, required: true }
}, { timestamps: true });

const HistorialAntecedentes = mongoose.model('HistorialAntecedentes', HistorialAntecedentesSchema);
module.exports = HistorialAntecedentes;