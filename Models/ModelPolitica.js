const mongoose = require('mongoose');

const PoliticaSchema = new mongoose.Schema({
  politicaDeUso: { type: String, required: true },
  politicaDePrivacidad: { type: String, required: true },
  terminosYCondiciones: { type: String, required: true }
}, { timestamps: true });

const Politica = mongoose.model('Politica', PoliticaSchema);
module.exports = Politica;