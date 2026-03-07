# ODONTOSOFT - GUIA DE DESARROLLO

## 0️⃣ FUNDAMENTOS Y CONFIGURACION INCIAL 


## Tecnologias ##
API REST con Node.js · Frontend con Materialize CSS · Docker · AWS

## Prerrequisitos del Proyecto

Descargar

| Herramienta | Descarga | Para qué sirve |
|-------------|----------|----------------|
| Node.js v18+ | [https://nodejs.org](https://nodejs.org) | Ejecutar el backend |
| MongoDB Community | [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) | Base de datos local |
| Git | [https://git-scm.com](https://git-scm.com) | Control de versiones |
| VSCode | [https://code.visualstudio.com](https://code.visualstudio.com) | Editor de código |

<span style="color: green; font-weight: bold;">
Verificar versiones instaladas
</span>

```bash
node -v
npm -v
git --version
mongod --version
```

## 1️⃣ FASE 1 — REPOSITORIO GITHUB Y ESTRUCTURA DEL PROYECTO 

## Crear el repositorio en GitHub

Sigue estos pasos para configurar el proyecto **OdontoSoft** en GitHub:

1. **Acceso:** Ve a [github.com](https://github.com) e inicia sesión.
2. **Nuevo Proyecto:** Haz clic en el botón verde **New** (arriba a la izquierda).
3. **Configuración:**
   * **Repository name:** `odontosoft`
   * **Description:** `Sistema de gestión odontológica`
   * **Visibilidad:** Seleccionar **Public**
   * **README:** Marcar ✅ *Add a README file*
   * **.gitignore:** Seleccionar la plantilla de **Node**
4. **Finalizar:** * Clic en **Create repository**.
   * Clic en el botón verde **Code** y copiar la **URL HTTPS**.


## Clonar y abrir en VSCode

Ejecutar los siguientes comandos en la terminal (CMD o PowerShell):

```bash
cd C:\Users\TU_USUARIO\Desktop
git clone https://github.com/juangarcesco/odontosoft.git
cd odontosoft
code .
```

## Crear la estructura de carpetas

```bash
mkdir backend
mkdir backend\src
mkdir backend\src\config
mkdir backend\src\controllers
mkdir backend\src\models
mkdir backend\src\routes
mkdir backend\src\middlewares
mkdir frontend
mkdir frontend\css
mkdir frontend\js
mkdir frontend\pages
```

<span style="color: green; font-weight: bold;">
Verificar
</span>

```bash
tree /F
```
Y antes de subir crear archivos dentro de las carpetas 

```bash
type nul > backend\src\routes\.gitkeep
type nul > backend\src\controllers\.gitkeep
type nul > backend\src\models\.gitkeep
type nul > backend\src\middlewares\.gitkeep
type nul > backend\src\config\.gitkeep
type nul > backend\src\utils\.gitkeep
```

<span style="color: green; font-weight: bold;">

<details>
  
  <summary>
  Estructura final del Proyecto
  </summary>

```plaintext
odontosoft/
├── backend/                # API REST y lógica de negocio (Node.js/Express)
│   ├── src/
│   │   ├── config/         # Configuraciones globales (DB, variables de entorno)
│   │   ├── controllers/    # Orquestadores de peticiones y respuestas HTTP
│   │   ├── middlewares/    # Funciones intermedias (Auth, validación de esquemas)
│   │   ├── models/         # Definición de esquemas de datos (Mongoose/Sequelize)
│   │   ├── routes/         # Definición de endpoints y exposición de la API
│   │   └── app.js          # Punto de entrada y configuración del servidor
│   ├── .env.example        # Plantilla de variables de entorno (sin datos sensibles)
│   └── server.js           # Inicialización del servidor y escucha de puertos
├── frontend/               # Interfaz de usuario (Arquitectura Monolítica Simple)
│   ├── src/
│   │   ├── css/            # Estilos globales y específicos
│   │   ├── js/             # Lógica del lado del cliente y consumo de API
│   │   └── pages/          # Vistas adicionales o componentes reutilizables
│   ├── index.html          # Vista principal (Dashboard/Login)
│   ├── pacientes.html      # Gestión del padrón de pacientes
│   └── citas.html          # Control de agenda odontológica
├── docker/                 # Entorno de contenedores
│   ├── Dockerfile.backend  # Receta de construcción para el servidor
│   └── Dockerfile.frontend # Receta de construcción para el cliente
├── docker-compose.yml      # Orquestación de servicios (App + DB)
├── .gitignore              # Archivos y carpetas excluidos del control de versiones
└── README.md               # Documentación técnica del proyecto
```
</details>
</span>

<span style="color: orange; font-weight: bold;">

## GitHub: Primer push 

</span>

```bash
git add .
git commit -m "feat: estructura inicial del proyecto OdontoSoft"
git push origin main
```
<span style="color: green; font-weight: bold;">
Verificar que los archivos se subieron a Github
</span>

 
## 2️⃣ FASE 2 — CONFIGURACIÓN DEL BACKEND

## Inicializar el proyecto Node

```bash
cd backend
# Inicializar package.json
npm init -y
# Instalar dependencias de producción
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet morgan express-validator
# Instalar dependencias de desarrollo
npm install --save-dev nodemon
# Volver a la raíz del proyecto
cd ..
```
Esperar a que termine la instalación (puede tardar un minuto).

<span style="color: magenta; font-weight: bold;">
Contexto
</span>

| Paquete | Para qué sirve |
| :--- | :--- |
| **express** | Framework web — el núcleo del servidor |
| **mongoose** | Conectar y trabajar con MongoDB |
| **dotenv** | Leer variables de entorno desde un archivo .env` |
| **bcryptjs** | Encriptar contraseñas |
| **jsonwebtoken** | Generar y verificar tokens JWT |
| **cors** | Permitir peticiones desde el frontend |
| **helmet** | Agregar cabeceras de seguridad HTTP |
| **morgan** | Mostrar en consola cada petición que llega |
| **nodemon** | Reiniciar el servidor automáticamente al guardar cambios |


### Configurar `package.json`

Editar `backend/package.json`


<details>
  <summary><b>Codigo package.json</b></summary>

```json
{
  "name": "odontosoft-backend",
  "version": "1.0.0",
  "description": "API REST para sistema de gestión odontológica",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"No tests yet\" && exit 0"
  },
  "keywords": [
    "odontologia",
    "api",
    "node",
    "express"
  ]
}
```
</details>



<span style="color: magenta; font-weight: bold;">
Nota: Los .json NO SE COMENTAN
</span>

### Archivo de variables de entorno
Crear backend/.env.example

```properties
# Configuración del Servidor
PORT=3000
NODE_ENV=development

# Base de Datos (MongoDB)
MONGODB_URI=mongodb://localhost:27017/odontosoft

# Seguridad y Autenticación (JWT)
# Cambia 'tu_clave_secreta' por algo complejo en producción
JWT_SECRET=tu_clave_secreta_super_segura_aqui
JWT_EXPIRES_IN=7d

# Configuración de CORS
FRONTEND_URL=http://localhost:8080

```

Crear `backend/.env` (copia del example con tus valores reales):

```bash
cp backend/.env.example backend/.env
```

Agregar `.env` al `.gitignore` (ya debería estar por la plantilla de Node):


### Configuración de Base de Datos

Crear `backend/src/config/database.js`:


```javascript
// Importamos la librería Mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

/**
 * Función asíncrona para conectar a la base de datos.
 * Utilizamos async/await para manejar la naturaleza asíncrona de la conexión.
 */
const connectDB = async () => {
  try {
    // Intentamos la conexión usando la URI de nuestras variables de entorno (.env)
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Estas opciones evitan advertencias de obsolescencia (deprecation warnings)
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Si la conexión es exitosa, mostramos el host en la consola
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    // Si hay un error (ej. URI incorrecta o servidor caído), lo imprimimos
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    
    // Finalizamos el proceso de la aplicación con un código de error (1)
    // para evitar que el backend corra sin base de datos
    process.exit(1);
  }
};

// Exportamos la función para que pueda ser llamada desde server.js
module.exports = connectDB;

```

### Modelos (Mongoose)

<span style="color: magenta; font-weight: bold;">Explicacion</span>

En el contexto de Node.js (específicamente cuando se una librería llamada Mongoose para conectarte a MongoDB), un Modelo es el puente entre el código y la base de datos.
La base de datos es un archivador gigante. El Modelo es el formulario oficial que todos deben llenar para que la información se guarde en orden.

#### Modelo Paciente — `backend/src/models/Paciente.js`:

<span style="color: magenta; font-weight: bold;">Explicacion</span>

Modelo de Paciente: Representa la ficha técnica y médica central de cada persona que asiste a la clínica odontológica. Contiene tanto la información de contacto básica (nombre, cédula, teléfono) como un historial clínico detallado que agrupa alergias, enfermedades crónicas y observaciones médicas. Es un modelo autónomo que permite llevar un control exhaustivo de la evolución del paciente y sirve como base para generar cualquier cita o tratamiento dentro de la aplicación.

<details>
  <summary><b>Codigo Paciente.js</b></summary>

```javascript
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
```
</details>


#### Modelo Cita — `backend/src/models/Cita.js`:

<span style="color: magenta; font-weight: bold;">Explicacion</span>

Modelo de Cita: Funciona como el motor operativo de la agenda, vinculando directamente a un paciente con un horario y un tratamiento específico. Este modelo registra la fecha, la hora, el motivo de la consulta y el estado de la misma (si fue completada, cancelada o está pendiente). Al incluir campos para el costo y las notas del dentista, no solo organiza el calendario de la clínica, sino que también facilita el seguimiento financiero y clínico de cada intervención realizada.

<details>
  <summary><b>Codigo Cita.js</b></summary>

```javascript
const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paciente',
      required: [true, 'El paciente es obligatorio'],
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha es obligatoria'],
    },
    duracionMinutos: {
      type: Number,
      default: 30,
    },
    motivo: {
      type: String,
      required: [true, 'El motivo es obligatorio'],
    },
    tratamiento: {
      type: String,
    },
    estado: {
      type: String,
      enum: ['programada', 'completada', 'cancelada', 'no_asistio'],
      default: 'programada',
    },
    notas: {
      type: String,
    },
    costo: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cita', citaSchema);

```
</details>

### Modelo Usuario — `backend/src/models/Usuario.js`:

<span style="color: magenta; font-weight: bold;">Explicacion</span>

Modelo de Usuario: Es el encargado de gestionar la seguridad y el acceso al sistema, almacenando los datos de quienes operan la plataforma. Su función principal es validar las credenciales (email y contraseña encriptada) y asignar un nivel de autoridad mediante roles como administrador, dentista o recepcionista. Gracias a este modelo, el software puede restringir qué secciones puede ver cada empleado, asegurando que la información sensible esté protegida.

<details>
  <summary><b>Codigo Usuario.js</b></summary>

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash de contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Comparar contraseña
usuarioSchema.methods.compararPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
```
</details>

## Middlewares

<span style="color: magenta; font-weight: bold;">Explicacion</span>

Es un "interceptor" o un vigilante que se sitúa entre la petición que hace un usuario y la respuesta final del servidor. Su función es revisar, filtrar o modificar los datos antes de que lleguen a su destino. Por ejemplo, un middleware puede verificar si un usuario tiene permiso para entrar a una ruta, revisar si faltan datos en un formulario o incluso registrar quién visitó la página, permitiendo que el servidor principal solo se ocupe de procesar la lógica importante.

### Autenticación JWT — `backend/src/middlewares/authMiddleware.js`:

<span style="color: magenta; font-weight: bold;">Explicacion</span>
El JSON Web Token (JWT) es como un "pase VIP" digital y seguro que el servidor le entrega al usuario cuando inicia sesión correctamente. En lugar de que el servidor tenga que recordar a cada usuario en su memoria, el usuario guarda este token (una cadena de texto cifrada) y lo presenta en cada nueva petición que hace. El servidor simplemente valida que el token sea auténtico y no haya caducado, permitiendo el acceso de forma rápida, privada y eficiente sin necesidad de consultar la base de datos a cada segundo.

<details>

  <summary><b>Codigo authMiddleware.js</b></summary>

```javascript
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const proteger = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        mensaje: 'No autorizado. Token no encontrado.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decoded.id);

    if (!req.usuario || !req.usuario.activo) {
      return res.status(401).json({
        success: false,
        mensaje: 'El usuario no existe o está inactivo.',
      });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, mensaje: 'Token inválido.' });
  }
};

const autorizar = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        success: false,
        mensaje: `El rol '${req.usuario.rol}' no tiene permiso para esta acción.`,
      });
    }
    next();
  };
};

module.exports = { proteger, autorizar };
```
</details>

##  Controladores

<span style="color: magenta; font-weight: bold;">Explicacion</span>
Los controladores son el "cerebro" o los directores de orquesta de tu aplicación. Su función principal es recibir las peticiones que llegan desde las rutas, procesar la lógica de negocio necesaria (como pedir datos a la base de datos o hacer cálculos) y decidir qué respuesta enviar de vuelta al usuario. Gracias a los controladores, el código se mantiene ordenado, ya que separan la "orden" que da el usuario de la "acción" real que ejecuta el servidor.

### Auth Controller — `backend/src/controllers/authController.js`:

<span style="color: magenta; font-weight: bold;">Explicacion</span>
El Auth Controller es un controlador especializado únicamente en gestionar la puerta de entrada y salida de los usuarios. Se encarga de procesos críticos como el registro de nuevas cuentas, la verificación de credenciales (correo y contraseña) al iniciar sesión y la generación del token de acceso. Es el responsable de decir: "Sí, este usuario es quien dice ser, aquí tienes su permiso para navegar".


<details>

  <summary><b>Codigo authController.js</b></summary>


```javascript
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const respuestaConToken = (usuario, statusCode, res) => {
  const token = generarToken(usuario._id);
  usuario.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: { usuario },
  });
};

exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const usuario = await Usuario.create({ nombre, email, password, rol });
    respuestaConToken(usuario, 201, res);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, mensaje: 'El email ya está registrado.' });
    }
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, mensaje: 'Email y contraseña son requeridos.' });
    }

    const usuario = await Usuario.findOne({ email }).select('+password');

    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ success: false, mensaje: 'Credenciales inválidas.' });
    }

    respuestaConToken(usuario, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

exports.perfil = async (req, res) => {
  res.status(200).json({ success: true, data: { usuario: req.usuario } });
};
```
</details>

### Paciente Controller — `backend/src/controllers/pacienteController.js`:

<span style="color: magenta; font-weight: bold;">Explicacion</span>
Es el controlador encargado de gestionar todo el ciclo de vida de los pacientes dentro del sistema. Su función es recibir las peticiones para crear, consultar, actualizar o eliminar la información de una persona (lo que técnicamente se conoce como CRUD).


<details>


  <summary><b>Codigo pacienteController.js</b></summary>

```javascript
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
```
</details>


### Cita Controller — `backend/src/controllers/citaController.js`:

<details>
  <summary><b>Codigo citaController.js</b></summary>

```javascript
const Cita = require('../models/Cita');

exports.obtenerCitas = async (req, res) => {
  try {
    const { fecha, estado, paciente } = req.query;
    const filtro = {};
    if (fecha) {
      const inicio = new Date(fecha);
      const fin = new Date(fecha);
      fin.setDate(fin.getDate() + 1);
      filtro.fecha = { $gte: inicio, $lt: fin };
    }
    if (estado) filtro.estado = estado;
    if (paciente) filtro.paciente = paciente;

    const citas = await Cita.find(filtro).populate('paciente', 'nombre apellido cedula telefono').sort({ fecha: 1 });
    res.status(200).json({ success: true, total: citas.length, data: citas });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

exports.obtenerCita = async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id).populate('paciente');
    if (!cita) {
      return res.status(404).json({ success: false, mensaje: 'Cita no encontrada.' });
    }
    res.status(200).json({ success: true, data: cita });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};

exports.crearCita = async (req, res) => {
  try {
    const cita = await Cita.create(req.body);
    await cita.populate('paciente', 'nombre apellido');
    res.status(201).json({ success: true, data: cita });
  } catch (error) {
    res.status(400).json({ success: false, mensaje: error.message });
  }
};

exports.actualizarCita = async (req, res) => {
  try {
    const cita = await Cita.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('paciente', 'nombre apellido');
    if (!cita) {
      return res.status(404).json({ success: false, mensaje: 'Cita no encontrada.' });
    }
    res.status(200).json({ success: true, data: cita });
  } catch (error) {
    res.status(400).json({ success: false, mensaje: error.message });
  }
};

exports.eliminarCita = async (req, res) => {
  try {
    const cita = await Cita.findByIdAndDelete(req.params.id);
    if (!cita) {
      return res.status(404).json({ success: false, mensaje: 'Cita no encontrada.' });
    }
    res.status(200).json({ success: true, mensaje: 'Cita eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: error.message });
  }
};
```
</details>

## Rutas

### Auth Routes — `backend/src/routes/authRoutes.js`:

<details>
  <summary><b>Codigo authRoutes.js</b></summary>

```javascript
const express = require('express');
const router = express.Router();
const { registrar, login, perfil } = require('../controllers/authController');
const { proteger } = require('../middlewares/authMiddleware');

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/perfil', proteger, perfil);

module.exports = router;
```
</details>


### Paciente Routes — `backend/src/routes/pacienteRoutes.js`:


<details>
  <summary><b>Codigo pacienteRoutes.js</b></summary>

```javascript
const express = require('express');
const router = express.Router();
const {
  obtenerPacientes,
  obtenerPaciente,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
} = require('../controllers/pacienteController');
const { proteger } = require('../middlewares/authMiddleware');

router.use(proteger); // Todas las rutas requieren autenticación

router.route('/').get(obtenerPacientes).post(crearPaciente);
router.route('/:id').get(obtenerPaciente).put(actualizarPaciente).delete(eliminarPaciente);

module.exports = router;
```
</details>

### Cita Routes — `backend/src/routes/citaRoutes.js`:

<details>
  <summary><b>Codigo citaRoutes.js</b></summary>

```javascript
const express = require('express');
const router = express.Router();
const {
  obtenerCitas,
  obtenerCita,
  crearCita,
  actualizarCita,
  eliminarCita,
} = require('../controllers/citaController');
const { proteger } = require('../middlewares/authMiddleware');

router.use(proteger);

router.route('/').get(obtenerCitas).post(crearCita);
router.route('/:id').get(obtenerCita).put(actualizarCita).delete(eliminarCita);

module.exports = router;

```
</details>

## App principal `backend/src/app.js`:

<details>
  <summary><b>Codigo app.js</b></summary>

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const citaRoutes = require('./routes/citaRoutes');

const app = express();

// Seguridad
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    mensaje: 'OdontoSoft API funcionando correctamente 🦷',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/citas', citaRoutes);

// 404 — Ruta no encontrada (CORREGIDO para Node 24)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    mensaje: `Ruta ${req.originalUrl} no encontrada.`,
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    mensaje: err.message || 'Error interno del servidor',
  });
});

