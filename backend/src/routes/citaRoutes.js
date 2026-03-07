const express = require('express');
const router  = express.Router();
const {
  obtenerCitas,
  obtenerCita,
  crearCita,
  actualizarCita,
  eliminarCita,
} = require('../controllers/citaController');
const { proteger, autorizar } = require('../middlewares/authMiddleware');

router.use(proteger);

router.route('/')
  .get(obtenerCitas)
  .post(autorizar('admin', 'recepcionista', 'dentista'), crearCita);

router.route('/:id')
  .get(obtenerCita)
  .put(autorizar('admin', 'recepcionista', 'dentista'), actualizarCita)
  .delete(autorizar('admin', 'recepcionista'), eliminarCita);

module.exports = router;
