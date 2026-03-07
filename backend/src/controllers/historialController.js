const HistorialClinico = require('../models/HistorialClinico');

// ── Obtener historial de un paciente ──────────────────────
exports.obtenerHistorialPaciente = async (req, res) => {
  try {
    const { pacienteId } = req.params;
    const historial = await HistorialClinico.find({ paciente: pacienteId, activo: true })
      .populate('paciente', 'nombre apellido cedula')
      .populate('cita', 'fecha motivo')
      .sort({ fecha: -1 });

    res.status(200).json({ success: true, total: historial.length, data: historial });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

// ── Obtener una entrada de historial ─────────────────────
exports.obtenerEntrada = async (req, res) => {
  try {
    const entrada = await HistorialClinico.findOne({ _id: req.params.id, activo: true })
      .populate('paciente', 'nombre apellido cedula fechaNacimiento')
      .populate('cita');

    if (!entrada) {
      return res.status(404).json({ success: false, mensaje: 'Entrada no encontrada.' });
    }
    res.status(200).json({ success: true, data: entrada });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

// ── Crear entrada de historial ────────────────────────────
exports.crearEntrada = async (req, res) => {
  try {
    const entrada = await HistorialClinico.create(req.body);
    await entrada.populate('paciente', 'nombre apellido');
    res.status(201).json({ success: true, data: entrada });
  } catch (error) {
    res.status(400).json({ success: false, mensaje: error.message });
  }
};

// ── Actualizar entrada de historial ──────────────────────
exports.actualizarEntrada = async (req, res) => {
  try {
    const entrada = await HistorialClinico.findOneAndUpdate(
      { _id: req.params.id, activo: true },
      req.body,
      { new: true, runValidators: true }
    ).populate('paciente', 'nombre apellido');

    if (!entrada) {
      return res.status(404).json({ success: false, mensaje: 'Entrada no encontrada.' });
    }
    res.status(200).json({ success: true, data: entrada });
  } catch (error) {
    res.status(400).json({ success: false, mensaje: error.message });
  }
};

// ── Soft delete entrada ───────────────────────────────────
exports.eliminarEntrada = async (req, res) => {
  try {
    const entrada = await HistorialClinico.findOneAndUpdate(
      { _id: req.params.id, activo: true },
      { activo: false },
      { new: true }
    );
    if (!entrada) {
      return res.status(404).json({ success: false, mensaje: 'Entrada no encontrada.' });
    }
    res.status(200).json({ success: true, mensaje: 'Entrada archivada correctamente.' });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};
