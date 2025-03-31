const Usuario = require("../Models/ModelUsuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crypto = require('crypto');

const enviarCorreoRestablecimiento = async (email, token, transporter) => {
  const mailOptions = {
      from: 'lizbetolvera2005gmail.com',
      to: email,
      subject: 'Restablecimiento de Contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:3000/restablecer-contrasena/${token}`
  };

  try {
      await transporter.sendMail(mailOptions);
  } catch (error) {
      console.error("Error al enviar el correo de restablecimiento:", error);
      throw new Error("Error al enviar el correo de restablecimiento");
  }
};

const solicitarRestablecimiento = async (req, res) => {
  const { email } = req.body;
  const transporter = req.transporter;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Correo no encontrado" });
    }

    const token = crypto.randomBytes(20).toString('hex');
    console.log("Token generado:", token); // Verificar el token generado

    usuario.resetToken = token;
    usuario.resetTokenExpiracion = Date.now() + 3600000; // 1 hora de expiración
    await usuario.save();

    await enviarCorreoRestablecimiento(email, token, transporter);

    res.status(200).json({ mensaje: "Correo de restablecimiento enviado" });
  } catch (error) {
    res.status(500).json({ error: "Error al solicitar el restablecimiento" });
  }
};

const restablecerContrasena = async (req, res) => {
  const { token, nuevaPassword } = req.body;

  try {
    const usuario = await Usuario.findOne({
      resetToken: token,
      resetTokenExpiracion: { $gt: Date.now() }
    });

    if (!usuario) {
      return res.status(400).json({ error: "Token inválido o expirado" });
    }

    console.log("Token recuperado:", usuario.resetToken); // Verificar el token recuperado

    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
    usuario.password = hashedPassword;
    usuario.resetToken = undefined;
    usuario.resetTokenExpiracion = undefined;
    await usuario.save();

    res.status(200).json({ mensaje: "Contraseña restablecida con éxito" });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports={
    solicitarRestablecimiento,
    restablecerContrasena
};