import React from "react";

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
  Switch,
  cn,
} from "@nextui-org/react";
import { columns, users, statusOptions } from "@/components/table/data";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import SwitchComponent from "./Switch";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Activo: "success",
  Inactivo: "danger",
  Mantenimiento: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "type",
  "role",
  "status",
  "fecha_Actual",
  "actions",
  "cowork",
];

type User = (typeof users)[0];

export default function TableComponent() {
  const [filterValue, setFilterValue] = React.useState("");
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

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
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
  }, [users, filterValue, statusFilter]);

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
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-lg font-semibold capitalize">
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
      case "type":
        return <p className="text-bold text-base capitalize ">{cellValue}</p>;
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
      case "cowork":
        if (user.cowork === "1") {
          return <SwitchComponent />;
        } else {
          return (
            <Switch
              color="success"
              aria-label="Automatic updates"
              classNames={{
                thumb: cn(
                  "group-data-[hover=true]:bg-default-white",
                  //selected
                  "group-data-[selected=true]:bg-default-white ",
                  // pressed
                  "group-data-[pressed=true]:w-7",
                  "group-data-[selected]:group-data-[pressed]:ml-5 bg-default-white"
                ),
              }}
            ></Switch>
          );
        }
      case "fecha_Actual":
        return <div>{user.fecha_Actual}</div>;
      case "actions":
        return (
          <div className="relative justify-center flex items-center gap-3">
            <Tooltip
              className="font-semibold  rounded-lg shadow-xl bg-off-white"
              content="Ver página del sitio"
            >
              <span className="text-lg text-soft-gray cursor-pointer active:opacity-50 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
              <i className="bi bi-eye text-2xl"></i>
              </span>
            </Tooltip>
            <Tooltip
              className="font-semibold  rounded-lg shadow-xl bg-off-white"
              content="Ver agenda del sitio"
            >
              <span
                onClick={() => router.push(`/sites/${user.id}/calendar`)}
                className="text-lg text-soft-gray cursor-pointer active:opacity-50 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
                <i className="bi bi-calendar2-check text-xl"></i>
              </span>
            </Tooltip>
            <Tooltip
              className="font-semibold rounded-lg shadow-xl bg-off-white"
              content="Editar sitio"
            >
              <span
                onClick={() => router.push(`/sites/${user.id}/edit`)}
                className="text-lg text-soft-gray cursor-pointer active:opacity-50 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
              <i className="bi bi-pen text-xl"></i>
              </span>
            </Tooltip>
            <Tooltip
              className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
              content="Eliminar sitio"
            >
              <span className="text-lg text-soft-gray hover:text-primary cursor-pointer active:opacity-50 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
              <i className="bi bi-trash3 text-xl"></i>
                <Modal title="Eliminar sitio" text="¿Esta seguro de eliminar el sitio?" option1="Eliminar"></Modal>
              </span>
            </Tooltip>
          </div>
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
        <Input
          aria-label="Search"
          isClearable
          classNames={{
            base: "w-full sm:max-w-[40%]",
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

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/sites/add")}
            aria-label="button"
            className="text-default-white h-10 justify-center px-2 items-center rounded-lg text-base bg-primary"
          >
            Añadir sitio
            <i className="bi bi-plus-lg text-xl"></i>
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
    users.length,
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
          <div className="flex gap-3 text-soft-gray rounded-xl p-2">
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
      th: ["bg-[#C8C8C8]", "text-soft-gray", "text-center", "text-base"],
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

  return (
    <Table
      className=" bg-default-white mb-36 w-full rounded-xl overflow-x-auto shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] mx-auto text-sm text-center p-3"
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
        className="bg-green"
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
