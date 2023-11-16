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
}

export interface RequestInfo {
  id: number,
	fecha_inicio: string,
	fecha_fin: string,
	factura: string,
	cuenta_bancaria: string,
	fecha_creacion: string
}

export interface HistoryRequest {
  id: number;
  id_reservacion: number;
  creado_por: string;
  estado_reservacion: string;
  fecha_creacion: string;
  observaciones: string;
}

export interface PersonRequest{
  direccion: string;
  email:string;
  email_facturacion: string;
  id_persona: number;
  nombre: string;
  telefono: string;
}

export interface ReservationRequest{
  fecha_actualizacion:string;
  fecha_creacion:string;
  id:number;
  id_espacio: number;
  valor: number;
  valor_descuento: number;
  valor_pagado: number;
}

export interface RequestData{
  solicitud_reservacion: RequestInfo;
  estado_reservacion: string;
  historial: HistoryRequest[];
  reservacion: ReservationRequest;
  info_persona :PersonRequest;
}

export interface Reservation{
  fecha_actualizacion:string;
  fecha_creacion:string;
  id:number;
  id_espacio: number;
  valor: number;
  valor_descuento: number;
  valor_pagado: number;
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