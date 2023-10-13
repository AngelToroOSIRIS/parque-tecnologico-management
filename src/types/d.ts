export type CategoryTextShort =
  | "auditoriums"
  | "sports"
  | "laboratories"
  | "meeting"
  | "classrooms"
  | "financial";

export interface Category {
  id:number
  identificador: string
  descripcion: string
}

export interface States{
  id: number
  descripcion: string
}
