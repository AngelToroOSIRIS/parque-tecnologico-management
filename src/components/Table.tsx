import React from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Tooltip,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";
import { PlusIcon } from "@/components/table/PlusIcon";
import DropdownOne from "@/components/DropdownOne";
import { ChevronDownIcon } from "@/components/table/ChevronDownIcon";
import { EditIcon } from "@/components/table/EditIcon";
import { DeleteIcon } from "@/components/table/DeleteIcon";
import { EyeIcon } from "@/components/table/EyeIcon";
import { SearchIcon } from "@/components/table/SearchIcon";
import { columns, users, statusOptions } from "@/components/table/data";
import { capitalize } from "@/components/table/utils";
import Modal from "@/components/Modal";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Disponible: "success",
  Reservado: "danger",
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
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "type":
        return (
          <p className="text-bold text-tiny capitalize text-default-500">
            {cellValue}
          </p>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="lg"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "fecha_Actual":
        return <div>{user.fecha_Actual}</div>;
      case "actions":
        return (
          <div className="relative justify-center flex items-center gap-2">
            <Tooltip
              className="font-semibold  rounded-lg shadow-xl bg-borders-light"
              content="Ver página del sitio"
            >
              <span className="text-lg text-soft-gray cursor-pointer active:opacity-50 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip
              className="font-semibold rounded-lg shadow-xl bg-borders-light "
              content="Editar sitio"
            >
              <span className="text-lg text-soft-gray cursor-pointer active:opacity-50 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip
              className="font-semibold text-primary rounded-lg shadow-xl bg-borders-light"
              content="Eliminar sitio"
            >
              <span className="text-lg text-soft-gray hover:text-primary cursor-pointer active:opacity-50 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                <DeleteIcon />
                <Modal/>
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
          isClearable
          classNames={{
            base: "w-full sm:max-w-[40%]",
            inputWrapper:
              "h-[45px] rounded-lg bg-white-off shadow-none text-custom-black p-2",
          }}
          placeholder="Buscar por nombre de sitio..."
          size="lg"
          startContent={
            <SearchIcon className=" text-borders h-[20px] w-[20px] mr-2" />
          }
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />

        <div className="flex gap-4">
          <div className="flex gap-3 text-soft-gray rounded-xl p-2">
            <label className="justify-center items-center">
              Sitios por página:
              <select
                className="outline-none bg-borders-light rounded-md ml-2 text-soft-gray text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </label>
          </div>

          <div className="flex gap-3 bg-primary text-default-white rounded-xl p-2">
            <Button
              className="text-background"
              endContent={<PlusIcon height={25} width={25} size={25} />}
              size="sm"
              disableAnimation={true}
            >
              Añadir sitio
            </Button>
          </div>
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
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      th: ["bg-[#C8C8C8]", "text-soft-gray", "text-center"],
      td: [
        // changing the rows border radius
        // first
        "p-3",
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
      className=" bg-default-white p-3 text-center"
      isCompact
      removeWrapper
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
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
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
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
