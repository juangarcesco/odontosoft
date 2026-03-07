# 🦷 OdontoSoft v1.1

Sistema de gestión para clínicas odontológicas. Administra pacientes, citas, historial clínico y usuarios mediante una API REST segura.

---

## 📌 Descripción

OdontoSoft digitaliza la gestión de consultorios odontológicos:

- 👨‍⚕️ Gestión de pacientes (CRUD + soft delete)
- 📅 Administración de citas (con detección de conflictos de horario)
- 📋 Historial clínico por paciente (piezas dentales, medicamentos, diagnósticos)
- 🔐 Autenticación JWT con roles (admin, dentista, recepcionista)
- 🗂 Control de acceso por rol en cada endpoint

---

## 🚀 Tecnologías

**Backend:** Node.js · Express · MongoDB · JWT · bcrypt · Helmet · express-rate-limit

**Frontend:** HTML5 · CSS3 · Vanilla JS · Materialize CSS

**DevOps:** Docker · Docker Compose

---

## 📂 Estructura

```
odontosoft/
├── backend/
│   └── src/
│       ├── config/        # Conexión MongoDB
│       ├── controllers/   # authController, pacienteController, citaController, historialController
│       ├── middlewares/   # authMiddleware (proteger + autorizar)
│       ├── models/        # Usuario, Paciente, Cita, HistorialClinico
│       └── routes/        # authRoutes, pacienteRoutes, citaRoutes, historialRoutes
├── frontend/
│   ├── css/app.css
│   ├── js/config.js
│   ├── index.html         # Login
│   └── pages/
│       ├── pacientes.html
│       ├── citas.html
│       └── historial.html  ← NUEVO
├── docker/
├── docker-compose.yml
└── .env.example
```

---

## ⚙️ Instalación

### 1. Clonar y configurar variables de entorno

```bash
git clone https://github.com/TU_USUARIO/odontosoft.git
cd odontosoft
cp .env.example backend/.env
# Edita backend/.env con tus valores reales
```

### 2. Instalar dependencias

```bash
cd backend && npm install
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

### 4. Con Docker

```bash
JWT_SECRET=tu_clave_segura docker compose up --build
```

---

## 📡 Endpoints

| Método | Endpoint                            | Roles permitidos        |
|--------|-------------------------------------|-------------------------|
| GET    | /api/health                         | Público                 |
| POST   | /api/auth/registrar                 | Público                 |
| POST   | /api/auth/login                     | Público                 |
| GET    | /api/auth/perfil                    | Autenticado             |
| GET    | /api/pacientes                      | Todos                   |
| POST   | /api/pacientes                      | Admin, Dentista, Recep. |
| PUT    | /api/pacientes/:id                  | Admin, Dentista, Recep. |
| DELETE | /api/pacientes/:id                  | Admin únicamente        |
| GET    | /api/citas                          | Todos                   |
| POST   | /api/citas                          | Admin, Dentista, Recep. |
| DELETE | /api/citas/:id                      | Admin, Recepcionista    |
| GET    | /api/historial/paciente/:pacienteId | Todos                   |
| POST   | /api/historial                      | Admin, Dentista         |
| PUT    | /api/historial/:id                  | Admin, Dentista         |
| DELETE | /api/historial/:id                  | Admin                   |

---

## 🔐 Autenticación

```
Authorization: Bearer <TOKEN>
```

**Rate limiting:** 20 intentos de login por IP cada 15 minutos. 200 req/15min en general.

---

## 🐳 Docker

```bash
# Construir y levantar todo
JWT_SECRET=tu_clave_segura docker compose up --build -d

# Ver logs
docker compose logs -f backend
```

---

## 📈 Estado

- ✅ Autenticación JWT + roles
- ✅ CRUD pacientes con paginación
- ✅ Gestión de citas (soft delete, detección de conflictos, campo dentista)
- ✅ Historial clínico completo
- ✅ Seguridad: Helmet, CORS por env, rate limiting

---

## 👨‍💻 Autor

**Juan Garcés** — Desarrollador Backend

## 📄 Licencia

MIT License
