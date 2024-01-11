"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { includesString } from "@/libs/functionsStrings";
import { useSession } from "next-auth/react";
import { CategoryTextShort, ReservationCategory } from "@/types/d";

const statusColorMap: Record<string, ChipProps["color"]> = {
  "Sí pago": "success",
  "No pago": "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["username", "name", "type", "hour", "paid"];


export default function TableComponent({
  category,
  reserCategory,
  onClickAction,
}: {
  category: CategoryTextShort;
  reserCategory: ReservationCategory[];
  onClickAction: (reservation: ReservationCategory, action: string) => void;
}) {
  const { data: session } = useSession();
  const userSession = session?.user ?? {
    name: "default",
    email: "useremail",
  };
  const columns = [
    {
      key: "nombre_espacio",
      label: "ESPACIO",
      sortable: true,
    },
    {
      key: "nombre_usuario",
      label: "NOMBRE USUARIO",
      sortable: false,
    },
    {
      key: "estado_reservacion",
      label: "ESTADO",
      sortable: true,
    },
    {
      key: "estado_pago",
      label: "ESTADO",
      sortable: true,
    },
    {
      key: "info_reservation",
      sortable: true,
    },
  ];

  if (includesString(userSession.rols ?? [], ["superadmin", category])) {
  }
  const [filterValue, setFilterValue] = React.useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);


  const router = useRouter();

  const renderCell = React.useCallback(
    (reservation: ReservationCategory, columnKey: React.Key) => {
      if (columnKey == "nombre_espacio") {
        return (
          <div className="flex flex-col">
            <p className="text-bold text-base font-semibold">
              {reservation.nombre_espacio}
            </p>
          </div>
        );
      }
      if (columnKey === "nombre_usuario") {
        return (
          <div className="flex flex-col">
            <p>{reservation.persona_info.nombre}</p>
            <p className="text-sm text-default-400">
              {reservation.persona_info.email}
            </p>
          </div>
        );
      }
      if (columnKey === "estado_reservacion") {
        return (
          <div className="flex flex-col">
            <p className="text-bold text-base capitalize">
              {reservation.estado_reservacion}
            </p>
          </div>
        );
      }
      if (columnKey === "fecha_actualizacion") {
        <div className="flex flex-col">
          <p className="text-bold text-base capitalize">
            {reservation.fecha_actualizacion}
          </p>
        </div>;
      }
      if (columnKey === "estado_pago") {
        return (
          <Chip
            className="capitalize border-none gap-1"
            color={statusColorMap[reservation.estado_pago]}
            size="lg"
            variant="dot"
          >
            {reservation.estado_pago}
          </Chip>
        );
      }
      if (columnKey === "info_reservation") {
        return (
          <>
            <i
              onClick={() => {
                onClickAction(reservation, "info");
              }}
              title="Información"
              className="bi bi-info-circle text-xl text-default-400 hover:text-custom-black transition-all"
            ></i>
            <i onClick={() => {
                onClickAction(reservation, "history");
              }} title="Historial" className="bi bi-clock-history text-xl text-default-400 ml-4 hover:text-custom-black transition-all cursor-pointer"></i>
          </>
        );
      }
    },
    []
  );

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

  const topContent = React.useMemo(() => {
    return <p></p>;
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
  ]);

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
  if (!loading) {
    return (
      <Table
        className="w-full rounded-xl overflow-x-auto mx-auto text-sm text-center"
        bottomContentPlacement="outside"
        aria-label="table"
        classNames={classNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting={column.sortable}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          aria-label="Body table"
          emptyContent={`No se han encontrado reservas para esta categoria`}
        >
          {}
          {reserCategory.map((resevation) => {
            return (
              <TableRow key={resevation.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(resevation, columnKey)}</TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}
