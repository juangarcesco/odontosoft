const Dentista = require('../models/Dentista');

exports.obtenerDentistas = async (req, res) => {
  try {
    const { search = '' } = req.query;
    const query = search
      ? {
          $or: [
            { nombre:   { $regex: search, $options: 'i' } },
            { apellido: { $regex: search, $options: 'i' } },
            { cedula:   { $regex: search, $options: 'i' } },
          ],
          activo: true,
        }
      : { activo: true };

    const dentistas = await Dentista.find(query).sort({ apellido: 1 });
    res.status(200).json({ success: true, total: dentistas.length, data: dentistas });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

exports.obtenerDentista = async (req, res) => {
  try {
    const dentista = await Dentista.findOne({ _id: req.params.id, activo: true });
    if (!dentista) return res.status(404).json({ success: false, mensaje: 'Dentista no encontrado.' });
    res.status(200).json({ success: true, data: dentista });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

exports.crearDentista = async (req, res) => {
  try {
    const dentista = await Dentista.create(req.body);
    res.status(201).json({ success: true, data: dentista });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, mensaje: 'La cédula ya está registrada.' });
    }
    res.status(400).json({ success: false, mensaje: error.message });
  }
};

exports.actualizarDentista = async (req, res) => {
  try {
    const dentista = await Dentista.findOneAndUpdate(
      { _id: req.params.id, activo: true },
      req.body,
      { new: true, runValidators: true }
    );
    if (!dentista) return res.status(404).json({ success: false, mensaje: 'Dentista no encontrado.' });
    res.status(200).json({ success: true, data: dentista });
  } catch (error) {
    res.status(400).json({ success: false, mensaje: error.message });
  }
};

exports.eliminarDentista = async (req, res) => {
  try {
    const dentista = await Dentista.findOneAndUpdate(
      { _id: req.params.id, activo: true },
      { activo: false },
      { new: true }
    );
    if (!dentista) return res.status(404).json({ success: false, mensaje: 'Dentista no encontrado.' });
    res.status(200).json({ success: true, mensaje: 'Dentista desactivado correctamente.' });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};
