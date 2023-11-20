"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Tooltip,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  Badge,
} from "@nextui-org/react";
import { statusOptions } from "@/components/table/data";
import { useRouter } from "next/navigation";
import { formatDate, includesString } from "@/libs/functionsStrings";
import { useSession } from "next-auth/react";
import { CSVLink, CSVDownload } from "react-csv";
import { Category, CategoryTextShort, Site } from "@/types/d";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { categoriesObj } from "@/libs/staticData";
import ButtonTable from "./ButtonTable";
import { TailSpin } from "react-loader-spinner";

export default function TableComponent({
  category,
}: {
  category: CategoryTextShort;
}) {
  const [rolAdmin, setRolAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSite, setDataSite] = useState<Site[]>([]);
  const { data, status } = useSession();
  const userSession = data?.user ?? {
    name: "default",
    email: "useremail",
  };
  const [dataFilters, setDataFilters] = useState<{
    categorias: Category[];
  }>({ categorias: [] });

  const getData = async () => {
    const response = await fetchFn(`/places?categoria=${category}`);
    if (response.code !== 200) {
      return toast.error("No se ha podido obtener la información.", {
        id: "1",
      });
    }
    setLoading(false);
    setDataSite(response.data);
  };


  const statusColorMap: Record<string, ChipProps["color"]> = {
    Activo: "success",
    Inactivo: "danger",
    Mantenimiento: "warning",
  };

  const categoryFound = categoriesObj.find(
    (item) => item.route === category
  );

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );

  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(dataSite.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredSite = [...dataSite];

    if (hasSearchFilter) {
      filteredSite = filteredSite.filter((dataSite) =>
        dataSite.nombre.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredSite = filteredSite.filter((site) =>
        Array.from(statusFilter).includes(site.estado_espacio)
      );
    }

    return filteredSite;
  }, [dataSite, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const result = includesString(userSession.rols ?? [], [
        "superadmin",
        category,
      ]);
      setRolAdmin(result);
      getData();
      setLoading(true);
    }
  }, [status]);

  const renderCell = React.useCallback((site: Site, columnKey: React.Key) => {
    if (columnKey == "id") {
      return (
        <div className="flex flex-col">
          <p className="text-bold text-lg font-semibold capitalize">
            {site.id}
          </p>
        </div>
      );
    }
    if (columnKey == "nombre") {
      return (
        <div className="flex flex-col">
          <p className="text-bold text-lg font-semibold capitalize">
            {site.nombre}
          </p>
        </div>
      );
    }
    if (columnKey == "estado_espacio") {
      return (
        <div className="flex flex-col ">
          <Chip
            className="capitalize border-none gap-1"
            color={statusColorMap[site.estado_espacio]}
            size="lg"
            variant="dot"
          >
            <p className="text-bold text-base capitalize">
              {site.estado_espacio}
            </p>
          </Chip>
        </div>
      );
    }
    if (columnKey == "categoria") {
      return (
        <div className="flex flex-col">
          <p className="text-bold text-base capitalize">{site.categoria}</p>
        </div>
      );
    }
    if (columnKey == "fecha_creacion") {
      return (
        <div className="flex flex-col">
          <p className="text-bold text-base capitalize">
            {formatDate(site.fecha_creacion, true)}
          </p>
        </div>
      );
    }
    if (columnKey == "fecha_actualizacion") {
      return (
        <div className="flex flex-col">
          <p className="text-bold text-base capitalize">
            {formatDate(site.fecha_actualizacion, true)}
          </p>
        </div>
      );
    }
    if (columnKey == "options") {
      return (
        <div className="relative justify-center flex items-center gap-3">
          <Tooltip
            className="font-semibold  rounded-lg shadow-xl bg-off-white"
            content="Ver página del sitio"
          >
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_COWORKING_URL}/sites/${site.id}`}
              className="text-lg outline-none text-borders cursor-pointer hover:text-custom-black transition-all"
            >
              <i className="bi bi-eye text-2xl"></i>
            </a>
          </Tooltip>
          <Tooltip
            className="font-semibold  rounded-lg shadow-xl bg-off-white"
            content="Ver agenda del sitio"
          >
            <span
              onClick={() => router.push(`/sites/${site.id}/calendar`)}
              className="text-lg outline-none text-borders cursor-pointer hover:text-custom-black transition-all"
            >
              <i className="bi bi-calendar2-check text-xl"></i>
            </span>
          </Tooltip>
          {includesString(userSession.rols ?? [], [
            "superadmin",
            category,
          ]) && (
            <>
              <Tooltip
                className="font-semibold rounded-lg shadow-xl bg-off-white"
                content="Editar sitio"
              >
                <span
                  onClick={() => router.push(`/sites/${site.id}/edit`)}
                  className="text-lg outline-none text-borders cursor-pointer hover:text-custom-black transition-all"
                >
                  <i className="bi bi-pen text-xl"></i>
                </span>
              </Tooltip>
              <Tooltip
                className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
                content="Inhabilitar sitio"
              >
                <span className="text-lg outline-none text-borders hover:text-primary cursor-pointer transition-all">
                  <i className="bi bi-dash-circle text-xl"></i>
                </span>
              </Tooltip>
            </>
          )}
        </div>
      );
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

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

  const columnsCsv = [
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
      key: "fecha_creacion",
      label: "CREACIÓN",
    },
    {
      key: "fecha_actualizacion",
      label: "ACTUALIZACIÓN",
    },
  ];

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between font-medium items-center gap-3 ">
        <Input
          aria-label="Search"
          isClearable
          classNames={{
            base: "w-full sm:max-w-[30%]",
            input: "rounded-lg",
            inputWrapper:
              "h-[45px] rounded-lg bg-[#ffffff] shadow-none text-custom-black p-2",
          }}
          placeholder="Buscar por nombre de sitio..."
          size="lg"
          startContent={<i className="bi bi-search text-lg"></i>}
          value={filterValue}
          variant="faded"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
        <div className="flex items-center gap-4">
          <CSVLink
            headers={columnsCsv}
            filename={`REPORTE ${new Date().toJSON().slice(0, 10)} ${
              categoryFound?.name
            }`}
            separator=";"
            data={dataSite}
            className="flex h-10 justify-center px-2 items-center rounded-lg font-medium border-borders-light hover:border-borders text-borders text-base border-2 bg-borders-light transition-all "
          >
            Exportar en .CSV
            <i className="bi bi-file-earmark-spreadsheet hidden lg:flex text-xl ml-2"></i>
          </CSVLink>
          <ButtonTable
            text="Agenda general"
            icon="calendar2-check"
            onClick={() => router.push(`${category}/calendary`)}
            type="button"
          />
          {includesString(userSession.rols ?? [], [
            "superadmin",
            category,
          ]) && (
            <>
              <Badge
                content={<i className="bi bi-bell-fill text-sm"></i>}
                color="primary"
                size="lg"
                className="animate-pulse"
              >
                <ButtonTable
                  text="Solicitudes"
                  icon="exclamation-circle"
                  onClick={() => router.push(`${category}/requests`)}
                  type="button"
                />
              </Badge>
              <ButtonTable
                text="Añadir sitio"
                icon="plus-circle"
                onClick={() => router.push("/sites/add")}
                type="button"
              />
            </>
          )}
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onSearchChange,
    onRowsPerPageChange,
    dataSite.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="p-2 flex text-center justify-between font-medium text-md gap-x-4 items-center transition-all">
        {pages > 2 && (
          <>
            <Pagination
              showControls
              aria-label="Pagination"
              showShadow
              size="lg"
              classNames={{
                cursor:
                  "bg-primary text-default-white font-medium text-md transition-all rounded-lg",
              }}
              isDisabled={hasSearchFilter}
              page={page}
              total={pages}
              variant="light"
              onChange={setPage}
            />
            <div className="flex gap-4">
              <div className="flex gap-3 text-borders rounded-xl p-2">
                <label className="justify-center items-center">
                  Sitios por página:
                  <select
                    className="outline-none h-7 text-base bg-primary rounded-md ml-2 text-default-white"
                    onChange={onRowsPerPageChange}
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      th: ["bg-borders-light", "text-borders", "text-center", "text-base"],
      td: [
        // changing the rows border radius
        // first
        "p-3",
        "text-base",
        "text-center",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );
  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, []);
  return (
    <>
      {!loading && (
        <Table
          className="bg-default-white mb-36 w-[95%] rounded-xl overflow-x-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mx-auto text-sm text-center p-3"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          aria-label="table"
          classNames={classNames}
          selectedKeys={selectedKeys}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                align={column.key === "actions" ? "center" : "start"}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            aria-label="Body table"
            emptyContent={"No se han encontrado sitios"}
          >
            {dataSite.map((site) => {
              return (
                <TableRow key={site.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(site, columnKey)}</TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