module.exports = app;

```
</details>

## `backend/server.js`:

<details>
  <summary><b>Codigo server.js</b></summary>

```javascript
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🦷 OdontoSoft API corriendo en http://localhost:${PORT}`);
  console.log(`📋 Entorno: ${process.env.NODE_ENV}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err.message);
  server.close(() => process.exit(1));
});
```
</details>

<span style="color: green; font-weight: bold;">

## Probar la API

</span>

```bash
cd backend
npm run dev
```

<span style="color: green; font-weight: bold;">

## Probar la API con Thunder Client

</span>

### Documentación de resultados con Thunder Client
> Entorno: Local · Backend: http://localhost:3000 · Base de datos: MongoDB local

---

## Requisitos previos

Antes de ejecutar cualquier prueba verificar que los siguientes servicios estén corriendo:

| Servicio | Terminal | Comando |
|---|---|---|
| MongoDB | Terminal 1 | `mongod` |
| Backend Node.js | Terminal 2 | `npm run dev` dentro de `/backend` |

Herramienta utilizada para las pruebas: **Thunder Client** (extensión de VSCode)

---

## Índice de pruebas

| # | Prueba | Método | Endpoint | Auth |
|---|---|---|---|---|
| 1 | Health Check | GET | `/api/health` | No |
| 2 | Registrar usuario | POST | `/api/auth/registrar` | No |
| 3 | Login | POST | `/api/auth/login` | No |
| 4 | Crear paciente | POST | `/api/pacientes` | JWT |
| 5 | Listar pacientes | GET | `/api/pacientes` | JWT |
| 6 | Buscar paciente | GET | `/api/pacientes?search=` | JWT |
| 7 | Actualizar paciente | PUT | `/api/pacientes/:id` | JWT |
| 8 | Crear cita | POST | `/api/citas` | JWT |
| 9 | Listar citas filtradas | GET | `/api/citas?fecha=` | JWT |
| 10 | Eliminar paciente | DELETE | `/api/pacientes/:id` | JWT |

---

## Prueba 1 — Health Check

Verifica que el servidor está encendido y respondiendo correctamente.

**Configuración:**

| Campo | Valor |
|---|---|
| Método | GET |
| URL | `http://localhost:3000/api/health` |
| Auth | Ninguna |
| Body | Ninguno |

**Request:**
```
GET http://localhost:3000/api/health
```

**Response esperado — Status 200 OK:**
```json
{
  "success": true,
  "mensaje": "🦷 OdontoSoft API funcionando correctamente",
  "version": "1.0.0",
  "timestamp": "2024-12-20T10:00:00.000Z"
}
```

**Resultado:** ✅ PASÓ

---

## Prueba 2 — Registrar usuario administrador

Crea el primer usuario del sistema con rol de administrador.

**Configuración:**

| Campo | Valor |
|---|---|
| Método | POST |
| URL | `http://localhost:3000/api/auth/registrar` |
| Auth | Ninguna |
| Body | JSON |

**Request Body:**
```json
{
  "nombre": "Admin",
  "email": "admin@odontosoft.com",
  "password": "admin123",
  "rol": "admin"
}
```

**Response esperado — Status 201 Created:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "usuario": {
      "_id": "69a79d61619f3eb50d1c83cd",
      "nombre": "Admin",
      "email": "admin@odontosoft.com",
      "rol": "admin",
      "activo": true,
      "createdAt": "2026-03-04T02:48:01.197Z"
    }
  }
}
```

**Response de error — Status 400 (usuario ya existe):**
```json
{
  "success": false,
  "mensaje": "Ya existe una cuenta con ese email."
}
```

> ⚠️ Si aparece el error de email ya registrado, significa que el usuario fue creado en una ejecución anterior. En ese caso proceder directamente a la Prueba 3.

**Resultado:** ✅ PASÓ

---

## Prueba 3 — Login

Autentica al usuario y obtiene el token JWT necesario para las siguientes pruebas.

**Configuración:**

| Campo | Valor |
|---|---|
| Método | POST |
| URL | `http://localhost:3000/api/auth/login` |
| Auth | Ninguna |
| Body | JSON |

