export type CategoryTextShort =
  | "auditoriums"
  | "sports"
  | "laboratories"
  | "meeting"
  | "classrooms"
  | "maximus_classrooms";

export interface States {
  id: number;
  descripcion: string;
}

export interface Availability {
  id: number;
  id_espacio: number;
  fecha_inicio: string;
  fecha_fin: string;
  observaciones: string;
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
  caracteristicas_espacio: {
    id: number;
    dimensiones?: string;
    escritorios?: number;
    sillas?: number;
    mesa_reuniones?: number;
    televisores?: number;
    computadores?: number;
    tablero?: number;
    video_beam?: number;
    adicionales?: string;
  };
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
  historial: HistoryRequest[];
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
  historial: HistoryRequest[];
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
  historial: HistoryRequest;
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

export interface PlaceComplete extends Site {
  categoria: string;
  images: ImageSite[];
  estado: boolean;
  tarifas_espacio: TarifySite;
  dias_disponibilidad_espacio: {
    id: number;
    lunes: "0" | "1";
    martes: "0" | "1";
    miercoles: "0" | "1";
    jueves: "0" | "1";
    viernes: "0" | "1";
    sabado: "0" | "1";
    domingo: "0" | "1";
    festivos: "0" | "1";
    hora_inicio: string;
    hora_fin: string;
  };
  caracteristicas_espacio: CharacteristicSite;
  disponibilidad_espacio: {
    id: number;
    id_espacio: number;
    fecha_inicio: string;
    fecha_fin: string;
    observaciones: string;
  }[];
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

export interface ImageCategory {
  image: string;
  id_image: number;
}
[];

export interface SiteInter extends Site {
  id: number;
  nombre: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  descripcion: string;
  descripcion_corta: string;
  img_card: string;
  images: ImageSite[];
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
  id_categoria: number;
  categoria: string;
  id_estado_espacio: number;
  estado: boolean;
  id_tarifas_espacio: number;
  tarifas_espacio: TarifySite;
  id_dias_disponibilidad_espacio: number;
  dias_disponibilidad_espacio: {
    id: number;
    lunes: "0" | "1";
    martes: "0" | "1";
    miercoles: "0" | "1";
    jueves: "0" | "1";
    viernes: "0" | "1";
    sabado: "0" | "1";
    domingo: "0" | "1";
    festivos: "0" | "1";
    hora_inicio: string;
    hora_fin: string;
  };
  id_caracteristicas_espacio: number;
  disponibilidad_espacio: {
    id: number;
    id_espacio: number;
    fecha_inicio: string;
    fecha_fin: string;
    observaciones: string;
  }[];
}

export interface CategoryComplete {
  id: number;
  descripcion: string;
  identificador: string;
  titulo: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  imagenes: {
    id: number;
    img: string;
    id_categoria: number;
  }[];
}

export interface Areas {
  id: number;
  descripcion: string;
}

export interface Notification {
  id: number;
  email: string;
  area: string;
}

export interface NotificationInfo {
  areas: Areas[];
  notificaciones: Notification[];
}
