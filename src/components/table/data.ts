const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NOMBRE SITIO", uid: "name", sortable: true},
  {name: "UBICACION", uid: "role", sortable: true},
  {name: "TIPO", uid: "type", sortable: true},
  {name: "ESTADO", uid: "status", sortable: true},
  {name: "VISIBLE CO-WORKING", uid: "cowork"},
  {name: "ACTUALIZACIÓN", uid: "fecha_Actual", sortable: true},
  {name: "OPCIONES", uid: "actions"},
];

const statusOptions = [
  {name: "Activo", uid: "Activo"},
  {name: "Inactivo", uid: "Inactivo"},
  {name: "Mantenimiento", uid: "Mantenimiento"},
];

const userstable = [
  {
    id: 1,
    name: "Coliseo",
    role: "Coliseo",
    type: "Espacio Deportivo",
    status: "Activo",
    cowork: "1",
    fecha_Actual: "04/10/2023"
  },
  {
    id: 2,
    name: "Salon 1",
    role: "Edificio F",
    type: "Salones de Clase",
    status: "Inactivo",
    cowork: "0",
    fecha_Actual: "10/10/2023"
  },
  {
    id: 3,
    name: "Salon 2",
    role: "Edificio A",
    type: "Salones de Clase",
    cowork: "1",
    status: "Activo",
    fecha_Actual: "05/10/2023"
  },
  {
    id: 4,
    name: "Auditorio 1",
    role: "Edificio D",
    type: "Auditorios",
    status: "Mantenimiento",
    cowork: "0",
    fecha_Actual: "30/09/2023"
  },
  {
    id: 5,
    name: "Salon 4",
    role: "Edificio E",
    type: "Salones de Clase",
    status: "Activo",
    cowork: "1",
    fecha_Actual: "09/10/2023"
  },
  {
    id: 6,
    name: "Laboratorio 3",
    role: "Edificio K",
    type: "Laboratorios",
    status: "Activo",
    cowork: "1",
    fecha_Actual: "11/10/2023"
  },
  {
    id: 7,
    name: "Salon 6",
    role: "Edificio D",
    type: "Salones de Clase",
    status: "Inactivo",
    cowork: "0",
    fecha_Actual: "04/10/2023"
  },
  {
    id: 8,
    name: "Salon 7",
    role: "Edificio D",
    type: "Salones de Clase",
    status: "Activo",
    cowork: "1",
    fecha_Actual: "09/10/2023"
  },
  {
    id: 9,
    name: "Salon 8",
    role: "Edificio E",
    type: "Salones de Clase",
    status: "Mantenimiento",
    cowork: "0",
    fecha_Actual: "03/10/2023"
  },
  {
    id: 10,
    name: "Auditorio 2",
    role: "Edificio H",
    type: "Auditorios",
    status: "Activo",
    cowork: "1",
    fecha_Actual: "05/10/2023"
  },
  {
    id: 11,
    name: "Laboratorio 2",
    role: "Edificio F",
    type: "Laboratorios",
    status: "Activo",
    cowork: "1",
    fecha_Actual: "07/10/2023"
  },
  {
    id: 12,
    name: "Salon 11",
    role: "Edificio D",
    type: "Salones de Clase",
    status: "Inactivo",
    cowork: "0",
    fecha_Actual: "02/10/2023"
  },
  {
    id: 13,
    name: "Cancha de Volleyball",
    role: "Cancha Volleyball 1",
    type: "Espacio Deportivo",
    status: "Activo",
    cowork: "1",
    fecha_Actual: "03/10/2023"
  },
  {
    id: 14,
    name: "Auditorio 3",
    role: "Edificio H",
    type: "Auditorios",
    status: "Activo",
    cowork: "0",
    fecha_Actual: "09/10/2023"
  },
  {
    id: 15,
    name: "Cancha de Basquetball",
    role: "Coliseo",
    type: "Espacios Deportivos",
    status: "Inactivo",
    cowork: "0",
    fecha_Actual: "11/10/2023"
  },
  {
    id: 16,
    name: "Sala de Reunión 1",
    role: "Edificio C ",
    type: "Sala de Reunión",
    status: "Activo",
    cowork: "1",
    fecha_Actual: "30/09/2023"
  },
  {
    id: 17,
    name: "Cancha de Futbol",
    role: "Cancha 1",
    type: "Espacio Deportivo",
    status: "Mantenimiento",
    cowork: "0",
    fecha_Actual: "10/10/2023"
  },
  {
    id: 18,
    name: "Laboratorio 1",
    role: "Edificio K",
    type: "Laboratorios",
    status: "Activo",
    cowork: "0",
    fecha_Actual: "03/10/2023"
  },
  {
    id: 19,
    name: "Salon 18",
    role: "Edificio C ",
    type: "Salones de Clase",
    status: "Inactivo",
    cowork: "0",
    fecha_Actual: "02/10/2023"
  },
  {
    id: 20,
    name: "Sala de reunión 2",
    role: "Edificio C",
    type: "Sala de juntas",
    status: "Activo",
    cowork: "1",
    fecha_Actual: "07/10/2023"
  },
];

export {columns, userstable, statusOptions};