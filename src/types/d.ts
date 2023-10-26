export type CategoryTextShort =
  | "auditoriums"
  | "sports"
  | "laboratories"
  | "meeting"
  | "classrooms"
  | "financial";

export interface Category {
  id:number
  descripcion: string
  identificador: string
}

export interface States{
  id: number
  descripcion: string
}

export interface Enlace{
  id: number
  llave: string
}

export interface ReservationDateDetails {
  dateTimeStart: string;
  dateTimeEnd: string;
  totalTime: string;
  valid: boolean;
}
 
