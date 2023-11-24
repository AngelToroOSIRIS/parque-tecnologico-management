export type CategoryTextShort =
  | "auditoriums"
  | "sports"
  | "laboratories"
  | "meeting"
  | "classrooms"
  | "financial";

export interface Category {
  id: number;
  descripcion: string;
  identificador: string;
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

export interface Site {
  id: number;
  categoria: string;
  id_tarifas_espacio: any;
  estado_espacio: string;
  id_identificador_enlace: number;
  nombre: string;
  descripcion: string;
  descripcion_corta: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  activo_coworking: boolean;
  activo_interno: boolean;
}
