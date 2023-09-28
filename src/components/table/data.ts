const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "SITIO", uid: "name", sortable: true},
  {name: "UBICACION", uid: "role", sortable: true},
  {name: "TEAM", uid: "team"},
  {name: "FECHA_UPDATE", uid: "fecha_Actual"},
  {name: "ESTADO", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Disponible", uid: "Disponible"},
  {name: "Reservado", uid: "Reservado"},
  {name: "Mantenimiento", uid: "Mantenimiento"},
];

const users = [
  {
    id: 1,
    name: "Coliseo",
    role: "Coliceo",
    team: "Espacio Deportivo",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 2,
    name: "Salon 1",
    role: "Edificio F",
    team: "Salones de Clase",
    status: "Reservado",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 3,
    name: "Salon 2",
    role: "Edificio A",
    team: "Salones de Clase",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 4,
    name: "Salon 3",
    role: "Edificio D",
    team: "Salones de Clase",
    status: "Mantenimiento",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 5,
    name: "Salon 4",
    role: "Edificio E",
    team: "Salones de Clase",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 6,
    name: "Laboratorio 3",
    role: "Edificio K",
    team: "Laboratorios",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 7,
    name: "Salon 6",
    role: "Edificio D",
    team: "Salones de Clase",
    status: "Reservado",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 8,
    name: "Salon 7",
    role: "Edificio D",
    team: "Salones de Clase",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 9,
    name: "Salon 8",
    role: "Edificio E",
    team: "Salones de Clase",
    status: "Mantenimiento",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 10,
    name: "Salon 9",
    role: "Edificio H",
    team: "Salones de Clase",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 11,
    name: "Laboratorio 2",
    role: "Edificio F",
    team: "Laboratorios",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 12,
    name: "Salon 11",
    role: "Edificio D",
    team: "Salones de Clase",
    status: "Reservado",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 13,
    name: "Salon 12",
    role: "Edificio C",
    team: "Salones de Clase",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 14,
    name: "Salon 13",
    role: "Edificio H",
    team: "Salones de Clase",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 15,
    name: "Salon 14",
    role: "Edificio E",
    team: "Salones de Clase",
    status: "Reservado",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 16,
    name: "Salon 15",
    role: "Edificio C ",
    team: "Salones de Clase",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 17,
    name: "Salon 16",
    role: "Edificio E",
    team: "Salones de Clase",
    status: "Mantenimiento",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 18,
    name: "Laboratorio 1",
    role: "Edificio K",
    team: "Laboratorios",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 19,
    name: "Salon 18",
    role: "Edificio C ",
    team: "Salones de Clase",
    status: "Reservado",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 20,
    name: "Salon 19",
    role: "Edificio D",
    team: "Salones de Clase",
    status: "Mantenimiento",
    fecha_Actual: "28/09/2023"
  },
];

export {columns, users, statusOptions};
