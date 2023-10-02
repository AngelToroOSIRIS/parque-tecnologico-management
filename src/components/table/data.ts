const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "SITIO", uid: "name", sortable: true},
  {name: "UBICACION", uid: "role", sortable: true},
  {name: "TIPO", uid: "type"},
  {name: "ESTADO", uid: "status", sortable: true},
  {name: "CO-WORKING", uid: "cowork"},
  {name: "ACTUALIZACIÓN", uid: "fecha_Actual"},
  {name: "OPCIONES", uid: "actions"},
];

const statusOptions = [
  {name: "Todos", uid: "Todos" , "Disponible" : "Reservado" },
  {name: "Disponibles", uid: "Disponible"},
  {name: "Reservados", uid: "Reservado"},
  {name: "Mantenimiento", uid: "Mantenimiento"},
];

const users = [
  {
    id: 1,
    name: "Coliseo",
    role: "Coliseo",
    type: "Espacio Deportivo",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 2,
    name: "Salon 1",
    role: "Edificio F",
    type: "Salones de Clase",
    status: "Reservado",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 3,
    name: "Salon 2",
    role: "Edificio A",
    type: "Salones de Clase",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 4,
    name: "Auditorio 1",
    role: "Edificio D",
    type: "Auditorios",
    status: "Mantenimiento",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 5,
    name: "Salon 4",
    role: "Edificio E",
    type: "Salones de Clase",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 6,
    name: "Laboratorio 3",
    role: "Edificio K",
    type: "Laboratorios",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 7,
    name: "Salon 6",
    role: "Edificio D",
    type: "Salones de Clase",
    status: "Reservado",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 8,
    name: "Salon 7",
    role: "Edificio D",
    type: "Salones de Clase",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 9,
    name: "Salon 8",
    role: "Edificio E",
    type: "Salones de Clase",
    status: "Mantenimiento",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 10,
    name: "Auditorio 2",
    role: "Edificio H",
    type: "Auditorios",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 11,
    name: "Laboratorio 2",
    role: "Edificio F",
    type: "Laboratorios",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 12,
    name: "Salon 11",
    role: "Edificio D",
    type: "Salones de Clase",
    status: "Reservado",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 13,
    name: "Cancha de Volleyball",
    role: "Cancha Volleyball 1",
    type: "Espacio Deportivo",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 14,
    name: "Auditorio 3",
    role: "Edificio H",
    type: "Auditorios",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 15,
    name: "Cancha de Basquetball",
    role: "Coliseo",
    type: "Espacios Deportivos",
    status: "Reservado",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 16,
    name: "Sala de Reunión 1",
    role: "Edificio C ",
    type: "Sala de Reunión",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 17,
    name: "Cancha de Futbol",
    role: "Cancha 1",
    type: "Espacio Deportivo",
    status: "Mantenimiento",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 18,
    name: "Laboratorio 1",
    role: "Edificio K",
    type: "Laboratorios",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 19,
    name: "Salon 18",
    role: "Edificio C ",
    type: "Salones de Clase",
    status: "Reservado",
    fecha_Actual: "28/09/2023"
  },
  {
    id: 20,
    name: "Sala de reunión 2",
    role: "Edificio C",
    type: "Sala de juntas",
    status: "Disponible",
    fecha_Actual: "28/09/2023"
  },
];

export {columns, users, statusOptions};