// Paleta principal por función
export const COLORS = {
  // Fondos
  background: {
    primary: '#0f172a',   // Fondo principal (azul muy oscuro)
    secondary: '#1e293b', // Fondo secundario (gris espacial)
    surface: '#334155',   // Superficie de cards (gris medio)
    light: '#f8fafc',    // Fondo claro alternativo
  },
  
  // Textos
  text: {
    primary: '#f8fafc',   // Texto principal (blanco hueso)
    secondary: '#cbd5e1', // Texto secundario (gris claro)
    muted: '#64748b',     // Texto deshabilitado (gris medio)
    dark: '#1e293b',      // Texto sobre fondos claros
  },
  
  // Botones y acciones
  button: {
    primary: '#0ea5e9',   // Botón principal (azul tech)
    secondary: '#8b5cf6', // Botón secundario (púrpura)
    success: '#10b981',   // Botón éxito (verde mint)
    danger: '#ef4444',    // Botón peligro (rojo suave)
    ghost: '#64748b',     // Botón fantasma (gris)
  },
  
  // Estados de tareas
  status: {
    pending: '#64748b',     // Pendiente (gris)
    'in-progress': '#0ea5e9', // En progreso (azul)
    complete: '#10b981',    // Completado (verde)
    cancelled: '#ef4444',   // Cancelado (rojo)
  },
  
  // Acentos y elementos especiales
  accent: {
    neon: '#7c3aed',      // Púrpura neón
    cyber: '#06b6d4',     // Cian cibernético
    glow: '#8b5cf6',      // Resplandor púrpura
    highlight: '#fbbf24', // Resaltado amarillo tech
  }
};

// Para compatibilidad - colores de tarjetas de usuario
export const CARD_COLORS = [
  COLORS.background.light,   // Blanco hueso
  COLORS.accent.cyber,       // Cian
  COLORS.button.secondary,   // Púrpura
  COLORS.button.success,     // Verde mint
  COLORS.accent.highlight,   // Amarillo tech
  COLORS.background.surface, // Gris superficie
  COLORS.accent.neon,        // Púrpura neón
  COLORS.status.pending,     // Gris neutral
];