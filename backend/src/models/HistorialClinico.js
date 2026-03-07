const mongoose = require('mongoose');

/**
 * HistorialClinico — colección de entradas clínicas por paciente.
 * Cada documento es una consulta o procedimiento registrado.
 */
const historialSchema = new mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paciente',
      required: [true, 'El paciente es obligatorio'],
      index: true,
    },
    cita: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cita',
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha de la consulta es obligatoria'],
      default: Date.now,
    },
    dentista: {
      type: String,
      trim: true,
    },
    motivoConsulta: {
      type: String,
      required: [true, 'El motivo de consulta es obligatorio'],
      trim: true,
    },
    diagnostico: {
      type: String,
      trim: true,
    },
    tratamientoRealizado: {
      type: String,
      trim: true,
    },
    // Odontograma simplificado (piezas dentales afectadas)
    piezasDentales: [
      {
        pieza:      { type: Number, min: 11, max: 48 }, // Numeración FDI
        condicion:  { type: String, trim: true },        // ej: "caries", "extracción"
        observacion:{ type: String, trim: true },
      },
    ],
    medicamentos: [
      {
        nombre:  { type: String, trim: true },
        dosis:   { type: String, trim: true },
        duracion:{ type: String, trim: true },
      },
    ],
    proximaCita:   { type: Date },
    observaciones: { type: String, trim: true },
    archivos: [
      {
        nombre: { type: String },
        url:    { type: String },
        tipo:   { type: String }, // ej: "radiografia", "foto", "documento"
      },
    ],
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HistorialClinico', historialSchema);
