# OdontoSoft — Manual de Desarrollo

> Sistema de gestión odontológica · Node.js + Express + MongoDB Atlas + Docker

---

## Índice

1. [Stack tecnológico](#1-stack-tecnológico)
2. [Estructura del proyecto](#2-estructura-del-proyecto)
3. [Configuración inicial](#3-configuración-inicial)
4. [Backend — API REST](#4-backend--api-rest)
5. [Base de datos — MongoDB Atlas](#5-base-de-datos--mongodb-atlas)
6. [Frontend](#6-frontend)
7. [Correcciones y mejoras realizadas](#7-correcciones-y-mejoras-realizadas)
8. [Docker](#8-docker)
9. [Docker Hub](#9-docker-hub)
10. [Flujo de Git](#10-flujo-de-git)
11. [Endpoints de la API](#11-endpoints-de-la-api)
12. [Seguridad — Checklist de producción](#12-seguridad--checklist-de-producción)

---

## 1. Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Runtime | Node.js | v20+ |
| Framework | Express | 4.18 |
| Base de datos | MongoDB Atlas | Cloud |
| ODM | Mongoose | 7.3 |
| Autenticación | JWT (jsonwebtoken) | 9.0 |
| Encriptación | bcryptjs | — |
| Seguridad HTTP | helmet, cors, express-rate-limit | — |
| Frontend | HTML + CSS + Materialize CSS | 1.0 |
| Servidor estático | nginx (Alpine) | — |
| Contenedores | Docker + Docker Compose | — |
| Registro de imágenes | Docker Hub | — |
| Control de versiones | Git + GitHub | — |

---

## 2. Estructura del proyecto

```
odontosoft/
├── .env                          # Variables de entorno para docker-compose (claves, puertos, DB_URI)
├── .env.example                  # Plantilla de referencia para que otros desarrolladores configuren su .env
├── .gitignore                    # Define qué archivos y carpetas (como node_modules) no se subirán a Git
├── docker-compose.yml            # Configuración para levantar backend, frontend y base de datos simultáneamente
├── README.md                     # Documentación general, guía de instalación y descripción del proyecto
│
├── backend/                      # --- Lógica del servidor y API REST ---
│   ├── .dockerignore             # Archivos excluidos de la imagen de Docker del backend
│   ├── .env                      # Variables de entorno locales para el desarrollo del servidor
│   ├── Dockerfile                # Instrucciones para construir la imagen de Docker del backend
│   ├── package.json              # Listado de dependencias (Express, Mongoose, JWT) y scripts de ejecución
│   ├── package-lock.json         # Registro exacto de las versiones de las dependencias instaladas
│   ├── server.js                 # Punto de entrada principal; levanta el servidor y escucha las peticiones
│   └── src/                      # Código fuente organizado bajo el patrón MVC
│       ├── app.js                # Configuración de Express, Middlewares globales y prefijos de rutas
│       ├── config/               # Configuraciones externas
│       │   ├── database.js       # Lógica de conexión a la base de datos MongoDB
│       │   └── seed.js           # Script para poblar la base de datos con un usuario administrador inicial
│       ├── controllers/          # Lógica de negocio; procesa peticiones y envía respuestas
│       │   ├── authController.js # Maneja el registro, login y generación de tokens
│       │   ├── citaController.js # Gestión de creación, edición y cancelación de citas
│       │   ├── dentistaController.js # CRUD y gestión de datos de los odontólogos
│       │   ├── historialController.js # Administración de las historias clínicas de pacientes
│       │   └── pacienteController.js # Registro y consulta de información de pacientes
│       ├── middlewares/          # Funciones intermedias
│       │   └── authMiddleware.js # Verifica el token JWT y los permisos de rol (proteger/autorizar)
│       ├── models/               # Esquemas de datos (Mongoose) que definen la estructura en la DB
│       │   ├── Cita.js           # Estructura de las citas (fecha, hora, id_paciente, id_dentista)
│       │   ├── Dentista.js       # Datos profesionales y especialidad del odontólogo
│       │   ├── HistorialClinico.js # Registro cronológico de tratamientos y observaciones
│       │   ├── Paciente.js       # Información personal y de contacto del paciente
│       │   └── Usuario.js        # Credenciales de acceso y roles (Admin, Recepción, etc.)
│       └── routes/               # Definición de los endpoints (URLs) de la API
│           ├── authRoutes.js     # Rutas de /api/auth
│           ├── citaRoutes.js     # Rutas de /api/citas
│           ├── dentistaRoutes.js # Rutas de /api/dentistas
│           ├── historialRoutes.js # Rutas de /api/historial
│           └── pacienteRoutes.js # Rutas de /api/pacientes
│
├── docs/                         # --- Documentación técnica ---
│   └── manual-desarrollo.md      # Guía detallada sobre la arquitectura y flujo del sistema
│
└── frontend/                     # --- Interfaz de usuario (Vanilla JS + Materialize) ---
    ├── .dockerignore             # Archivos excluidos de la imagen de Docker del frontend
    ├── Dockerfile                # Instrucciones para servir el frontend (usualmente con Nginx)
    ├── nginx.conf                # Configuración del servidor web y redirección de llamadas a la API
    ├── index.html                # Página principal y formulario de acceso (Login)
    ├── css/
    │   └── app.css               # Estilos personalizados y ajustes sobre Materialize
    ├── js/
    │   └── config.js             # Variables globales (API_URL) y funciones de ayuda para fetch/auth
    └── pages/                    # Vistas específicas del sistema
        ├── citas.html            # Interfaz para gestionar la agenda
        ├── dentistas.html        # Vista para el directorio de doctores
        ├── historial.html        # Consulta de fichas médicas
        └── pacientes.html        # Gestión de la base de datos de pacientes
```

---

## 3. Configuración inicial

### Prerrequisitos

| Herramienta | Descarga | Para qué sirve |
|---|---|---|
| Node.js v20+ | https://nodejs.org | Ejecutar el backend |
| Git | https://git-scm.com | Control de versiones |
| Docker Desktop | https://docker.com | Contenedores |
| VSCode | https://code.visualstudio.com | Editor de código |

### Clonar y arrancar

```bash
git clone https://github.com/juangarcesco/odontosoft.git
cd odontosoft
cd backend
npm install
```

### Archivo `.env` (desarrollo local)

Copiar y completar en `backend/.env`:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/odontosoft?...
JWT_SECRET=clave_larga_y_segura
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:8080
ADMIN_NOMBRE=Administrador
ADMIN_EMAIL=admin@odontosoft.com
ADMIN_PASSWORD=Admin1234*
```

### Correr en desarrollo

```bash
cd backend
npm run dev
```

El servidor levanta en `http://localhost:3000`.
Al arrancar por primera vez, el seed crea automáticamente el usuario admin.

---

## 4. Backend — API REST

### Modelos de datos

#### Paciente
Ficha clínica del paciente. Campos: `nombre`, `apellido`, `cedula` (único), `fechaNacimiento`, `telefono`, `email`, `direccion`, `historialClinico` (alergias, enfermedades, medicamentos), `activo` (soft delete).

#### Cita
Agenda de consultas. Campos: `paciente` (ref), `dentista` (ref), `fecha`, `duracionMinutos`, `motivo`, `tratamiento`, `estado` (`programada` | `completada` | `cancelada` | `no_asistio`), `costo`, `notas`, `activo`.

Incluye detección de conflicto de horario al crear: si el mismo paciente ya tiene una cita activa en ese rango, devuelve `409`.

#### Dentista
Profesionales de la clínica. Campos: `nombre`, `apellido`, `cedula` (único), `especialidad`, `telefono`, `email`, `horario`, `activo`.

#### HistorialClinico
Entradas clínicas por paciente. Campos: `paciente` (ref), `cita` (ref), `fecha`, `dentista`, `motivoConsulta`, `diagnostico`, `tratamientoRealizado`, `piezasDentales` (numeración FDI), `medicamentos`, `proximaCita`, `observaciones`, `archivos`.

#### Usuario
Usuarios del sistema. Roles: `admin` | `dentista` | `recepcionista`. La contraseña se hashea con bcrypt (factor 12) antes de guardar.

### Autenticación y autorización

Todas las rutas excepto `/api/health`, `/api/auth/login` y `/api/auth/registrar` requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

El middleware `proteger` valida el token. El middleware `autorizar(...roles)` restringe por rol.

### Seguridad configurada

- `helmet` — headers HTTP seguros
- `cors` — orígenes permitidos configurables
- Rate limit global: 200 req / 15 min
- Rate limit en `/api/auth`: 20 req / 15 min
- Body limit: 10kb
- Soft delete en todos los modelos (campo `activo`)

---

## 5. Base de datos — MongoDB Atlas

### Conexión configurada

El proyecto usa MongoDB Atlas en la nube. La cadena de conexión está en `backend/.env` y en el `.env` raíz para Docker.

**Formato del connection string:**
```
mongodb://usuario:password@shard-00-00.cluster.mongodb.net:27017,.../odontosoft?ssl=true&replicaSet=...&authSource=admin
```

### Whitelist de IP en Atlas

Para que Atlas acepte conexiones:

1. Ir a **MongoDB Atlas → Network Access → Add IP Address**
2. En desarrollo: agregar `0.0.0.0/0` (cualquier IP)
3. En producción: agregar solo la IP del servidor

### Seed automático

Al arrancar, `seed.js` verifica si existe el usuario admin. Si no existe, lo crea con las credenciales definidas en `.env`. Si ya existe, omite el seed sin error.

---

## 6. Frontend

### Arquitectura

HTML estático servido por nginx. La comunicación con el backend se hace vía `fetch` usando el helper `fetchAPI` en `js/config.js`.

### `js/config.js` — Funciones globales

| Función | Descripción |
|---|---|
| `getToken()` | Lee el JWT de localStorage |
| `getUsuario()` | Lee el objeto usuario de localStorage |
| `verificarAuth()` | Redirige a login si no hay token |
| `cerrarSesion()` | Limpia localStorage y redirige al login |
| `fetchAPI(endpoint, options)` | Wrapper de fetch con JWT automático |
| `formatFecha(isoDate, conHora)` | Formatea fechas en español (es-CO) |

**API_URL en producción (Docker):** `/api` (relativa, enrutada por nginx al backend)

**API_URL en desarrollo local:** `http://localhost:3000/api`

### Módulos del sistema

| Página | Ruta | Funcionalidad |
|---|---|---|
| Login | `index.html` | Autenticación con JWT |
| Pacientes | `pages/pacientes.html` | CRUD + búsqueda + paginación |
| Citas | `pages/citas.html` | CRUD + filtros por fecha, estado y paciente |
| Dentistas | `pages/dentistas.html` | CRUD + búsqueda |
| Historial Clínico | `pages/historial.html` | Entradas clínicas por paciente |

---

## 7. Correcciones y mejoras realizadas

### Bug 1 — `citaController.js`: doble populate en `crearCita`

**Problema:** La línea original encadenaba `.populate()` sobre un documento ya instanciado y además llamaba al populate de dentista dos veces, lo que genera un error en Mongoose 7+.

```javascript
// ❌ ANTES — incorrecto
await cita.populate('paciente', 'nombre apellido').populate('dentista', 'nombre apellido');
await cita.populate('dentista', 'nombre apellido'); // duplicado
```

```javascript
// ✅ DESPUÉS — correcto
await cita.populate('paciente', 'nombre apellido');
await cita.populate('dentista', 'nombre apellido');
```

---

### Bug 2 — `database.js`: faltaba newline al final del archivo

**Problema:** El archivo no tenía salto de línea al final, lo que puede causar problemas de parseo en algunos entornos Unix.

**Solución:** Se agregó el `\n` al final del archivo.

---

### Bug 3 — `.env`: archivo inexistente

**Problema:** El archivo `backend/.env` no existía. El servidor no podía arrancar porque `dotenv` no encontraba las variables de entorno.

**Solución:** Se creó `backend/.env` a partir de `.env.example` con los valores correctos incluyendo la cadena de conexión a MongoDB Atlas.

---

### Mejora 1 — `citas.html`: filtro de paciente no funcionaba

**Problema:** El filtro de búsqueda de paciente solo filtraba la tabla cuando había exactamente 1 coincidencia en el select del formulario. Mezclaba el buscador de la tabla con el `<select>` de nueva cita.

**Solución:** Las citas se cargan completas en memoria (`todasLasCitas`). La función `aplicarFiltros()` filtra client-side por nombre y cédula del paciente, sin depender de la API ni del select del formulario.

```javascript
// Nueva arquitectura del filtro
let todasLasCitas = [];

async function cargarCitas() {
  const data = await fetchAPI(`/citas${params}`);
  todasLasCitas = data.data || [];
  aplicarFiltros(); // filtra sobre los datos en memoria
}

function aplicarFiltros() {
  const texto = document.getElementById('filtro-paciente-texto').value.toLowerCase();
  const filtradas = todasLasCitas.filter(cita => {
    const nombre = `${cita.paciente.nombre} ${cita.paciente.apellido}`.toLowerCase();
    const cedula = (cita.paciente.cedula || '').toLowerCase();
    return nombre.includes(texto) || cedula.includes(texto);
  });
  renderizarCitas(filtradas);
}
```

---

### Mejora 2 — `historial.html`: campo dentista cambiado a select

**Problema:** El campo dentista en el modal de nueva entrada clínica era un `<input type="text">` libre. El usuario tenía que escribir el nombre manualmente.

**Solución:** Se reemplazó por un `<select>` que carga los dentistas desde `/api/dentistas` al abrir la página.

```javascript
async function cargarSelectDentistas() {
  const data = await fetchAPI('/dentistas');
  const select = document.getElementById('e-dentista');
  (data.data || []).forEach(d => {
    const opt = document.createElement('option');
    opt.value = `Dr(a). ${d.nombre} ${d.apellido}`;
    opt.textContent = `Dr(a). ${d.nombre} ${d.apellido}${d.especialidad ? ' — ' + d.especialidad : ''}`;
    select.appendChild(opt);
  });
}
```

---

## 8. Docker

### Arquitectura de contenedores

```
┌─────────────────────────────────────────┐
│           docker-compose.yml            │
│                                         │
│  ┌──────────────┐   ┌────────────────┐  │
│  │   frontend   │   │    backend     │  │
│  │  nginx:alpine│──▶│  node:20-alpine│  │
│  │  puerto 8080 │   │  puerto 3000   │  │
│  └──────────────┘   └───────┬────────┘  │
│                             │           │
│                             ▼           │
│                      MongoDB Atlas      │
│                       (nube externa)    │
└─────────────────────────────────────────┘
```

### Proxy nginx — clave para que funcione Docker

El frontend tiene `API_URL = '/api'` (ruta relativa). nginx enruta esas peticiones al contenedor del backend:

```nginx
# frontend/nginx.conf
location /api/ {
    proxy_pass http://backend:3000/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

Esto es esencial porque dentro de Docker, `localhost` en el contenedor nginx no es el backend. Se usa el nombre del servicio `backend` definido en `docker-compose.yml`.

### `.env` raíz vs `.env` de backend

| Archivo | Quién lo lee | Cuándo se usa |
|---|---|---|
| `odontosoft/.env` | `docker-compose` | Al correr `docker-compose up` |
| `odontosoft/backend/.env` | Node.js / `dotenv` | Al correr `npm run dev` |

Ambos están en `.gitignore` y **nunca se suben a GitHub**.

### Levantar con Docker

```bash
cd odontosoft
docker-compose up --build
```

| Servicio | URL |
|---|---|
| Frontend | http://localhost:8080 |
| Backend (API) | http://localhost:3000 |
| Health check | http://localhost:3000/api/health |

### Comandos Docker útiles

```bash
# Ver contenedores corriendo
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend

# Detener sin borrar datos
docker-compose down

# Reconstruir después de cambios en el código
docker-compose up --build
```

### Archivos Docker del proyecto

| Archivo | Ubicación | Función |
|---|---|---|
| `docker-compose.yml` | Raíz | Orquesta los dos contenedores |
| `Dockerfile` | `backend/` | Imagen del servidor Node.js |
| `Dockerfile` | `frontend/` | Imagen del servidor nginx |
| `nginx.conf` | `frontend/` | Configuración nginx con proxy /api |
| `.dockerignore` | `backend/` | Excluye node_modules y .env del build |
| `.dockerignore` | `frontend/` | Excluye archivos innecesarios del build |

---

## 9. Docker Hub

### Imágenes publicadas

```
juangarcesco/odontosoft-backend:latest
juangarcesco/odontosoft-frontend:latest
```

### Flujo para publicar una nueva versión

```bash
# 1. Iniciar sesión en Docker Hub
docker login -u juangarcesco

# 2. Construir imágenes
docker build -t juangarcesco/odontosoft-backend:latest ./backend
docker build -t juangarcesco/odontosoft-frontend:latest ./frontend

# 3. Subir a Docker Hub
docker push juangarcesco/odontosoft-backend:latest
docker push juangarcesco/odontosoft-frontend:latest
```

---

## 10. Flujo de Git

### Estrategia de ramas

```
main      →  Producción. Código estable que el cliente usa.
develop   →  Integración. Donde se une el trabajo del equipo.
feat/xxx  →  Desarrollo aislado de cada funcionalidad.
```

### Flujo paso a paso

```bash
# 1. Partir siempre desde develop actualizado
git checkout develop
git pull origin develop

# 2. Crear rama de la funcionalidad
git checkout -b feat/nombre-funcionalidad

# 3. Desarrollar y hacer commits descriptivos
git add .
git commit -m "feat: descripción clara del cambio"

# 4. Subir la rama al repositorio
git push origin feat/nombre-funcionalidad

# 5. Unir a develop cuando está lista
git checkout develop
git merge feat/nombre-funcionalidad
git push origin develop

# 6. Pasar a producción (solo versiones completas)
git checkout main
git merge develop
git push origin main
```

### Convención de commits (Conventional Commits)

| Tipo | Cuándo usarlo |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Cambios de formato sin afectar lógica |
| `refactor` | Reestructura sin cambiar comportamiento |
| `chore` | Mantenimiento, dependencias, configuración |
| `docker` | Cambios en archivos Docker |

**Ejemplos del proyecto:**

```bash
git commit -m "feat: estructura inicial del proyecto OdontoSoft"
git commit -m "feat(backend): implementar API REST con auth JWT, pacientes y citas"
git commit -m "feat(frontend): agregar login y gestión de pacientes con Materialize CSS"
git commit -m "fix: corregir filtro paciente en citas, dentista select en historial y bug populate citaController"
git commit -m "docker: configurar proxy nginx y API_URL relativa para contenedores"
```

### Historial de commits del proyecto

```
● docker: configurar proxy nginx y API_URL relativa para contenedores
● fix: corregir filtro paciente en citas, dentista select en historial y bug populate citaController
● feat(frontend): agregar módulos de dentistas e historial clínico
● feat(frontend): agregar login y gestión de pacientes con Materialize CSS
● feat(backend): implementar API REST completa con auth JWT, pacientes y citas
● feat: estructura inicial del proyecto OdontoSoft
```

---

## 11. Endpoints de la API

Base URL en desarrollo: `http://localhost:3000/api`
Base URL en Docker: `http://localhost:3000/api`

### Autenticación

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| POST | `/auth/registrar` | No | Registrar nuevo usuario |
| POST | `/auth/login` | No | Login — devuelve JWT |
| GET | `/auth/perfil` | JWT | Ver perfil del usuario autenticado |

### Pacientes

| Método | Endpoint | Roles | Descripción |
|---|---|---|---|
| GET | `/pacientes` | Todos | Listar (paginación + búsqueda) |
| POST | `/pacientes` | admin, recepcionista, dentista | Crear paciente |
| GET | `/pacientes/:id` | Todos | Ver paciente |
| PUT | `/pacientes/:id` | admin, recepcionista, dentista | Actualizar |
| DELETE | `/pacientes/:id` | admin | Soft delete |

**Query params en GET /pacientes:** `page`, `limit`, `search`

### Citas

| Método | Endpoint | Roles | Descripción |
|---|---|---|---|
| GET | `/citas` | Todos | Listar citas activas |
| POST | `/citas` | admin, recepcionista, dentista | Crear (detecta conflicto) |
| GET | `/citas/:id` | Todos | Ver cita |
| PUT | `/citas/:id` | admin, recepcionista, dentista | Actualizar |
| DELETE | `/citas/:id` | admin, recepcionista | Soft delete |

**Query params en GET /citas:** `fecha` (YYYY-MM-DD), `estado`, `paciente` (ObjectId)

### Dentistas

| Método | Endpoint | Roles | Descripción |
|---|---|---|---|
| GET | `/dentistas` | Todos | Listar (búsqueda) |
| POST | `/dentistas` | admin | Crear dentista |
| GET | `/dentistas/:id` | Todos | Ver dentista |
| PUT | `/dentistas/:id` | admin | Actualizar |
| DELETE | `/dentistas/:id` | admin | Soft delete |

### Historial Clínico

| Método | Endpoint | Roles | Descripción |
|---|---|---|---|
| GET | `/historial/paciente/:pacienteId` | Todos | Historial completo de un paciente |
| POST | `/historial` | admin, dentista | Crear entrada |
| GET | `/historial/:id` | Todos | Ver entrada |
| PUT | `/historial/:id` | admin, dentista | Actualizar |
| DELETE | `/historial/:id` | admin | Soft delete |

### Health Check

```
GET /api/health  →  No requiere auth
```

---

## 12. Seguridad — Checklist de producción

- [x] `.env` en `.gitignore` — nunca subido a GitHub
- [x] `JWT_SECRET` largo y aleatorio (mínimo 32 caracteres)
- [x] MongoDB Atlas con IP whitelist configurado
- [x] Rate limiting activo en todas las rutas
- [x] Helmet configurado con headers HTTP seguros
- [x] CORS restringido a orígenes permitidos en producción
- [x] Soft delete en todos los modelos (datos nunca se borran físicamente)
- [x] Contraseñas hasheadas con bcrypt factor 12
- [x] Roles y autorización por endpoint
- [ ] HTTPS activo (agregar certificado SSL)
- [ ] Rotar credenciales admin después del primer login
- [ ] Ejecutar `npm audit` regularmente para revisar vulnerabilidades