**Request Body:**
```json
{
  "email": "admin@odontosoft.com",
  "password": "admin123"
}
```

**Response esperado — Status 200 OK:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTc5ZDYxNjE5ZjNlYjUwZDFjODNjZCIsImlhdCI6MTc3MjU5MjYxNCwiZXhwIjoxNzczMTk3NDE0fQ.904qzCnUldbcv_hoH3QFV_TsKpAF851VXj3yxNymBww",
  "data": {
    "usuario": {
      "_id": "69a79d61619f3eb50d1c83cd",
      "nombre": "Admin",
      "email": "admin@odontosoft.com",
      "rol": "admin",
      "activo": true,
      "createdAt": "2026-03-04T02:48:01.197Z",
      "updatedAt": "2026-03-04T02:48:01.197Z"
    }
  }
}
```

**Response de error — Status 401 (credenciales incorrectas):**
```json
{
  "success": false,
  "mensaje": "Email o contraseña incorrectos."
}
```

> ⚠️ A partir de esta prueba todas las siguientes requieren el token. En Thunder Client ir a la pestaña **Auth → Bearer Token** y pegar el token sin la palabra "Bearer" ni comillas.

**Resultado:** ✅ PASÓ — Token obtenido correctamente

---

## Prueba 4 — Crear paciente

Registra un nuevo paciente en el sistema.

**Configuración:**

| Campo | Valor |
|---|---|
| Método | POST |
| URL | `http://localhost:3000/api/pacientes` |
| Auth | Bearer Token |
| Body | JSON |

**Cómo agregar el token en Thunder Client:**
```
Pestaña Auth → Bearer Token → pegar el token del login
```

**Request Body:**
```json
{
  "nombre": "Carlos",
  "apellido": "Ramírez",
  "cedula": "1234567890",
  "fechaNacimiento": "1990-05-15",
  "telefono": "3001234567",
  "email": "carlos@email.com",
  "direccion": "Calle 123 # 45-67"
}
```

**Response esperado — Status 201 Created:**
```json
{
  "success": true,
  "data": {
    "_id": "64abc123def456ghi789",
    "nombre": "Carlos",
    "apellido": "Ramírez",
    "cedula": "1234567890",
    "fechaNacimiento": "1990-05-15T00:00:00.000Z",
    "telefono": "3001234567",
    "email": "carlos@email.com",
    "direccion": "Calle 123 # 45-67",
    "historialClinico": {
      "alergias": [],
      "enfermedades": [],
      "medicamentos": [],
      "observaciones": ""
    },
    "activo": true,
    "createdAt": "2024-12-20T10:00:00.000Z"
  }
}
```

**Response de error — Status 400 (cédula duplicada):**
```json
{
  "success": false,
  "mensaje": "Ya existe un paciente con esa cédula."
}
```

**Response de error — Status 401 (sin token):**
```json
{
  "success": false,
  "mensaje": "No tienes permiso. Inicia sesión primero."
}
```

> ⚠️ Copiar el `_id` del paciente creado, se necesita en las pruebas 7, 8 y 10.

**Resultado:** ✅ PASÓ

---

