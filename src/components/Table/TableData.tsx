"use client"

import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import {
  PaginationState,
  useTableInstance,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import useColumnsRows from "../../hooks/useColumnsRows";
import Link from "next/link";
import FilterTable from "./FilterTable";
import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { Triangle } from "react-loader-spinner";
import encode64 from "../../libs/encode64";
import { SelectItem } from "@nextui-org/react";

interface Props {
  columnsArray: { accessor: string; header: string }[];
  dataArray: any[];
  createdTable: any;
  description: string;
  className?: string;
}

const TableData: React.FC<Props> = ({
  columnsArray,
  dataArray,
  createdTable,
  description,
  className = "",
}: Props) => {
  const router = useRouter();
  let table = createdTable;
  const columns = useColumnsRows(columnsArray, table);

  const [data] = useState<any>(dataArray);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const [activeFilters, setActiveFilters] = useState<Boolean>(false);

  const nextPageClass =
    "w-9 h-7 flex-center text-default-white rounded-[10px] border border-soft-primary bg-primary transition-all cursor-pointer hover:bg-dark-primary hover:border-primary active:border-dark-primary";
  const nextPageClassDisabled =
    "w-9 h-7 flex-center text-default-white rounded-[10px] bg-soft-gray transition-all cursor-not-allowed";

  const columnsForCsv = columnsArray.map((column) => {
    return {
      label: column.header,
      key: column.accessor,
    };
  });
  const dataForCsv = instance
    .getFilteredRowModel()
    .rows.map((row) => row.original);

  useEffect(() => {
      const totalPages = instance.getPageCount();
      const pQuery = 1;
      let pageNumber =
        pQuery !== undefined
          ? Number(pQuery) < 1
            ? 0
            : Number(pQuery) - 1
          : 0;

      pageNumber = isNaN(pageNumber) ? 0 : pageNumber;

      setCurrentPage(pageNumber > totalPages ? totalPages - 1 : pageNumber);
      instance.setPageIndex(
        pageNumber > totalPages ? totalPages - 1 : pageNumber
      );
      setLoading(false);
  }, []);

  if (!loading)
    return (
      <Fragment>
        <section className="flex items-center justify-between pb-2">
          <div>
            <button
              className="w-7 h-7 inline text-default-white rounded-md border border-soft-primary bg-primary transition-all cursor-pointer hover:bg-dark-primary hover:border-primary active:border-dark-primary"
              onClick={() => setActiveFilters(!activeFilters)}
              title="Filtros"
            >
              <i className="bi bi-funnel-fill"></i>
            </button>
            <p className="ml-3 inline text-primary font-medium">
              P&aacute;gina {instance.getState().pagination.pageIndex + 1} de{" "}
              {instance.getPageCount()}{" "}
            </p>
          </div>
          <div className="w-52">
            {instance.getFilteredRowModel().rows.length > 0 && (
              <CSVLink
                headers={columnsForCsv}
                data={dataForCsv}
                separator=";"
				className="flex h-10 justify-center px-2 items-center rounded-lg font-medium border-borders-light hover:border-borders text-borders text-base border-2 bg-borders-light transition-all "
                filename={`INVENTARIO ${new Date().toJSON().slice(0, 10)}`}
				>
				Exportar en .CSV
            	<i className="bi bi-file-earmark-spreadsheet hidden lg:flex text-xl ml-2"></i>
              </CSVLink>
            )}
          </div>
        </section>
        <section className="overflow-hidden rounded-lg border border-borders-light">
          <section className="overflow-x-scroll overflow-y-hidden">
            <table
              className={`table-data min-w-[1800PX] border-collapse bg-default-white overflow-hidden ${className}`}
            >
              <thead className="text-default-white bg-gray select-none">
                {instance.getHeaderGroups().map((headerGroup: any) => (
                  <tr key={headerGroup.id}>
                    {description === "Dispositivos" && (
                      <th className="w-10 p-2 text-center font-bold bg-gray">
                        <i className="bi bi-three-dots"></i>
                      </th>
                    )}
                    {headerGroup.headers.map((header: any) => (
                      <th
                        className="p-2 text-start font-bold bg-gray"
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {header.renderHeader()}
                            {activeFilters && header.column.getCanFilter() && (
                              <FilterTable column={header.column} />
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {instance.getRowModel().rows.map((row: any) => {
                  return (
                    <tr
                      className="border-t border-b border-borders-light last:border-b-0"
                      key={row.id}
                    >
                      {description === "Dispositivos" && (
                        <Link
                          href={`/device/${
                            row.original?.["id"]
                          }`}
                        >
                          <td
                            className="text-center text-gray transition-all cursor-pointer hover:bg-hover"
                            title="Ver detalles"
                          >
                            <i className="bi bi-eye-fill"></i>
                          </td>
                        </Link>
                      )}
                      {row.getVisibleCells().map((cell: any) => (
                        <td className="p-2" key={cell.id}>
                          {cell.renderCell()}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <section className="md:grid md:grid-cols-3 w-full px-4 border-t border-borders-light bg-gray-box items-center text-center">
            <div className="hidden md:flex items-center gap-3">
              <p className="font-medium text-dark-gray">P&aacute;gina: </p>
              <Input
                className="my-0 py-1 max-w-[60px]"
                type="number"
                value={(currentPage + 1).toString()}
                onChange={({value}) => {
                  if (Number(value) <= instance.getPageCount()) {
                    const page = value
                      ? Number(value) - 1
                      : 0;
                    instance.setPageIndex(page);
                    setCurrentPage(page);
                  }
                }}
              />
              <p className="font-medium text-dark-gray">Cantidad de filas: </p>
              <Select
                placeholder="Seleccionar"
                className="my-0 py-1 max-w-[60px]"
                defaultValue={String(instance.getState().pagination.pageSize)}
                onChange={({ value }) => {
                  instance.setPageSize(Number(value));
                }}
              >
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize}>
                    {pageSize}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex my-3 md:my-0 justify-center items-center gap-2 h-full">
              <button
                className={
                  instance.getCanPreviousPage()
                    ? nextPageClass
                    : nextPageClassDisabled
                }
                onClick={() => {
                  setCurrentPage(0);
                  instance.setPageIndex(0);
                }}
                disabled={!instance.getCanPreviousPage()}
                title="Primer página"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                className={
                  instance.getCanPreviousPage()
                    ? nextPageClass
                    : nextPageClassDisabled
                }
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  instance.previousPage();
                }}
                disabled={!instance.getCanPreviousPage()}
                title="Página anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                className={
                  instance.getCanNextPage()
                    ? nextPageClass
                    : nextPageClassDisabled
                }
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  instance.nextPage();
                }}
                disabled={!instance.getCanNextPage()}
                title="Página siguiente"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
              <button
                className={
                  instance.getCanNextPage()
                    ? nextPageClass
                    : nextPageClassDisabled
                }
                onClick={() => {
                  setCurrentPage(instance.getPageCount() - 1);
                  instance.setPageIndex(instance.getPageCount() - 1);
                }}
                disabled={!instance.getCanNextPage()}
                title="Última página"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
            <p className="font-medium text-borders text-end">
              {description} encontrados:{" "}
              {instance.getFilteredRowModel().rows.length}
            </p>
          </section>
        </section>
      </Fragment>
    );

  return (
    <Triangle
      height="80"
      width="80"
      color="#990000"
      ariaLabel="triangle-loading"
      wrapperStyle={{
        margin: "20px 0",
        justifyContent: "center",
      }}
    />
  );
};

export default TableData;
