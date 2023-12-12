"use client";

import fetchFn from "@/libs/fetchFn";
import { CategoryTextShort, Site, SiteTbl } from "@/types/d";
import { createTable } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import TableData from "../Table/TableData";
import { setSitesInTable } from "@/libs/setDataInTable";

export default function Categories({
  category,
}: {
  category: CategoryTextShort;
}) {
  let table = createTable().setRowType<Site>();
  const columns = [
    { accessor: "id", header: "ID" },
    { accessor: "nombre", header: "NOMBRE" },
    { accessor: "estado_espacio", header: "ESTADO" },
    { accessor: "categoria", header: "CATEGORÍA" },
    { accessor: "fecha_creacion", header: "CREACIÓN" },
    { accessor: "fecha_actualizacion", header: "ACTUALIZACIÓN" },
    { accessor: "options", header: "OPCIONES" },
  ];

  const [dataSite, setDataSite] = useState<SiteTbl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, status } = useSession();
  const userSession = data?.user ?? {
    name: "default",
    email: "useremail",
  };
  const getData = async () => {
    setLoading(true);
    const response = await fetchFn(`/places?categoria=${category}`);
    if (response.code !== 200) {
      return toast.error("No se ha podido obtener la información.", {
        id: "1",
      });
    }

    setDataSite(response.data);
    setLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status]);

  return (
    <>
      {!loading && (
        <>
          <TableData
           category={category}
            columnsArray={columns}
            dataArray={setSitesInTable(dataSite)}
            createdTable={table}
            description="Sitios"
            />
        </>
      )}
      {loading && (
        <TailSpin
          height="100"
          width="100"
          color="#990000"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{
            margin: "20px 0",
            justifyContent: "center",
          }}
        />
      )}
    </>
  );
}