## Prueba 5 — Listar pacientes

Obtiene todos los pacientes activos del sistema.

**Configuración:**

| Campo | Valor |
|---|---|
| Método | GET |
| URL | `http://localhost:3000/api/pacientes` |
| Auth | Bearer Token |
| Body | Ninguno |

**Request:**
```
GET http://localhost:3000/api/pacientes
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response esperado — Status 200 OK:**
```json
{
  "success": true,
  "total": 1,
  "pagina": 1,
  "totalPaginas": 1,
  "data": [
    {
      "_id": "64abc123def456ghi789",
      "nombre": "Carlos",
      "apellido": "Ramírez",
      "cedula": "1234567890",
      "telefono": "3001234567",
      "email": "carlos@email.com",
      "activo": true
    }
  ]
}
```

**Parámetros opcionales de paginación:**

| Parámetro | Descripción | Ejemplo |
|---|---|---|
| `page` | Número de página | `?page=1` |
| `limit` | Cantidad por página | `?limit=10` |

**Resultado:** ✅ PASÓ

---

## Prueba 6 — Buscar paciente por nombre, apellido o cédula

Filtra los pacientes usando un texto de búsqueda.

**Configuración:**

| Campo | Valor |
|---|---|
| Método | GET |
| URL | `http://localhost:3000/api/pacientes?search=Carlos` |
| Auth | Bearer Token |
| Body | Ninguno |

**Cómo configurarlo en Thunder Client:**

Pestaña **Query → agregar fila:**

| Key | Value |
|---|---|
| search | Carlos |

Thunder Client construye la URL automáticamente:
```
http://localhost:3000/api/pacientes?search=Carlos
```

**Response esperado — Status 200 OK (con resultados):**
```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "nombre": "Carlos",
      "apellido": "Ramírez",
      "cedula": "1234567890"
    }
  ]
}
```

**Response esperado — Status 200 OK (sin resultados):**
```json
{
  "success": true,
  "total": 0,
  "data": []
}
```

> La búsqueda no es sensible a mayúsculas o minúsculas. Buscar "carlos" o "CARLOS" devuelve el mismo resultado.

**Resultado:** ✅ PASÓ

---

## Prueba 7 — Actualizar paciente

Modifica los datos de un paciente existente.

**Configuración:**

| Campo | Valor |
|---|---|
| Método | PUT |
| URL | `http://localhost:3000/api/pacientes/64abc123def456ghi789` |
| Auth | Bearer Token |
| Body | JSON |

> Reemplazar `64abc123def456ghi789` con el `_id` real obtenido en la Prueba 4.

**Request Body:**
```json
{
  "telefono": "3009876543",
  "direccion": "Avenida Siempre Viva 742"
}
```

> Solo es necesario enviar los campos que se quieren modificar, no todos.

**Response esperado — Status 200 OK:**
```json
{
  "success": true,
  "data": {
    "_id": "64abc123def456ghi789",
    "nombre": "Carlos",
    "apellido": "Ramírez",
    "cedula": "1234567890",
    "telefono": "3009876543",
    "direccion": "Avenida Siempre Viva 742",
    "updatedAt": "2024-12-20T11:00:00.000Z"
  }
}
```

**Response de error — Status 404 (paciente no existe):**
```json
{
  "success": false,
  "mensaje": "Paciente no encontrado."
}
```

**Resultado:** ✅ PASÓ

---

## Prueba 8 — Crear cita

Agenda una nueva cita vinculada a un paciente existente.

**Configuración:**

| Campo | Valor |
|---|---|
| Método | POST |
| URL | `http://localhost:3000/api/citas` |
| Auth | Bearer Token |
| Body | JSON |

**Request Body:**
```json
{
  "paciente": "64abc123def456ghi789",
  "fecha": "2024-12-20T10:00:00",
  "duracionMinutos": 45,
  "motivo": "Limpieza dental",
  "tratamiento": "Profilaxis",
  "estado": "programada",
  "costo": 80000,
  "notas": "Paciente con sensibilidad en muela del juicio"
}
```

> El campo `paciente` debe ser el `_id` real del paciente creado en la Prueba 4.

**Valores válidos para el campo `estado`:**

| Valor | Significado |
|---|---|
| `programada` | Cita agendada, pendiente de atención |
| `completada` | Cita atendida exitosamente |
| `cancelada` | Cita cancelada por el paciente o el consultorio |
| `no_asistio` | El paciente no se presentó |

**Response esperado — Status 201 Created:**
```json
{
  "success": true,
  "data": {
    "_id": "64xyz987abc654def321",
    "paciente": {
      "_id": "64abc123def456ghi789",
      "nombre": "Carlos",
      "apellido": "Ramírez"
    },
    "fecha": "2024-12-20T10:00:00.000Z",
    "duracionMinutos": 45,
    "motivo": "Limpieza dental",
    "tratamiento": "Profilaxis",
    "estado": "programada",
    "costo": 80000,
    "notas": "Paciente con sensibilidad en muela del juicio",
    "createdAt": "2024-12-20T08:00:00.000Z"
  }
}
```

**Response de error — Status 400 (paciente no indicado):**
```json
{
  "success": false,
  "mensaje": "El paciente es obligatorio"
}
```

**Resultado:** ✅ PASÓ

---

## Prueba 9 — Listar citas filtradas por fecha

Obtiene las citas del sistema aplicando filtros opcionales por fecha y estado.

**Configuración:**

| Campo | Valor |
|---|---|
| Método | GET |
| URL | `http://localhost:3000/api/citas` |
| Auth | Bearer Token |
| Body | Ninguno |

**Cómo agregar filtros en Thunder Client:**

Pestaña **Query → agregar filas:**

| Key | Value |
|---|---|
| fecha | 2024-12-20 |
| estado | programada |

URL resultante:
```
http://localhost:3000/api/citas?fecha=2024-12-20&estado=programada
```

**Filtros disponibles:**

| Parámetro | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `fecha` | YYYY-MM-DD | Filtra citas de ese día completo | `2024-12-20` |
| `estado` | string | Filtra por estado de la cita | `programada` |
| `paciente` | ObjectId | Filtra citas de un paciente específico | `64abc123...` |

> ⚠️ La fecha siempre debe ir en formato `YYYY-MM-DD`. Formatos como `20/12/2024` o `12-20-2024` no son reconocidos.

**Response esperado — Status 200 OK (con resultados):**
```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "_id": "64xyz987abc654def321",
      "paciente": {
        "nombre": "Carlos",
        "apellido": "Ramírez",
        "cedula": "1234567890",
        "telefono": "3001234567"
      },
      "fecha": "2024-12-20T10:00:00.000Z",
      "duracionMinutos": 45,
      "motivo": "Limpieza dental",
      "tratamiento": "Profilaxis",
      "estado": "programada",
      "costo": 80000,
      "notas": "Paciente con sensibilidad en muela del juicio"
    }
  ]
}
```

**Response esperado — Status 200 OK (sin resultados):**
```json
{
  "success": true,
  "total": 0,
  "data": []
}
```

**Resultado:** ✅ PASÓ

---

## Prueba 10 — Eliminar paciente (borrado lógico)

Desactiva un paciente del sistema. El registro no se borra físicamente de la base de datos, solo se marca como inactivo.

**Configuración:**

| Campo | Valor |
|---|---|
| Método | DELETE |
| URL | `http://localhost:3000/api/pacientes/64abc123def456ghi789` |
| Auth | Bearer Token |
| Body | Ninguno |

> Reemplazar `64abc123def456ghi789` con el `_id` real del paciente.

