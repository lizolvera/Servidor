const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidoP: { type: String, required: true },
  apellidoM: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  sexo: { type: String, enum: ['masculino', 'femenino'], required: true },
  edad: { type: Number, required: true },
  pregunta_recuperacion: {
    pre_id: { type: Number, required: true },
    respuesta: { type: String, required: true }
  },
  rol: { type: String, enum: ['Cliente', 'Admin'], default: 'Cliente' },
  resetToken: { type: String }, // Campo para almacenar el token de restablecimiento
  resetTokenExpiracion: { type: Date } // Campo para almacenar la fecha de expiración del token
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;