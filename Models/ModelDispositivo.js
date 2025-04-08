const mongoose = require('mongoose');

const DispositivoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ip: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, { timestamps: true });

const Dispositivo = mongoose.model('Dispositivo', DispositivoSchema);
module.exports = Dispositivo;