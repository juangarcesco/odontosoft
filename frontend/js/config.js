const API_URL = 'http://localhost:3000/api';

const getToken   = () => localStorage.getItem('os_token');
const getUsuario = () => JSON.parse(localStorage.getItem('os_usuario') || '{}');

const cerrarSesion = () => {
  localStorage.removeItem('os_token');
  localStorage.removeItem('os_usuario');
  window.location.href = '/index.html';
};

const verificarAuth = () => {
  if (!getToken()) {
    window.location.href = '/index.html';
    return false;
  }
  return true;
};

const fetchAPI = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
        ...(options.headers || {}),
      },
    });

    // Token expirado o inválido
    if (res.status === 401) {
      cerrarSesion();
      return { success: false, mensaje: 'Sesión expirada.' };
    }

    return await res.json();
  } catch (err) {
    console.error('fetchAPI error:', err);
    return { success: false, mensaje: 'Error al conectar con el servidor.' };
  }
};

// Utilidad: formatear fecha en español
const formatFecha = (isoDate, conHora = false) => {
  if (!isoDate) return '—';
  const opts = { day: '2-digit', month: 'short', year: 'numeric' };
  if (conHora) { opts.hour = '2-digit'; opts.minute = '2-digit'; }
  return new Date(isoDate).toLocaleString('es-CO', opts);
};
