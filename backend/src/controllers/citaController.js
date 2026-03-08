const Cita = require('../models/Cita');

// ── Obtener todas las citas (activas) ─────────────────────
exports.obtenerCitas = async (req, res) => {
  try {
    const { fecha, estado, paciente } = req.query;
    const filtro = { activo: true };

    if (fecha) {
      const inicio = new Date(fecha);
      const fin    = new Date(fecha);
      fin.setDate(fin.getDate() + 1);
      filtro.fecha = { $gte: inicio, $lt: fin };
    }
    if (estado)   filtro.estado   = estado;
    if (paciente) filtro.paciente = paciente;

    const citas = await Cita.find(filtro)
      .populate('paciente', 'nombre apellido cedula telefono').populate('dentista', 'nombre apellido especialidad')
      .sort({ fecha: 1 });

    res.status(200).json({ success: true, total: citas.length, data: citas });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

// ── Obtener una cita por ID ───────────────────────────────
exports.obtenerCita = async (req, res) => {
  try {
    const cita = await Cita.findOne({ _id: req.params.id, activo: true })
      .populate('paciente').populate('dentista', 'nombre apellido especialidad');
    if (!cita) {
      return res.status(404).json({ success: false, mensaje: 'Cita no encontrada.' });
    }
    res.status(200).json({ success: true, data: cita });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

// ── Crear cita (con detección de conflicto de horario) ────
exports.crearCita = async (req, res) => {
  try {
    const { paciente, fecha, duracionMinutos = 30 } = req.body;

    // Detectar solapamiento de citas del mismo paciente
    const fechaInicio = new Date(fecha);
    const fechaFin    = new Date(fechaInicio.getTime() + duracionMinutos * 60000);

    const conflicto = await Cita.findOne({
      paciente,
      activo: true,
      estado: { $nin: ['cancelada', 'no_asistio'] },
      $or: [
        { fecha: { $gte: fechaInicio, $lt: fechaFin } },
        {
          $and: [
            { fecha: { $lte: fechaInicio } },
            {
              $expr: {
                $gt: [
                  { $add: ['$fecha', { $multiply: ['$duracionMinutos', 60000] }] },
                  fechaInicio,
                ],
              },
            },
          ],
        },
      ],
    });

    if (conflicto) {
      return res.status(409).json({
        success: false,
        mensaje: 'El paciente ya tiene una cita programada en ese horario.',
      });
    }

    const cita = await Cita.create(req.body);
    await cita.populate('paciente', 'nombre apellido');
    await cita.populate('dentista', 'nombre apellido');
    res.status(201).json({ success: true, data: cita });
  } catch (error) {
    res.status(400).json({ success: false, mensaje: error.message });
  }
};

// ── Actualizar cita ───────────────────────────────────────
exports.actualizarCita = async (req, res) => {
  try {
    const cita = await Cita.findOneAndUpdate(
      { _id: req.params.id, activo: true },
      req.body,
      { new: true, runValidators: true }
    ).populate('paciente', 'nombre apellido').populate('dentista', 'nombre apellido');

    if (!cita) {
      return res.status(404).json({ success: false, mensaje: 'Cita no encontrada.' });
    }
    res.status(200).json({ success: true, data: cita });
  } catch (error) {
    res.status(400).json({ success: false, mensaje: error.message });
  }
};

// ── Eliminar cita — SOFT DELETE (consistente con Paciente) ─
exports.eliminarCita = async (req, res) => {
  try {
    const cita = await Cita.findOneAndUpdate(
      { _id: req.params.id, activo: true },
      { activo: false },
      { new: true }
    );
    if (!cita) {
      return res.status(404).json({ success: false, mensaje: 'Cita no encontrada.' });
    }
    res.status(200).json({ success: true, mensaje: 'Cita cancelada y archivada correctamente.' });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};
