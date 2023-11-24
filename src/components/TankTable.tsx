import React from "react";
import { useReactTable } from "@tanstack/react-table";
import { CategoryTextShort, Site } from "@/types/d";

const TankTable = ({
  category,
  dataSite,
}: {
  category: CategoryTextShort;
  dataSite: Site[];
}) => {
  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "nombre",
      label: "NOMBRE",
    },
    {
      key: "estado_espacio",
      label: "ESTADO",
    },
    {
      key: "categoria",
      label: "CATEGORIA",
    },
    {
      key: "fecha_creacion",
      label: "CREACIÓN",
    },
    {
      key: "fecha_actualizacion",
      label: "ACTUALIZACIÓN",
    },
    {
      key: "options",
      label: "OPCIONES",
    },
  ];

  const table = useReactTable(dataSite, columns)
  return(
  <>

  </>
  ) 
};

export default TankTable;
