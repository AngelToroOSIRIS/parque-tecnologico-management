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
import { includesString } from "@/libs/functionsStrings";
import { useSession } from "next-auth/react";
import { CategoryTextShort, ReservationCategory } from "@/types/d";
import moment from "moment";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";

interface Props {
  category: CategoryTextShort;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  Pagado: "success",
  "No pago": "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["username", "name", "type", "hour", "paid"];

type User = (typeof userstable)[0];

export default function TableComponent({ category }: Props) {
  const [reserCategory, setReserCategory] = useState<ReservationCategory[]>([]);
  const [date, setDate] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);
  const minDate = {
    year: moment().year(),
    month: moment().month() + 1,
    day: moment().date(),
  };
  const { data: session, status } = useSession();
  const userSession = session?.user ?? {
    name: "default",
    email: "useremail",
  };
  const getData = async () => {
    const response = await fetchFn(
      `/reservationsUsers?email=${session?.user.emailHash}&categoria=${category}`
    );
    if (response.code !== 200) {
      return toast.error("No se ha podido obtener la información.", {
        id: "1",
      });
    }
    setReserCategory(response.data);
  };

  useEffect(() => {
    if (status === "authenticated") getData();
  }, [status]);

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
      key: "fecha_actualizacion",
      label: "FECHA",
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
  if (!loading) {
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
          emptyContent={"No se han encontrado sitios"}
          items={sortedItems}
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
