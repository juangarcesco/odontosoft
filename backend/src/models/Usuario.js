const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    rol: {
      type: String,
      enum: ['admin', 'dentista', 'recepcionista'],
      default: 'recepcionista',
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 🔐 Hash de contraseña antes de guardar (VERSIÓN CORRECTA SIN next)
usuarioSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
});

// 🔎 Método para comparar contraseña
usuarioSchema.methods.compararPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);