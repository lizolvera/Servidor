const Dispositivo = require('../Models/ModelDispositivo');
const Usuario = require('../Models/ModelUsuario');

const vincularDispositivo = async (req, res) => {
  const { nombre, ip, email } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const dispositivoExistente = await Dispositivo.findOne({ ip });
    if (dispositivoExistente) {
      return res.status(400).json({ mensaje: 'El dispositivo ya está vinculado a otro usuario' });
    }

    // Verificar si el nombre del dispositivo está vacío
    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({ mensaje: 'El nombre del dispositivo es obligatorio' });
    }

    // Verificar si el usuario que está realizando la solicitud es el mismo que el usuario al que se va a vincular el dispositivo
    if (usuario._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ mensaje: 'No tienes permiso para vincular este dispositivo' });
    }

    const nuevoDispositivo = new Dispositivo({ nombre, ip, usuario: usuario._id });
    await nuevoDispositivo.save();

    res.status(201).json({ mensaje: 'Dispositivo vinculado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al vincular el dispositivo', error });
  }
};




const agregarDispositivo = async (req, res) => {
  const { nombre, ip, email } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const nuevoDispositivo = new Dispositivo({ nombre, ip, usuario: usuario._id });
    await nuevoDispositivo.save();

    res.status(201).json({ mensaje: 'Dispositivo agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar el dispositivo', error });
  }
};




const desvincularDispositivo = async (req, res) => {
  const { ip } = req.body;

  try {
    const dispositivo = await Dispositivo.findOneAndDelete({ ip });
    if (!dispositivo) {
      return res.status(404).json({ mensaje: 'Dispositivo no encontrado' });
    }

    res.status(200).json({ mensaje: 'Dispositivo desvinculado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al desvincular el dispositivo', error });
  }
};

const verificarEstadoDispositivo = async (req, res) => {
  const { email } = req.query;

  try {
    const dispositivo = await Dispositivo.findOne({ usuario: email });
    if (dispositivo) {
      res.status(200).json({ vinculado: true });
    } else {
      res.status(200).json({ vinculado: false });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al verificar el dispositivo', error });
  }
};

const verificarDispositivoPorIP = async (req, res) => {
  const { ip } = req.query;

  try {
    const dispositivo = await Dispositivo.findOne({ ip });
    if (dispositivo) {
      res.status(200).json({ existe: true });
    } else {
      res.status(200).json({ existe: false });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al verificar el dispositivo por IP', error });
  }
};



module.exports = {
  vincularDispositivo,
  agregarDispositivo,
  desvincularDispositivo,
  verificarEstadoDispositivo,
  verificarDispositivoPorIP,
};
