const express = require('express');
const router  = express.Router();
const {
  obtenerHistorialPaciente,
  obtenerEntrada,
  crearEntrada,
  actualizarEntrada,
  eliminarEntrada,
} = require('../controllers/historialController');
const { proteger, autorizar } = require('../middlewares/authMiddleware');

router.use(proteger);

// GET /api/historial/paciente/:pacienteId — todo el historial de un paciente
router.get('/paciente/:pacienteId', obtenerHistorialPaciente);

router.route('/')
  .post(autorizar('admin', 'dentista'), crearEntrada);

router.route('/:id')
  .get(obtenerEntrada)
  .put(autorizar('admin', 'dentista'), actualizarEntrada)
  .delete(autorizar('admin'), eliminarEntrada);

module.exports = router;
