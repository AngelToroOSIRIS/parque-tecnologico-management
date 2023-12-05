import { Site } from "@/types/d";

export const siteInitialState: Site = {
  id: 0,
  nombre: "",
  descripcion: "",
  descripcion_corta: "",
  id_categoria: 0,
  id_tarifas_espacio: 0,
  id_estado_espacio: 0,
  id_identificador_enlace: 0,
  id_caracteristicas_espacio: 0,
  id_dias_disponibilidad_espacio: 0,
  categoria: "",
  estado: false,
  activo_coworking: "",
  activo_interno: "",
  fecha_creacion: "",
  fecha_actualizacion: "",
  images: [
    {
      img_card: "",
      img_big: "",
      id: 0,
      img_medium: "",
      img_small: "",
    },
    {
      img_card: "",
      img_big: "",
      id: 0,
      img_medium: "",
      img_small: "",
    },
    {
      img_card: "",
      img_big: "",
      id: 0,
      img_medium: "",
      img_small: "",
    },
  ],
  tarifas_espacio: {
    id: 0,
    hora: 0,
    dia: 0,
    mes: 0,
  },
  dias_disponibilidad_espacio: {
    id: 0,
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
    festivos: "",
    hora_inicio: "",
    hora_fin: "",
  },
  caracteristicas_espacio: {
    id: 0,
    dimensiones: "",
    escritorios: 0,
    sillas: 0,
    mesa_reuniones: 0,
    televisores: 0,
    computadores: 0,
    tablero: 0,
    video_beam: 0,
    adicionales: "",
  },
};
