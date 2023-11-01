import React, { useEffect, useState } from "react";

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
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Modal,
} from "@nextui-org/react";
import { columns, userstable, statusOptions } from "@/components/table/data";
import { useRouter } from "next/navigation";
import { includesString } from "@/libs/functionsStrings";
import { useSession } from "next-auth/react";
import { CategoryTextShort } from "@/types/d";
import { DtPicker } from "../react-calendar-datetime-picker/dist";
import moment from "moment";

interface Props {
  params: { category: CategoryTextShort };
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  Activo: "success",
  Inactivo: "danger",
  Mantenimiento: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["username", "type", "hour"];

type User = (typeof userstable)[0];

export default function TableComponent({ params }: Props) {
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
  const { data, status } = useSession();
  const userSession = data?.user ?? {
    name: "default",
    email: "useremail",
  };

  if (includesString(userSession.rols ?? [], ["superadmin", params.category])) {
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
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
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

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    switch (columnKey) {
      case "username":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-base font-semibold">
              {cellValue}
            </p>
          </div>
        );
        case "name":
        return (
          <div className="flex flex-col">
            <p>
              {cellValue}
            </p>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-base capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1"
            color={statusColorMap[user.status]}
            size="lg"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex justify-between font-medium items-center gap-3 ">
        <div className="flex justify-center items-center">
          <DtPicker
            onChange={setDate}
            type="single"
            placeholder="Filtrar por día"
            local="en"
            minDate={minDate}
          />
          </div>
          <div className="flex items-center justify-center text-center">
            <button className="bg-soft-white px-2 text-base py-1 h-12 border-2 items-center justify-center font-medium border-borders-light hover:border-primary transition-all hover:text-primary text-borders rounded-xl">
              Reservar espacio
              <i className="bi bi-calendar-event text-lg ml-2"></i>
            </button>
            <button className="bg-soft-white px-2 ml-4 text-base py-1 h-12 border-2 items-center justify-center font-medium border-borders-light hover:border-primary transition-all hover:text-primary text-borders rounded-xl">
              Gestionar fechas
              <i className="bi bi-calendar-range text-lg ml-2"></i>
            </button>
        </div>
      </div>
    );
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
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          aria-label="Body table"
          emptyContent={"No se han encontrado sitios"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}
