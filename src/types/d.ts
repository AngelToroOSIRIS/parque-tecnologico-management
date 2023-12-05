export type CategoryTextShort =
  | "auditoriums"
  | "sports"
  | "laboratories"
  | "meeting"
  | "classrooms"
  | "maximus_classrooms";

export interface Category {
  id: number;
  descripcion: string;
  identificador: string;
  titulo: string;
  estado: string;
}

export interface States {
  id: number;
  descripcion: string;
}

export interface Enlace {
  id: number;
  llave: string;
}

export interface ReservationDateDetails {
  dateTimeStart: string;
  id?: number;
  dateTimeEnd: string;
  totalTime: string;
  value: number;
  valid: boolean;
}

export interface Rol {
  descripcion: string;
  id: number;
  identificador: string;
}

export interface UsersAndRoles {
  email: string;
  estado: string;
  roles: Rol[];
}

export interface PlaceCard {
  id: number;
  nombre: string;
  descripcion_corta: string;
  img_card: string;
}

export interface RequestInfo {
  id: number;
  fecha_inicio: string;
  fecha_fin: string;
  factura: string;
  cuenta_bancaria: string;
  fecha_creacion: string;
}

export interface HistoryRequest {
  id: number;
  id_reservacion: number;
  estado_reservacion: string;
  fecha_creacion: string;
  observaciones: string;
  creado_por: string;
}

export interface PersonRequest {
  direccion: string;
  email: string;
  email_facturacion: string;
  id_persona: number;
  nombre: string;
  telefono: string;
}

export interface ReservationRequest {
  fecha_actualizacion: string;
  fecha_creacion: string;
  id: number;
  id_espacio: number;
  valor: number;
  valor_descuento: number;
  valor_pagado: number;
}

export interface CancelRequest {
  id: number;
  factura: string;
  cuenta_bancaria: string;
  fecha_creacion: string;
}

export interface DateChangeRequest {
  id_reservacion_espacio: number;
  fecha_inicio: string;
  fecha_fin: string;
  reservacion_espacio: {
    fecha_inicio: string;
    fecha_fin: string;
  };
}

export interface RequestData {
  cambio_fecha_reservacion?: DateChangeRequest[];
  cancelar_reservacion?: CancelRequest;
  historial: HistoryRequest[];
  reservacion: Reservation;
  info_persona: PersonRequest;
  estado_reservacion: string;
  id_historial: number;
}

export interface ReservationSite {
  id: number;
  id_usuario: number;
  id_espacio: number;
  nombre_espacio: string;
  estado_reservacion: string;
  valor: number;
  valor_descuento: number;
  valor_pagado: number;
  estado_pago: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  persona_info: PersonRequest;
  fechas: Dates[];
}

export interface Dates {
  id_reservacion_espacio: number;
  valor: number;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface Reservation {
  fecha_actualizacion: string;
  fecha_creacion: string;
  id: number;
  id_espacio: number;
  valor: number;
  valor_descuento: number;
  valor_pagado: number;
}

export interface ReservationCategory {
  id: number;
  id_usuario: number;
  id_espacio: number;
  nombre_espacio: string;
  estado_reservacion: string;
  valor: number;
  valor_descuento: number;
  valor_pagado: number;
  estado_pago: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  persona_info: PersonRequest;
}

export interface SiteEdit {
  id: number;
  nombre: string;
  descripcion: string;
  descripcion_corta: string;
  categoria: string;
  estado: boolean;
  images: [
    {
      img_card: string;
      img_big: string;
      id: number;
      img_medium: string;
      img_small: string;
    }
  ];
  tarifas_espacio: {
    id: number;
    hora: number;
    dia: number;
    mes: number;
  };
  dias_disponibilidad_espacio: {
    id: number;
    lunes: number;
    martes: number;
    miercoles: number;
    jueves: number;
    viernes: number;
    sabado: number;
    domingo: number;
    festivos: number;
    hora_inicio: string;
    hora_fin: string;
  };
  caracteristicas_espacio: {
    id: number;
    dimensiones: string;
    escritorios: number;
    sillas: number;
    mesa_reuniones: number;
    televisores: number;
    computadores: number;
    tablero: number;
    video_beam: number;
    adicionales: string;
  };
}

export interface Site {
  id: number;
  categoria: string;
  id_categoria: number;
  id_tarifas_espacio: number;
  id_estado_espacio: number;
  id_caracteristicas_espacio: number;
  estado: boolean;
  id_dias_disponibilidad_espacio: number;
  id_identificador_enlace?: number;
  nombre: string;
  descripcion: string;
  descripcion_corta: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  activo_coworking: string;
  activo_interno: string;
  images: ImageSite[];
  tarifas_espacio: TarifySite;
  dias_disponibilidad_espacio: DaysDisponibilitySite;
  caracteristicas_espacio: CharacteristicSite;
}
export interface ImageSite {
  img_card: string;
  img_big: string;
  id: number;
  img_medium: string;
  img_small: string;
}

export interface CharacteristicSite {
  id: number;
  dimensiones: string;
  escritorios: number;
  sillas: number;
  mesa_reuniones: number;
  televisores: number;
  computadores: number;
  tablero: number;
  video_beam: number;
  adicionales: string;
}

export interface DaysDisponibilitySite {
  id: number;
  lunes: string;
  martes: string;
  miercoles: string;
  jueves: string;
  viernes: string;
  sabado: string;
  domingo: string;
  festivos: string;
  hora_inicio: string;
  hora_fin: string;
}

export interface TarifySite {
  id: number;
  hora: number;
  dia: number;
  mes: number;
}

export interface SiteTbl {
  id: string;
  categoria: string;
  estado_espacio: string;
  nombre: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}
