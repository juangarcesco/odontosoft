const Paciente = require('../models/Paciente');

exports.obtenerPacientes = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = search
      ? {
          $or: [
            { nombre: { $regex: search, $options: 'i' } },
            { apellido: { $regex: search, $options: 'i' } },
            { cedula: { $regex: search, $options: 'i' } },
          ],
          activo: true,
        }
      : { activo: true };

    const total = await Paciente.countDocuments(query);
    const pacientes = await Paciente.find(query)
      .sort({ apellido: 1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.status(200).json({
      success: true,
      total,
      pagina: Number(page),
      totalPaginas: Math.ceil(total / limit),
      data: pacientes,
    });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

exports.obtenerPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) {
      return res.status(404).json({ success: false, mensaje: 'Paciente no encontrado.' });
    }
    res.status(200).json({ success: true, data: paciente });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

exports.crearPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.create(req.body);
    res.status(201).json({ success: true, data: paciente });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, mensaje: 'La cédula ya está registrada.' });
    }
    res.status(400).json({ success: false, mensaje: error.message });
  }
};

exports.actualizarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!paciente) {
      return res.status(404).json({ success: false, mensaje: 'Paciente no encontrado.' });
    }
    res.status(200).json({ success: true, data: paciente });
  } catch (error) {
    res.status(400).json({ success: false, mensaje: error.message });
  }
};

exports.eliminarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );
    if (!paciente) {
      return res.status(404).json({ success: false, mensaje: 'Paciente no encontrado.' });
    }
    res.status(200).json({ success: true, mensaje: 'Paciente desactivado correctamente.' });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};