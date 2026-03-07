const express = require('express');
const router  = express.Router();
const {
  obtenerPacientes,
  obtenerPaciente,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
} = require('../controllers/pacienteController');
const { proteger, autorizar } = require('../middlewares/authMiddleware');

router.use(proteger); // Todas las rutas requieren autenticación

router.route('/')
  .get(obtenerPacientes)
  .post(autorizar('admin', 'recepcionista', 'dentista'), crearPaciente);

router.route('/:id')
  .get(obtenerPaciente)
  .put(autorizar('admin', 'recepcionista', 'dentista'), actualizarPaciente)
  .delete(autorizar('admin'), eliminarPaciente); // Solo admin puede desactivar

module.exports = router;
