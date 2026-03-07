require('dotenv').config();
const app       = require('./src/app');
const connectDB = require('./src/config/database');
const seedAdmin = require('./src/config/seed');

const PORT = process.env.PORT || 3000;

const iniciar = async () => {
  await connectDB();
  await seedAdmin(); // Crea admin si no existe

  const server = app.listen(PORT, () => {
    console.log(`🦷 OdontoSoft API corriendo en http://localhost:${PORT}`);
    console.log(`📋 Entorno: ${process.env.NODE_ENV}`);
  });

  process.on('unhandledRejection', (err) => {
    console.error('❌ Error no manejado:', err.message);
    server.close(() => process.exit(1));
  });
};

iniciar();