**Request:**
```
DELETE http://localhost:3000/api/pacientes/64abc123def456ghi789
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response esperado — Status 200 OK:**
```json
{
  "success": true,
  "mensaje": "Paciente desactivado correctamente."
}
```

**Response de error — Status 404 (paciente no existe):**
```json
{
  "success": false,
  "mensaje": "Paciente no encontrado."
}
```

> El paciente queda con `activo: false` en la base de datos. Ya no aparece en el listado de pacientes pero su historial e información se conservan íntegros.

**Resultado:** ✅ PASÓ

---

## Pruebas de error y validación

Pruebas adicionales para verificar que la API rechaza correctamente las peticiones inválidas.

### Sin token — debe devolver 401

```
Método:  GET
URL:     http://localhost:3000/api/pacientes
Auth:    Ninguna
```

```json
{
  "success": false,
  "mensaje": "No tienes permiso. Inicia sesión primero."
}
```

**Resultado:** ✅ PASÓ

---

### Cédula duplicada — debe devolver 400

Intentar crear un segundo paciente con la misma cédula del primero.

```
Método:  POST
URL:     http://localhost:3000/api/pacientes
Body:    mismo body de la Prueba 4 con la misma cédula
```

```json
{
  "success": false,
  "mensaje": "Ya existe un paciente con esa cédula."
}
```

**Resultado:** ✅ PASÓ

---

### Contraseña incorrecta — debe devolver 401

```
Método:  POST
URL:     http://localhost:3000/api/auth/login
Body:    { "email": "admin@odontosoft.com", "password": "wrongpassword" }
```

```json
{
  "success": false,
  "mensaje": "Email o contraseña incorrectos."
}
```

**Resultado:** ✅ PASÓ

---

## Resumen de resultados

| # | Prueba | Método | Status esperado | Resultado |
|---|---|---|---|---|
| 1 | Health Check | GET | 200 | ✅ PASÓ |
| 2 | Registrar usuario | POST | 201 | ✅ PASÓ |
| 3 | Login | POST | 200 | ✅ PASÓ |
| 4 | Crear paciente | POST | 201 | ✅ PASÓ |
| 5 | Listar pacientes | GET | 200 | ✅ PASÓ |
| 6 | Buscar paciente | GET | 200 | ✅ PASÓ |
| 7 | Actualizar paciente | PUT | 200 | ✅ PASÓ |
| 8 | Crear cita | POST | 201 | ✅ PASÓ |
| 9 | Listar citas filtradas | GET | 200 | ✅ PASÓ |
| 10 | Eliminar paciente | DELETE | 200 | ✅ PASÓ |
| E1 | Sin token | GET | 401 | ✅ PASÓ |
| E2 | Cédula duplicada | POST | 400 | ✅ PASÓ |
| E3 | Contraseña incorrecta | POST | 401 | ✅ PASÓ |

**Total: 13 pruebas ejecutadas — 13 pasaron — 0 fallaron**


<span style="color: orange; font-weight: bold;">

## Github: Push del Backend:

</span>

```bash
cd ..   # raíz del proyecto
git add .
git commit -m "feat(backend): implementar API REST completa con auth JWT, pacientes y citas"
git push origin main
```



  ## 3️⃣ FASE 3 — FRONTEND CON MATERIALIZE CSS

  </summary>

## Página de Login

### Crear `frontend/index.html`:

<details>
  <summary><b>Codigo index.html</b></summary>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OdontoSoft — Login</title>
  <!-- Materialize CSS -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet" />
  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <style>
    body { background: #e0f2f1; }
    .login-card { margin-top: 80px; max-width: 420px; }
    .brand-logo-text { font-size: 2rem; font-weight: bold; color: #00897b; }
    .login-header { background: #00897b; padding: 30px; text-align: center; border-radius: 4px 4px 0 0; }
  </style>
</head>
<body>

<div class="container">
  <div class="row center-align">
    <div class="col s12 m6 offset-m3 login-card">
      <div class="card">
        <div class="login-header white-text">
          <i class="material-icons" style="font-size:3rem">local_hospital</i>
          <div class="brand-logo-text white-text">OdontoSoft</div>
          <p class="white-text">Sistema de Gestión Odontológica</p>
        </div>
        <div class="card-content">
          <div class="input-field">
            <i class="material-icons prefix">email</i>
            <input id="email" type="email" class="validate" />
            <label for="email">Correo Electrónico</label>
          </div>
          <div class="input-field">
            <i class="material-icons prefix">lock</i>
            <input id="password" type="password" class="validate" />
            <label for="password">Contraseña</label>
          </div>
          <div id="error-msg" class="red-text" style="display:none; margin-bottom:10px;"></div>
          <button id="btn-login" class="btn waves-effect waves-light teal darken-1 btn-large col s12" onclick="login()">
            Ingresar
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Materialize JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script>
  const API_URL = 'http://localhost:3000/api';

  async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('btn-login');
    const errorMsg = document.getElementById('error-msg');

    btn.disabled = true;
    btn.innerHTML = '<div class="progress"><div class="indeterminate"></div></div>';

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.data.usuario));
        window.location.href = 'dashboard.html';
      } else {
        errorMsg.textContent = data.mensaje;
        errorMsg.style.display = 'block';
        btn.disabled = false;
        btn.innerHTML = 'Ingresar <i class="material-icons right">send</i>';
      }
    } catch (e) {
      errorMsg.textContent = 'Error al conectar con el servidor.';
      errorMsg.style.display = 'block';
      btn.disabled = false;
      btn.innerHTML = 'Ingresar <i class="material-icons right">send</i>';
    }
  }

  // Verificar si ya hay sesión
  if (localStorage.getItem('token')) {
    window.location.href = 'dashboard.html';
  }
</script>
</body>
</html>

```
</details>

## Dashboard / Pacientes
### Crear `frontend/pacientes.html`:

