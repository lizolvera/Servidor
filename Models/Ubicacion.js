const mongoose = require('mongoose');

const UbicacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  coordenadas: {
    latitud: { type: Number, required: true },
    longitud: { type: Number, required: true }
  },
  descripcion: { type: String, required: true }
}, { timestamps: true });

const Ubicacion = mongoose.model('Ubicacion', UbicacionSchema);
module.exports = Ubicacion;