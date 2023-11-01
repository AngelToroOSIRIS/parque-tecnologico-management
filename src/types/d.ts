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

export interface Rol{
  descripcion: string;
  id: number;
  identificador: string;
}

export interface UsersAndRoles{
  email: string;
  roles: Rol[];
}
 
export interface PlaceCard {
	id: number;
	nombre: string;
	descripcion_corta: string;
	img_card: string;
}