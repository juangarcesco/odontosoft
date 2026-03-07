const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paciente',
      required: [true, 'El paciente es obligatorio'],
    },
    dentista: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dentista',
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha es obligatoria'],
    },
    duracionMinutos: {
      type: Number,
      default: 30,
      min: [10, 'Duración mínima 10 minutos'],
      max: [300, 'Duración máxima 300 minutos'],
    },
    motivo: {
      type: String,
      required: [true, 'El motivo es obligatorio'],
      trim: true,
    },
    tratamiento: {
      type: String,
      trim: true,
    },
    estado: {
      type: String,
      enum: ['programada', 'completada', 'cancelada', 'no_asistio'],
      default: 'programada',
    },
    notas: {
      type: String,
      trim: true,
    },
    costo: {
      type: Number,
      default: 0,
      min: [0, 'El costo no puede ser negativo'],
    },
    // Soft delete — consistente con Paciente
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índice para detectar conflictos de horario
citaSchema.index({ fecha: 1, estado: 1 });

module.exports = mongoose.model('Cita', citaSchema);
