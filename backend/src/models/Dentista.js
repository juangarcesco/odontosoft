const mongoose = require('mongoose');

const dentistaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
      trim: true,
    },
    cedula: {
      type: String,
      required: [true, 'La cédula profesional es obligatoria'],
      unique: true,
      trim: true,
    },
    especialidad: {
      type: String,
      trim: true,
    },
    telefono: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
    },
    horario: {
      type: String,
      trim: true, // ej: "Lun-Vie 8am-5pm"
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

dentistaSchema.virtual('nombreCompleto').get(function () {
  return `${this.nombre} ${this.apellido}`;
});

module.exports = mongoose.model('Dentista', dentistaSchema);
