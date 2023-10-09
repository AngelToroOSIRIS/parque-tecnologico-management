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
    color: "text-[#D33CFF]",
  },
  {
    route: "sports",
    name: "Espacios Deportivos",
    icon: "dribbble",
    color:"text-[#F28400]"
  },
  {
    route: "laboratories",
    name: "Laboratorios",
    icon: "book",
    color:"text-[#229400]"
  },
  {
    route: "meeting",
    name: "Salas de Juntas",
    icon: "suitcase-lg",
    color:"text-[#0008B2]"
  },
  {
    route: "classrooms",
    name: "Salones de Clase",
    icon: "backpack2",
    color:"text-[#6800B4]",
    disabled: true
  },
  {
    route: "financial",
    name: "Area Financiera",
    icon: "currency-dollar",
    color: "text-[#CCA400]",
  },
];
