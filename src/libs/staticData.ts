export const categoriesObj: {
  route: string;
  name: string;
  icon: string;
  color: string;
  disabled?: boolean;
}[] = [
  {
    route: "auditoriums",
    name: "Auditorios",
    icon: "people-fill",
    color: "#D33CFF",
  },
  {
    route: "sports",
    name: "Espacios Deportivos",
    icon: "dribbble",
    color: "#F28400",
  },
  {
    route: "laboratories",
    name: "Laboratorios",
    icon: "book",
    color: "#229400",
  },
  {
    route: "meeting",
    name: "Salas de Juntas",
    icon: "suitcase-lg",
    color: "#0008B2",
  },
  {
    route: "classrooms",
    name: "Salones de Clase",
    icon: "backpack2",
    color: "#6800B4",
    disabled: true,
  },
];

export const locationSites: {
  name: string;
}[] = [
  {
   name: "Edifio A" 
  }, 
  { 
    name: "Edificio B" 
  },
  {
    name: "Edifico C"
  },
  {
    name: "Edifico D"
  },
  {
    name: "Edifico E"
  },
  {
    name: "Edifico F"
  },
  {
    name: "Edifico G"
  }
];
