const express = require('express');
const router  = express.Router();
const {
  obtenerDentistas,
  obtenerDentista,
  crearDentista,
  actualizarDentista,
  eliminarDentista,
} = require('../controllers/dentistaController');
const { proteger, autorizar } = require('../middlewares/authMiddleware');

router.use(proteger);

router.route('/')
  .get(obtenerDentistas)
  .post(autorizar('admin'), crearDentista);

router.route('/:id')
  .get(obtenerDentista)
  .put(autorizar('admin'), actualizarDentista)
  .delete(autorizar('admin'), eliminarDentista);

module.exports = router;
