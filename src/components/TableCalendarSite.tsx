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
import { columnsOld, userstable, statusOptions } from "@/components/table/data";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReservationCategory, ReservationSite } from "@/types/d";
import { formatDate } from "@/libs/functionsStrings";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Pagado: "success",
  "No pago": "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["username", "name", "type", "hour", "paid"];

type User = (typeof userstable)[0];

export default function TableCalendarSite({
  reservationSite,
}: {
  reservationSite: ReservationSite[];
}) {
  const { data: session, status } = useSession();
  const userSession = session?.user ?? {
    name: "default",
    email: "useremail",
  };

  const columns = [
    {
      key: "id",
      label: "ID RESERVACION",
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
      key: "fecha_creacion",
      label: "FECHA CREACION",
      sortable: true,
    },
    {
      key: "estado_pago",
      label: "ESTADO PAGO",
      sortable: true,
    },
    {
      key: "info_reservation",
    },
  ];

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

  const pages = Math.ceil(userstable.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columnsOld;

    return columnsOld.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...userstable];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((userstable) =>
        userstable.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [userstable, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const router = useRouter();

  const renderCell = React.useCallback(
    (reservation: ReservationSite, columnKey: React.Key) => {
      if (columnKey == "id") {
        return (
          <div className="flex flex-col">
            <p className="text-bold text-base font-semibold">
              {reservation.id}
            </p>
          </div>
        );
      }
      if (columnKey == "nombre_usuario") {
        return (
          <div className="flex flex-col">
            <p>{reservation.persona_info.nombre}</p>
            <p className="text-sm text-default-400">
              {reservation.persona_info.email}
            </p>
          </div>
        );
      }
      if (columnKey == "estado_reservacion") {
        return (
          <div className="flex flex-col">
            <p className="text-base font-semibold">
              {reservation.estado_reservacion}
            </p>
          </div>
        );
      }
      if (columnKey == "fecha_creacion") {
        return (
          <div className="flex flex-col">
            <p className="text-base">
              {formatDate(reservation.fecha_creacion, true)}
            </p>
          </div>
        );
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
      if(columnKey === "info_reservation"){
        return (
          <a href="">
            <i className="bi bi-info-circle text-xl text-default-400 hover:text-custom-black transition-all"></i>
          </a>
        )
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
    userstable.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="p-2 flex text-center justify-between font-medium text-md gap-x-4 items-center transition-all">
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
      <Table
        className="w-full rounded-xl overflow-x-auto mx-auto text-sm text-center"
        bottomContent={bottomContent}
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
          emptyContent={"No se han encontrado reservaciones para este sitio"}
          items={sortedItems}
        >
          {reservationSite.map((resevation) => {
            console.log(resevation)
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
