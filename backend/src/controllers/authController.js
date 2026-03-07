const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const respuestaConToken = (usuario, statusCode, res) => {
  const token = generarToken(usuario._id);
  usuario.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: { usuario },
  });
};

exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const usuario = await Usuario.create({ nombre, email, password, rol });
    respuestaConToken(usuario, 201, res);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, mensaje: 'El email ya está registrado.' });
    }
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, mensaje: 'Email y contraseña son requeridos.' });
    }

    const usuario = await Usuario.findOne({ email }).select('+password');

    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ success: false, mensaje: 'Credenciales inválidas.' });
    }

    respuestaConToken(usuario, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

exports.perfil = async (req, res) => {
  res.status(200).json({ success: true, data: { usuario: req.usuario } });
};