<details>
  <summary><b>Codigo pacientes.html</b></summary>

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OdontoSoft — Pacientes</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <style>
    nav { background-color: #00897b; }
    .sidenav { background: #004d40; }
    .sidenav li > a { color: #e0f2f1; }
    .sidenav .user-view .background { background: #00897b; }
    .page-title { margin: 20px 0; }
    .fab-fixed { position: fixed; bottom: 30px; right: 30px; z-index: 999; }
    .badge-estado { font-size: 11px; padding: 3px 8px; border-radius: 12px; }
  </style>
</head>
<body>

<!-- Sidenav -->
<ul id="slide-out" class="sidenav sidenav-fixed">
  <li>
    <div class="user-view">
      <div class="background teal darken-3"></div>
      <a><i class="material-icons white-text" style="font-size:3rem">account_circle</i></a>
      <a><span class="white-text name" id="usuario-nombre">Usuario</span></a>
      <a><span class="white-text email" id="usuario-email"></span></a>
    </div>
  </li>
  <li><a href="dashboard.html" class="white-text"><i class="material-icons">dashboard</i>Dashboard</a></li>
  <li class="active"><a href="pacientes.html" class="white-text"><i class="material-icons">people</i>Pacientes</a></li>
  <li><a href="citas.html" class="white-text"><i class="material-icons">event</i>Citas</a></li>
  <li><div class="divider" style="background:#1b5e20"></div></li>
  <li><a href="#" onclick="cerrarSesion()" class="white-text"><i class="material-icons">exit_to_app</i>Cerrar Sesión</a></li>
</ul>

<!-- Navbar -->
<div class="navbar-fixed">
  <nav>
    <div class="nav-wrapper container">
      <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <a class="brand-logo center"><i class="material-icons left">local_hospital</i>OdontoSoft</a>
    </div>
  </nav>
</div>

<main style="padding-left: 300px; padding-top: 80px;">
  <div class="container">
    <h4 class="page-title">
      <i class="material-icons left">people</i> Pacientes
    </h4>

    <!-- Búsqueda -->
    <div class="row">
      <div class="input-field col s12 m8">
        <i class="material-icons prefix">search</i>
        <input id="busqueda" type="text" onkeyup="buscarPacientes(this.value)" />
        <label for="busqueda">Buscar por nombre, apellido o cédula...</label>
      </div>
    </div>

    <!-- Tabla -->
    <div class="card">
      <div class="card-content" id="tabla-container">
        <div class="center-align">
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-teal-only">
              <div class="circle-clipper left"><div class="circle"></div></div>
              <div class="gap-patch"><div class="circle"></div></div>
              <div class="circle-clipper right"><div class="circle"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<!-- FAB para nuevo paciente -->
<div class="fab-fixed">
  <a class="btn-floating btn-large teal darken-1 waves-effect waves-light" onclick="abrirModalNuevo()">
    <i class="material-icons">person_add</i>
  </a>
</div>

<!-- Modal Nuevo/Editar Paciente -->
<div id="modal-paciente" class="modal modal-fixed-footer">
  <div class="modal-content">
    <h5 id="modal-titulo">Nuevo Paciente</h5>
    <div class="row">
      <div class="input-field col s12 m6">
        <input id="p-nombre" type="text" class="validate" />
        <label for="p-nombre">Nombre *</label>
      </div>
      <div class="input-field col s12 m6">
        <input id="p-apellido" type="text" class="validate" />
        <label for="p-apellido">Apellido *</label>
      </div>
      <div class="input-field col s12 m6">
        <input id="p-cedula" type="text" class="validate" />
        <label for="p-cedula">Cédula *</label>
      </div>
      <div class="input-field col s12 m6">
        <input id="p-telefono" type="text" class="validate" />
        <label for="p-telefono">Teléfono *</label>
      </div>
      <div class="input-field col s12 m6">
        <input id="p-email" type="email" class="validate" />
        <label for="p-email">Email</label>
      </div>
      <div class="input-field col s12 m6">
        <input id="p-fechaNacimiento" type="date" class="validate" />
        <label for="p-fechaNacimiento" class="active">Fecha de Nacimiento *</label>
      </div>
      <div class="input-field col s12">
        <textarea id="p-direccion" class="materialize-textarea"></textarea>
        <label for="p-direccion">Dirección</label>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-close waves-effect btn-flat">Cancelar</a>
    <button class="waves-effect btn teal darken-1" onclick="guardarPaciente()">
      <i class="material-icons left">save</i>Guardar
    </button>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script>
  const API_URL = 'http://localhost:3000/api';
  let pacienteEditandoId = null;
  let timeoutBusqueda;

  // Auth check
  const token = localStorage.getItem('token');
  if (!token) window.location.href = 'index.html';
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  document.addEventListener('DOMContentLoaded', () => {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Modal.init(document.querySelectorAll('.modal'));
    document.getElementById('usuario-nombre').textContent = usuario.nombre || 'Usuario';
    document.getElementById('usuario-email').textContent = usuario.email || '';
    cargarPacientes();
  });

  async function fetchAPI(url, options = {}) {
    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });
    return res.json();
  }

  async function cargarPacientes(search = '') {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    const data = await fetchAPI(`/pacientes${query}`);
    renderTabla(data.data || []);
  }

  function buscarPacientes(val) {
    clearTimeout(timeoutBusqueda);
    timeoutBusqueda = setTimeout(() => cargarPacientes(val), 400);
  }

  function renderTabla(pacientes) {
    const container = document.getElementById('tabla-container');
    if (!pacientes.length) {
      container.innerHTML = '<p class="center-align grey-text">No se encontraron pacientes.</p>';
      return;
    }
    container.innerHTML = `
      <table class="striped responsive-table highlight">
        <thead><tr>
          <th>Nombre</th><th>Cédula</th><th>Teléfono</th><th>Email</th><th>Acciones</th>
        </tr></thead>
        <tbody>
          ${pacientes.map(p => `
            <tr>
              <td>${p.nombre} ${p.apellido}</td>
              <td>${p.cedula}</td>
              <td>${p.telefono}</td>
              <td>${p.email || '—'}</td>
              <td>
                <a class="btn-small teal waves-effect" onclick="editarPaciente('${p._id}')">
                  <i class="material-icons">edit</i>
                </a>
                <a class="btn-small red waves-effect" onclick="eliminarPaciente('${p._id}', '${p.nombre}')">
                  <i class="material-icons">delete</i>
                </a>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function abrirModalNuevo() {
    pacienteEditandoId = null;
    document.getElementById('modal-titulo').textContent = 'Nuevo Paciente';
    ['nombre','apellido','cedula','telefono','email','fechaNacimiento','direccion'].forEach(f => {
      document.getElementById(`p-${f}`).value = '';
      M.updateTextFields();
    });
    M.Modal.getInstance(document.getElementById('modal-paciente')).open();
  }

  async function editarPaciente(id) {
    const data = await fetchAPI(`/pacientes/${id}`);
    const p = data.data;
    pacienteEditandoId = id;
    document.getElementById('modal-titulo').textContent = 'Editar Paciente';
    document.getElementById('p-nombre').value = p.nombre;
    document.getElementById('p-apellido').value = p.apellido;
    document.getElementById('p-cedula').value = p.cedula;
    document.getElementById('p-telefono').value = p.telefono;
    document.getElementById('p-email').value = p.email || '';
    document.getElementById('p-fechaNacimiento').value = p.fechaNacimiento ? p.fechaNacimiento.substring(0,10) : '';
    document.getElementById('p-direccion').value = p.direccion || '';
    M.updateTextFields();
    M.textareaAutoResize(document.getElementById('p-direccion'));
    M.Modal.getInstance(document.getElementById('modal-paciente')).open();
  }

  async function guardarPaciente() {
    const body = {
      nombre: document.getElementById('p-nombre').value,
      apellido: document.getElementById('p-apellido').value,
      cedula: document.getElementById('p-cedula').value,
      telefono: document.getElementById('p-telefono').value,
      email: document.getElementById('p-email').value,
      fechaNacimiento: document.getElementById('p-fechaNacimiento').value,
      direccion: document.getElementById('p-direccion').value,
    };

    const url = pacienteEditandoId ? `/pacientes/${pacienteEditandoId}` : '/pacientes';
    const method = pacienteEditandoId ? 'PUT' : 'POST';
    const data = await fetchAPI(url, { method, body: JSON.stringify(body) });

    if (data.success) {
      M.toast({ html: `✅ Paciente ${pacienteEditandoId ? 'actualizado' : 'creado'} correctamente`, classes: 'teal' });
      M.Modal.getInstance(document.getElementById('modal-paciente')).close();
      cargarPacientes();
    } else {
      M.toast({ html: `❌ ${data.mensaje}`, classes: 'red' });
    }
  }

  async function eliminarPaciente(id, nombre) {
    if (!confirm(`¿Desactivar al paciente ${nombre}?`)) return;
    const data = await fetchAPI(`/pacientes/${id}`, { method: 'DELETE' });
    if (data.success) {
      M.toast({ html: '✅ Paciente desactivado', classes: 'teal' });
      cargarPacientes();
    } else {
      M.toast({ html: `❌ ${data.mensaje}`, classes: 'red' });
    }
  }

  function cerrarSesion() {
    localStorage.clear();
    window.location.href = 'index.html';
  }
</script>
</body>
</html>
```
</details>


<span style="color: orange; font-weight: bold;">

## GitHub: Push del Frontend

</span>

```bash
git add .
git commit -m "feat(frontend): agregar login y gestión de pacientes con Materialize CSS"
git push origin main
```


## 4️⃣ FASE 4 — DOCKERIZACIÓN

### Ubicacion de archivos


```plaintext
odontosoft/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── citaController.js
│   │   │   └── pacienteController.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── Cita.js
│   │   │   ├── Paciente.js
│   │   │   └── Usuario.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── citaRoutes.js
│   │   │   └── pacienteRoutes.js
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── js/
│   │   └── config.js
│   ├── pages/
│   │   ├── citas.html
│   │   └── pacientes.html
│   └── index.html
│
├── docker/                         ← 🐳 CARPETA DOCKER
│   ├── Dockerfile.backend          ← instrucciones para empaquetar el backend
│   ├── Dockerfile.frontend         ← instrucciones para empaquetar el frontend
│   └── nginx.conf                  ← configuración del servidor del frontend
│
├── docker-compose.yml              ← 🐳 orquesta los 3 servicios juntos
├── .dockerignore                   ← 🐳 archivos que Docker ignora (como .gitignore)
├── .gitignore
└── README.md
```

<span style="color: magenta; font-weight: bold;">
Explicacion 
</span>

Cada archivo Docker tiene su responsabilidad:
docker/Dockerfile.backend le dice a Docker cómo construir el contenedor del servidor Node, qué dependencias instalar y cómo arrancarlo.
docker/Dockerfile.frontend le dice a Docker que tome los HTML del frontend y los sirva con nginx.
docker/nginx.conf configura el servidor nginx que va a servir los archivos del frontend dentro del contenedor.
docker-compose.yml va en la raíz porque es el archivo principal que conecta y levanta los 3 contenedores juntos (MongoDB + Backend + Frontend) con un solo comando.
.dockerignore también va en la raíz y le dice a Docker que ignore carpetas como node_modules o el .env para que no las meta dentro del contenedor.

### Dockerfile del Backend
#### Crear `docker/Dockerfile.backend`:


<details>
  <summary><b>Dockerfile.backend</b></summary>

```dockerfile
# --- Etapa de construcción ---
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY backend/package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY backend/ .

# --- Etapa de producción ---
FROM node:18-alpine

WORKDIR /app

# Copiar desde builder
COPY --from=builder /app /app

# Usuario no root para seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Puerto expuesto
EXPOSE 3000

# Variable de entorno de producción
ENV NODE_ENV=production

# Comando de inicio
CMD ["node", "server.js"]
```
</details>


### Dockerfile del Frontend

#### Crear `docker/Dockerfile.frontenbackend`:

<details>
  <summary><b>Dockerfile.backend</b></summary>

```dockerfile
FROM nginx:alpine

# Copiar archivos del frontend
COPY frontend/ /usr/share/nginx/html/

# Configuración personalizada de nginx
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

```
</details>

#### Crear `docker/nginx.conf`:

<details>
  <summary><b>Dockerfile.backend</b></summary>

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

</details>

### Docker Compose

#### Crear docker-compose.yml en la raíz:


<details>
  <summary><b>Codigo docker-compose.yml</b></summary>

```yaml
version: '3.8'

services:
  # Base de datos MongoDB
  mongodb:
    image: mongo:6.0
    container_name: odontosoft-db
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: odontosoft
    volumes:
      - mongodb_data:/data/db
    networks:
      - odontosoft-network
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend API
  backend:
    build:
      context: .
      dockerfile: docker/Dockerfile.backend
    container_name: odontosoft-api
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      MONGODB_URI: mongodb://mongodb:27017/odontosoft
      JWT_SECRET: ${JWT_SECRET:-cambiar_en_produccion_secreto_muy_seguro}
      JWT_EXPIRES_IN: 7d
      FRONTEND_URL: http://localhost:80
    depends_on:
      mongodb:
        condition: service_healthy
    networks:
      - odontosoft-network

  # Frontend
  frontend:
    build:
      context: .
      dockerfile: docker/Dockerfile.frontend
    container_name: odontosoft-web
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - odontosoft-network

volumes:
  mongodb_data:
    name: odontosoft_mongodb_data

networks:
  odontosoft-network:
    name: odontosoft_network
    driver: bridge
```
</details>


### Construir y ejecutar con Docker
```bash 
# Desde la raíz del proyecto

# Construir las imágenes
docker-compose build

# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver estado de los contenedores
docker-compose ps

# Probar que funciona
curl http://localhost:3000/api/health

# Detener los servicios
docker-compose down

# Detener Y eliminar volúmenes (cuidado: borra la DB)
docker-compose down -v
```

<span style="color: orange; font-weight: bold;">

## GitHub: Push de Docker

</span>

```bash
git add .
git commit -m "feat(docker): agregar Dockerfiles y docker-compose para todos los servicios"
git push origin main
```


## 5️⃣ FASE 5 — DESPLIEGUE EN AWS


###  Configurar AWS CLI

```bash
# Configurar credenciales
aws configure

# Te pedirá:
# AWS Access Key ID: [tu access key]
# AWS Secret Access Key: [tu secret key]
# Default region name: us-east-1
# Default output format: json

# Verificar configuración
aws sts get-caller-identity
```

### Crear repositorio en ECR (Elastic Container Registry)

```bash
# Variables (cambia con tus valores)
export AWS_REGION=us-east-1
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export ECR_REPO_BACKEND=odontosoft/backend
export ECR_REPO_FRONTEND=odontosoft/frontend

# Crear repositorios ECR
aws ecr create-repository --repository-name $ECR_REPO_BACKEND --region $AWS_REGION
aws ecr create-repository --repository-name $ECR_REPO_FRONTEND --region $AWS_REGION

# Autenticarse en ECR
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

```

### Subir imágenes a ECR

```bash
# Construir imágenes con el tag correcto para ECR
docker build -f docker/Dockerfile.backend -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_BACKEND:latest .
docker build -f docker/Dockerfile.frontend -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_FRONTEND:latest .

# Subir imágenes a ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_BACKEND:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_FRONTEND:latest
```

### MongoDB con Atlas (recomendado para AWS)

☁️ Configuración de MongoDB Atlas (Nube)

Si prefieres no usar un contenedor local, puedes utilizar la capa gratuita de **MongoDB Atlas** (hasta 512MB). Sigue estos pasos:

---

1. Registro y Creación
* Dirígete a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y crea una cuenta.
* Crea un nuevo cluster seleccionando el nivel gratuito **M0**.

2. Configuración de Seguridad
* **Network Access:** Ve a la pestaña *Network Access* → Haz clic en **Add IP Address** → Agrega `0.0.0.0/0` (esto permite acceso desde cualquier lugar, ideal para desarrollo o tu instancia EC2).
* **Database Access:** Ve a *Database Access* → Haz clic en **Add New Database User** → Crea un usuario y una contraseña (guarda bien estos datos).

3. Obtención de la URL de Conexión
1. Haz clic en el botón **Connect** dentro de tu Cluster.
2. Selecciona **Drivers** (Node.js).
3. Copia la cadena de conexión (**Connection String**). Se verá algo así:

```bash
mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/odontosoft?retryWrites=true&w=majority
```

> [!CAUTION] 
> **Nota Importante:** Recuerda reemplazar `<password>` con la contraseña real que creaste (asegúrate de borrar también los símbolos `< >`).


### Despliegue con EC2 (opción más simple)

#### Crear instancia EC2:

```bash
# Crear key pair
aws ec2 create-key-pair \
  --key-name odontosoft-key \
  --query 'KeyMaterial' \
  --output text > odontosoft-key.pem

chmod 400 odontosoft-key.pem

# Crear security group
SG_ID=$(aws ec2 create-security-group \
  --group-name odontosoft-sg \
  --description "Security group para OdontoSoft" \
  --query 'GroupId' \
  --output text)

# Abrir puertos
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 3000 --cidr 0.0.0.0/0

# Lanzar instancia EC2 (Amazon Linux 2023)
INSTANCE_ID=$(aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \
  --instance-type t3.small \
  --key-name odontosoft-key \
  --security-group-ids $SG_ID \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=odontosoft-server}]' \
  --query 'Instances[0].InstanceId' \
  --output text)

echo "Instancia creada: $INSTANCE_ID"

# Obtener IP pública
EC2_IP=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text)

echo "IP pública: $EC2_IP"

```

#### Conectarse e instalar Docker en EC2:

```bash
# Conectarse a la instancia
ssh -i odontosoft-key.pem ec2-user@$EC2_IP

# --- Dentro de la instancia EC2 ---

# Actualizar e instalar Docker
sudo yum update -y
sudo yum install -y docker git
sudo service docker start
sudo usermod -a -G docker ec2-user

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

# Instalar AWS CLI
sudo yum install -y awscli

# Cerrar sesión para aplicar grupos
exit

```

#### Desplegar la aplicación en EC2:

```bash
# Volver a conectar
ssh -i odontosoft-key.pem ec2-user@$EC2_IP

# Configurar AWS CLI en EC2 (o usar IAM Role en producción)
aws configure

# Autenticar Docker con ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Clonar el repositorio
git clone https://github.com/TU_USUARIO/odontosoft.git
cd odontosoft

# Crear archivo .env de producción
cat > .env << EOF
JWT_SECRET=tu_secreto_muy_seguro_en_produccion
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/odontosoft
EOF

# Modificar docker-compose para usar imágenes de ECR
# (editar docker-compose.yml para usar las URLs de ECR)

# Levantar servicios
docker-compose up -d

# Verificar
docker-compose ps
curl http://localhost:3000/api/health
```
#### Despliegue con ECS (opción más escalable)

```bash
# Crear cluster ECS
aws ecs create-cluster --cluster-name odontosoft-cluster

# Crear Task Definition (guardar como task-definition.json)
cat > task-definition.json << 'EOF'
{
  "family": "odontosoft",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "odontosoft-backend",
      "image": "ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/odontosoft/backend:latest",
      "portMappings": [{ "containerPort": 3000, "protocol": "tcp" }],
      "environment": [
        { "name": "NODE_ENV", "value": "production" },
        { "name": "PORT", "value": "3000" },
        { "name": "MONGODB_URI", "value": "TU_MONGO_ATLAS_URI" },
        { "name": "JWT_SECRET", "value": "TU_JWT_SECRET" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/odontosoft",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
EOF

# Registrar task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Crear servicio ECS
aws ecs create-service \
  --cluster odontosoft-cluster \
  --service-name odontosoft-service \
  --task-definition odontosoft \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-XXXXX],securityGroups=[sg-XXXXX],assignPublicIp=ENABLED}"

```

#### Variables de entorno seguras con AWS Secrets Manager

```bash
# Crear secret
aws secretsmanager create-secret \
  --name odontosoft/production \
  --description "Variables de entorno de producción" \
  --secret-string '{
    "JWT_SECRET": "tu_secreto_muy_seguro",
    "MONGODB_URI": "mongodb+srv://..."
  }'

# Recuperar secreto
aws secretsmanager get-secret-value \
  --secret-id odontosoft/production \
  --query SecretString \
  --output text
```


<span style="color: orange; font-weight: bold;">

## 🌳 FLUJO DE GIT
</span>

### Estrategia de ramas basada en Git Flow simplificado

---

¿Qué es una rama y por qué se usa?

Una rama es una **copia paralela e independiente del proyecto** donde puedes desarrollar, experimentar y corregir sin afectar el código que está funcionando en producción.

La analogía más clara es la siguiente: imagina que el proyecto es un documento oficial. Antes de hacerle cambios, sacas una fotocopia y trabajas sobre ella. Si los cambios quedan bien, los incorporas al original. Si algo sale mal, simplemente descartas la fotocopia y el documento oficial nunca se vio afectado.

Este enfoque evita uno de los errores más comunes en equipos de desarrollo: **subir código roto directamente a producción**.

---

### Estructura de ramas

El proyecto OdontoSoft maneja tres niveles de ramas:

```
main          →  Producción. Lo que el cliente usa en vivo.
develop       →  Integración. Donde se une y prueba el trabajo del equipo.
feat/nombre   →  Desarrollo. Donde cada funcionalidad se construye de forma aislada.
```

### `main` — Rama de producción

Es la rama más importante y la más protegida. Contiene únicamente el código que ha sido probado, revisado y aprobado. **Nunca se trabaja directamente sobre ella.** Solo recibe código desde `develop` cuando una versión está completamente lista para salir a producción.

### `develop` — Rama de integración

Es el punto de encuentro del equipo. Aquí se van uniendo todas las funcionalidades terminadas antes de pasar a producción. Puede considerarse como el "borrador final" del proyecto. Es la rama desde la cual cada desarrollador parte para crear sus propias ramas de trabajo.

### `feat/nombre` — Ramas de funcionalidad

Son ramas temporales que se crean para desarrollar una funcionalidad específica de forma aislada. Una vez que la funcionalidad está terminada y probada, se une a `develop` y la rama se puede eliminar. El nombre siempre describe claramente qué se está construyendo.

**Ejemplos en OdontoSoft:**

```
feat/auth           →  Sistema de login y autenticación JWT
feat/pacientes      →  CRUD completo de pacientes
feat/citas          →  CRUD completo de citas
feat/historial      →  Módulo de historial clínico
feat/reportes       →  Módulo de reportes y estadísticas
```

---

### Flujo de trabajo paso a paso

#### Paso 1 — Asegurarse de partir desde develop actualizado

Antes de crear una nueva rama, siempre hay que asegurarse de tener la versión más reciente de `develop` para no trabajar sobre código desactualizado.

```bash
git checkout develop
git pull origin develop
```

---

#### Paso 2 — Crear la rama de la nueva funcionalidad

```bash
git checkout -b feat/pacientes
```

El flag `-b` crea la rama y cambia a ella en un solo comando. A partir de este momento, todo lo que se haga solo afecta a esta rama y no toca ni `develop` ni `main`.

---

#### Paso 3 — Desarrollar y guardar avances con commits

Mientras se trabaja en la funcionalidad, se van haciendo commits que funcionan como **puntos de guardado**. Cada commit debe representar un avance concreto y su mensaje debe describir claramente qué se hizo.

```bash
# Después de crear el modelo
git add .
git commit -m "feat: agregar modelo de Paciente con historial clínico"

# Después de crear el controlador
git add .
git commit -m "feat: agregar controlador CRUD completo de pacientes"

# Después de crear las rutas
git add .
git commit -m "feat: agregar rutas protegidas de pacientes"

# Después de crear la vista
git add .
git commit -m "feat: agregar página de pacientes con Materialize CSS"
```

Se pueden hacer tantos commits como sean necesarios. Lo importante es que cada uno sea descriptivo y atómico, es decir, que represente un cambio puntual y no una mezcla de cosas distintas.

---

#### Paso 4 — Subir la rama al repositorio remoto

```bash
git push origin feat/pacientes
```

Esto sube la rama a GitHub, donde queda visible para el resto del equipo y sirve como respaldo en caso de que algo le pase al equipo local.

---

#### Paso 5 — Unir la funcionalidad terminada a develop

Una vez que la funcionalidad está completa y probada localmente, se une a `develop`:

```bash
git checkout develop
git merge feat/pacientes
git push origin develop
```

---

#### Paso 6 — Eliminar la rama de feature (opcional pero recomendado)

Las ramas de feature son temporales. Una vez unidas a `develop`, ya cumplieron su propósito y se pueden eliminar para mantener el repositorio limpio.

```bash
# Eliminar la rama localmente
git branch -d feat/pacientes

# Eliminar la rama del repositorio remoto en GitHub
git push origin --delete feat/pacientes
```

---

#### Paso 7 — Pasar a producción (merge de develop a main)

Este paso solo se hace cuando una versión completa está lista para salir al cliente. No se hace después de cada feature, sino cuando se acumula un conjunto de funcionalidades probadas y estables.

```bash
git checkout main
git merge develop
git push origin main
```

---

### Representación visual del flujo

```
main     ──────────────────────────────────────────────────●  v1.0
                                                           ↑
                                                     merge a main
                                                           │
develop  ────────────●───────────●───────────●────────────●
                     ↑           ↑           ↑
               merge auth  merge pacs   merge citas
                     │           │           │
feat/auth    ────────●           │           │
                                 │           │
feat/pacientes ──────────────────●           │
                                             │
feat/citas   ────────────────────────────────●
```

Cada `●` es un merge, el momento en que el trabajo de una rama se incorpora a la siguiente.

---

### Convención de nombres para los commits

Para mantener un historial de cambios limpio, ordenado y fácil de leer, OdontoSoft sigue el estándar **Conventional Commits**. El formato es el siguiente:

```
tipo: descripción corta en minúsculas
```

| Tipo | Cuándo usarlo |
|---|---|
| `feat` | Se agrega una nueva funcionalidad |
| `fix` | Se corrige un error o bug |
| `docs` | Se modifica documentación |
| `style` | Cambios de formato, espacios o estilos sin afectar lógica |
| `refactor` | Se reestructura código sin cambiar su comportamiento |
| `chore` | Tareas de mantenimiento, configuración o dependencias |

**Ejemplos aplicados al proyecto:**

```bash
git commit -m "feat: agregar autenticación JWT con roles de usuario"
git commit -m "fix: corregir validación de cédula duplicada en pacientes"
git commit -m "docs: agregar documentación del flujo de Git"
git commit -m "chore: actualizar dependencias de Express y Mongoose"
git commit -m "style: aplicar formato consistente en controladores"
git commit -m "refactor: separar lógica de generación de token en función auxiliar"
```

---

### Historial de commits del proyecto OdontoSoft

A continuación se muestra el historial de commits que refleja el desarrollo completo del proyecto siguiendo este flujo:

```
● feat: agregar página de citas con filtros y modal  ← feat/citas
● feat: agregar rutas protegidas de citas
● feat: agregar controlador CRUD de citas
● feat: agregar modelo de Cita vinculado a Paciente
● feat: agregar página de pacientes con Materialize  ← feat/pacientes
● feat: agregar rutas protegidas de pacientes
● feat: agregar controlador CRUD de pacientes
● feat: agregar modelo de Paciente con historial clínico
● feat: agregar middleware de autorización por roles  ← feat/auth
● feat: agregar autenticación JWT y controlador de auth
● feat: agregar modelo de Usuario con encriptación
● chore: instalar dependencias y configurar package.json
● feat: estructura inicial del proyecto OdontoSoft   ← commit inicial
```

---

### Resumen rápido de comandos

```bash
# Ver en qué rama estás
git branch

# Ver todas las ramas incluyendo las remotas
git branch -a

# Crear y cambiar a una nueva rama
git checkout -b feat/nombre

# Cambiar entre ramas existentes
git checkout develop

# Ver el estado de los archivos modificados
git status

# Agregar todos los cambios al siguiente commit
git add .

# Guardar un commit
git commit -m "tipo: descripción"

# Subir cambios al repositorio remoto
git push origin nombre-de-la-rama

# Traer los últimos cambios del repositorio remoto
git pull origin develop

# Unir una rama a la rama actual
git merge feat/nombre

# Ver el historial de commits
git log --oneline
```

---



## 🔒 SEGURIDAD — CHECKLIST ANTES DE PRODUCCIÓN




- [x] `.env` está en `.gitignore` y **NUNCA** subido a GitHub
- [x] `JWT_SECRET` es aleatorio y tiene más de 32 caracteres
- [x] MongoDB Atlas tiene **IP whitelisting** configurado
- [x] Security Groups de EC2 limitan acceso solo a puertos necesarios
- [x] Usar **HTTPS** (agregar certificado SSL con AWS Certificate Manager)
- [x] Deshabilitar `morgan` en producción o enviar logs a **CloudWatch**
- [x] Implementar **rate limiting** (`express-rate-limit`)
- [x] Revisar y actualizar dependencias regularmente con `npm audit`



## 📊 ENDPOINTS DE LA API — REFERENCIA RÁPIDA




| Método | Endpoint             | Auth | Descripción            |
|--------|--------------------|------|-----------------------|
| GET    | /api/health         | No   | Estado de la API      |
| POST   | /api/auth/registrar | No   | Registrar usuario     |
| POST   | /api/auth/login     | No   | Login                 |
| GET    | /api/auth/perfil    | JWT  | Perfil del usuario    |
| GET    | /api/pacientes      | JWT  | Listar pacientes      |
| POST   | /api/pacientes      | JWT  | Crear paciente        |
| GET    | /api/pacientes/:id  | JWT  | Ver paciente          |
| PUT    | /api/pacientes/:id  | JWT  | Actualizar paciente   |
| DELETE | /api/pacientes/:id  | JWT  | Desactivar paciente   |
| GET    | /api/citas          | JWT  | Listar citas          |
| POST   | /api/citas          | JWT  | Crear cita            |
| GET    | /api/citas/:id      | JWT  | Ver cita              |
| PUT    | /api/citas/:id      | JWT  | Actualizar cita       |
| DELETE | /api/citas/:id      | JWT  | Eliminar cita         |


