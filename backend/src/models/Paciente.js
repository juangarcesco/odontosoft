const mongoose = require('mongoose');

/**
 * Esquema de Paciente
 * Define la estructura, validaciones y tipos de datos de la colección 'pacientes'.
 */
const pacienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true, // Elimina espacios en blanco al inicio y final
      maxlength: [100, 'El nombre no puede superar 100 caracteres'],
    },
    apellido: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
      trim: true,
    },
    cedula: {
      type: String,
      required: [true, 'La cédula es obligatoria'],
      unique: true, // Evita que se registren dos pacientes con el mismo documento
      trim: true,
    },
    fechaNacimiento: {
      type: Date,
      required: [true, 'La fecha de nacimiento es obligatoria'],
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
    },
    email: {
      type: String,
      lowercase: true, // Convierte siempre a minúsculas antes de guardar
      match: [/^\S+@\S+\.\S+$/, 'Email inválido'], // Validación básica con Regex
    },
    direccion: {
      type: String,
    },
    // Sub-documento para agrupar datos médicos relevantes
    historialClinico: {
      alergias: [String],      // Array de strings (ej: ["Penicilina", "Polen"])
      enfermedades: [String],
      medicamentos: [String],
      observaciones: String,
    },
    activo: {
      type: Boolean,
      default: true, // Por defecto, todo paciente nuevo está activo
    },
  },
  {
    // Genera automáticamente los campos 'createdAt' y 'updatedAt'
    timestamps: true,
  }
);

/**
 * Propiedad Virtual: Nombre Completo
 * No se guarda en la base de datos, pero se puede acceder como si fuera un campo real.
 * Ejemplo: console.log(paciente.nombreCompleto);
 */
pacienteSchema.virtual('nombreCompleto').get(function () {
  return `${this.nombre} ${this.apellido}`;
});

// Exportamos el modelo basado en el esquema anterior

module.exports = mongoose.model('Paciente', pacienteSchema);