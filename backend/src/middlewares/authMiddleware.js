const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const proteger = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        mensaje: 'No autorizado. Token no encontrado.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decoded.id);

    if (!req.usuario || !req.usuario.activo) {
      return res.status(401).json({
        success: false,
        mensaje: 'El usuario no existe o está inactivo.',
      });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, mensaje: 'Token inválido.' });
  }
};

const autorizar = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        success: false,
        mensaje: `El rol '${req.usuario.rol}' no tiene permiso para esta acción.`,
      });
    }
    next();
  };
};

module.exports = { proteger, autorizar };