const Usuario = require('../models/Usuario');

const seedAdmin = async () => {
  try {
    const existe = await Usuario.findOne({ email: process.env.ADMIN_EMAIL || 'admin@odontosoft.com' });

    if (existe) {
      console.log('✅ Usuario admin ya existe, seed omitido.');
      return;
    }

    await Usuario.create({
      nombre:   process.env.ADMIN_NOMBRE   || 'Administrador',
      email:    process.env.ADMIN_EMAIL    || 'admin@odontosoft.com',
      password: process.env.ADMIN_PASSWORD || 'Admin1234*',
      rol:      'admin',
    });

    console.log('🌱 Usuario admin creado exitosamente.');
    console.log(`   📧 Email:    ${process.env.ADMIN_EMAIL    || 'admin@odontosoft.com'}`);
    console.log(`   🔑 Password: ${process.env.ADMIN_PASSWORD || 'Admin1234*'}`);
    console.log('   ⚠️  Cambia la contraseña después del primer inicio de sesión.');
  } catch (error) {
    console.error('❌ Error al ejecutar el seed:', error.message);
  }
};

module.exports = seedAdmin;
