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
  Badge,
} from "@nextui-org/react";
import { columns, userstable, statusOptions } from "@/components/table/data";
import { useRouter } from "next/navigation";
import Switch from "./Switch";
import { includesString } from "@/libs/functionsStrings";
import { useSession } from "next-auth/react";
import { CategoryTextShort } from "@/types/d";

interface Props {
  params: { category: CategoryTextShort };
}

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
];

type User = (typeof userstable)[0];

export default function TableComponent({ params }: Props) {
  const [rolAdmin, setRolAdmin] = useState<boolean>(false);
  const { data, status } = useSession();
  const userSession = data?.user ?? {
    name: "default",
    email: "useremail",
  };

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

  useEffect(() => {
    if (status === "authenticated") {
      const result = includesString(userSession.rols ?? [], [
        "superadmin",
        params.category,
      ]);
      setRolAdmin(result);
    }
  }, [status]);
  console.log(rolAdmin)

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
      case "fecha_Actual":
        return <div>{user.fecha_Actual}</div>;
      case "actions":
        return (
          <div className="relative justify-center flex items-center gap-3">
            <Tooltip
              className="font-semibold  rounded-lg shadow-xl bg-off-white"
              content="Ver página del sitio"
            >
              <a
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_COWORKING_URL}/sites/${user.id}`}
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
                onClick={() => router.push(`/sites/${user.id}/calendar`)}
                className="text-lg outline-none text-borders cursor-pointer hover:text-custom-black transition-all"
              >
                <i className="bi bi-calendar2-check text-xl"></i>
              </span>
            </Tooltip>

            {rolAdmin && (
                <>
                  <Tooltip
                    className="font-semibold rounded-lg shadow-xl bg-off-white"
                    content="Editar sitio"
                  >
                    <span
                      onClick={() => router.push(`/sites/${user.id}/edit`)}
                      className="text-lg outline-none text-borders cursor-pointer hover:text-custom-black transition-all"
                    >
                      <i className="bi bi-pen text-xl"></i>
                    </span>
                  </Tooltip>
                  <Tooltip
                    className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
                    content="Eliminar sitio"
                  >
                    <span className="text-lg outline-none text-borders hover:text-primary cursor-pointer transition-all">
                      <i className="bi bi-trash3 text-xl"></i>
                    </span>
                  </Tooltip>
                </>
              )}
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
        {rolAdmin && (
            <div className="flex gap-4">
              <Badge
                content={<i className="bi bi-bell-fill text-sm"></i>}
                color="primary"
                size="lg"
                className="animate-pulse"
              >
                <button
                  onClick={() => router.push(`${params.category}/requests`)}
                  aria-label="button"
                  className="h-10 justify-center px-2 items-center rounded-lg font-medium border-borders-light hover:border-borders text-borders text-base border-2 bg-borders-light transition-all"
                >
                  Solicitudes
                  <i className="bi bi-exclamation-circle mx-1 text-xl"></i>
                </button>
              </Badge>
              <button
                onClick={() => router.push("/sites/add")}
                aria-label="button"
                className="h-10 justify-center px-2 items-center rounded-lg font-medium border-borders-light hover:border-borders text-borders text-base border-2 bg-borders-light transition-all"
              >
                Añadir sitio
                <i className="bi bi-plus-circle mx-1 text-xl"></i>
              </button>
            </div>
          )}
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
        className="bg-default-white mb-36 w-[95%] rounded-xl overflow-x-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mx-auto text-sm text-center p-3"
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
