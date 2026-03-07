const express    = require('express');
const cors       = require('cors');
const morgan     = require('morgan');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');

const authRoutes          = require('./routes/authRoutes');
const pacienteRoutes      = require('./routes/pacienteRoutes');
const citaRoutes          = require('./routes/citaRoutes');
const historialRoutes     = require('./routes/historialRoutes');
const dentistaRoutes      = require('./routes/dentistaRoutes');

const app = express();

// ── Seguridad HTTP headers ───────────────────────────────
app.use(helmet());

// ── CORS — permisivo en desarrollo ───────────────────────
const origenesPermitidos = [
  process.env.FRONTEND_URL,
  'http://localhost:8080',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3001',
  'null', // file:// en algunos navegadores
];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir si no hay origin (Postman, curl) o si está en la lista
    if (!origin || origenesPermitidos.includes(origin)) {
      callback(null, true);
    } else if (process.env.NODE_ENV === 'development') {
      // En desarrollo aceptar cualquier origen
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Rate limiting global ─────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, mensaje: 'Demasiadas solicitudes. Intenta más tarde.' },
});
app.use(globalLimiter);

// ── Rate limiting estricto para auth ─────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20,
  message: { success: false, mensaje: 'Demasiados intentos de acceso. Espera 15 minutos.' },
});

// ── Logging en desarrollo ────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ── Body parsing ─────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health check ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    mensaje: '🦷 OdontoSoft API funcionando correctamente',
    version: '1.1.0',
    timestamp: new Date().toISOString(),
  });
});

// ── Rutas ─────────────────────────────────────────────────
app.use('/api/auth',      authLimiter, authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/citas',     citaRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/dentistas', dentistaRoutes);

// ── 404 ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    mensaje: `Ruta ${req.originalUrl} no encontrada.`,
  });
});

// ── Manejo global de errores ──────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    mensaje: err.message || 'Error interno del servidor',
  });
});

module.exports = app;
