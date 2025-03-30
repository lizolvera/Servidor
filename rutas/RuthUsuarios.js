const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/ModelUsuario');

const router = express.Router();

// Recuperación de contraseña
router.post('/recuperar-contraseña', async (req, res) => {
    try {
      const { email, pre_id, respuesta } = req.body;
  
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      if (usuario.pregunta_recuperacion.pre_id !== pre_id || usuario.pregunta_recuperacion.respuesta !== respuesta) {
        return res.status(400).json({ mensaje: 'Respuesta incorrecta' });
      }
  
      const nuevaContraseña = Math.random().toString(36).slice(-8); // Generar una nueva contraseña aleatoria
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(nuevaContraseña, salt);
  
      usuario.contraseña = passwordHash;
      await usuario.save();
  
      res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente', nuevaContraseña });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
  });

// Paso 1: Enviar correo con pregunta secreta
router.post('/enviar-pregunta', async (req, res) => {
    try {
      const { email } = req.body;
      console.log("Correo recibido:", email); // Verifica el correo recibido
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      console.log("Pregunta de recuperación:", usuario.pregunta_recuperacion); // Verifica la pregunta de recuperación
      res.status(200).json({ mensaje: 'Pregunta enviada exitosamente', pregunta: usuario.pregunta_recuperacion });
    } catch (error) {
      console.error("Error en el servidor:", error); // Verifica el error en el servidor
      res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
  });
  
  
  
  // Paso 2: Verificar respuesta secreta
  router.post('/verificar-respuesta', async (req, res) => {
    try {
      const { email, respuesta } = req.body;
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      if (usuario.pregunta_recuperacion.respuesta !== respuesta) {
        return res.status(400).json({ mensaje: 'Respuesta incorrecta' });
      }
      res.status(200).json({ mensaje: 'Respuesta verificada exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
  });
  
  // Paso 3: Cambiar contraseña
  router.post('/cambiar-contrasena', async (req, res) => {
    try {
      const { email, nuevaContrasena } = req.body;
      console.log("Datos recibidos para cambiar contraseña:", { email, nuevaContrasena }); // Verifica los datos recibidos
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(nuevaContrasena, salt);
      console.log("Contraseña hasheada:", passwordHash); // Verifica la contraseña hasheada
      usuario.contraseña = passwordHash;
      await usuario.save();
      res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error("Error en el servidor:", error); // Verifica el error en el servidor
      res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
  });  
  

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los usuarios', error });
    }
});

// Obtener un usuario por su ID
router.get('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el usuario', error });
    }
});

// Actualizar un usuario por su ID
router.put('/:id', async (req, res) => {
    try {
        const { nombre, apellidoP, apellidoM, telefono, email, sexo, edad } = req.body;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            { nombre, apellidoP, apellidoM, telefono, email, sexo, edad },
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Perfil actualizado exitosamente', usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el usuario', error });
    }
});


// Registrar un usuario
router.post('/registro', async (req, res) => {
    try {
        const { nombre, apellidoP, apellidoM, telefono, email, password, sexo, edad, pregunta_recuperacion, respuesta_recuperacion } = req.body;

        if (!nombre || !apellidoP || !telefono || !email || !password || !sexo || !edad || !pregunta_recuperacion || !respuesta_recuperacion) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({
            nombre,
            apellidoP,
            apellidoM,
            telefono,
            email,
            contraseña: passwordHash, // Se mantiene como "contraseña" en la base de datos
            sexo,
            edad,
            pregunta_recuperacion: { pre_id: 1, respuesta: respuesta_recuperacion },
            rol: "Cliente"
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    try {
        console.log(req.body); // 👀 Ver qué datos recibe el backend

        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        const esValida = await bcrypt.compare(password, usuario.contraseña); // ✅ Corrección aquí
        if (!esValida) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario._id, email: usuario.email }, 'secreto123', { expiresIn: '1h' });

        res.json({ mensaje: 'Inicio de sesión exitoso', token, usuario });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
});

module.exports = router;
