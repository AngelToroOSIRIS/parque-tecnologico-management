"use client";

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
import FilterTable from "./FilterTable";
import Input from "../forms/Input";
import Select from "../forms/Select";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";
import { Chip, ChipProps, SelectItem } from "@nextui-org/react";
import ButtonTable from "../ButtonTable";
import { CategoryTextShort, SiteTbl } from "@/types/d";
import {
  formatDate,
  includesString,
  stringIncludes,
} from "@/libs/functionsStrings";
import Modal from "../Modal";
import { useSession } from "next-auth/react";
import fetchFn from "@/libs/fetchFn";

interface Props {
  columnsArray: { accessor: string; header: string }[];
  dataArray: any[];
  createdTable: any;
  category: CategoryTextShort;
  description: string;
  className?: string;
}

const TableData: React.FC<Props> = ({
  columnsArray,
  category,
  dataArray,
  createdTable,
  description,
  className = "",
}: Props) => {
  const router = useRouter();
  let table = createdTable;
  const columns = useColumnsRows(columnsArray, table);

  const [data] = useState<any>(dataArray);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { data: session, status } = useSession();
  const userSession = session?.user ?? {
    name: "default",
    email: "useremail",
    rols: [],
  };
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const statusColorMap: Record<string, ChipProps["color"]> = {
    Activo: "success",
    Inactivo: "danger",
    Mantenimiento: "warning",
  };

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
      pQuery !== undefined ? (Number(pQuery) < 1 ? 0 : Number(pQuery) - 1) : 0;

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
        {instance.getFilteredRowModel().rows.length === 0 && (
          <>
            <div className="text-center text-default-300 select-none">
              <i className="bi bi-x-circle text-7xl"></i>
              <p className="text-4xl mt-[1%]">
                No existen espacios para está categoría <br />
                <p
                  className="py-2 text-center hover:text-blue transition-all hover:underline text-2xl cursor-pointer"
                  onClick={() => router.push(`/categories/${category}/sites/add`)}
                >
                  Click para crear sitio
                </p>
              </p>
            </div>
          </>
        )}
        {instance.getFilteredRowModel().rows.length > 0 && (
          <>
            <div className="bg-default-white mb-36 w-[95%] rounded-xl overflow-x-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mx-auto text-sm text-center p-3">
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
                    P&aacute;gina {instance.getState().pagination.pageIndex + 1}{" "}
                    de {instance.getPageCount()}{" "}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {instance.getFilteredRowModel().rows.length > 0 && (
                    <>
                      <div className="flex justify-between font-medium items-center gap-3">
                        {/* <CSVLink
                          headers={columnsForCsv}
                          data={dataForCsv}
                          separator=";"
                          className="flex h-10 justify-center px-2 items-center rounded-lg font-medium border-borders-light hover:border-borders text-borders text-base border-2 bg-borders-light transition-all "
                          filename={`EXPORT ${new Date()
                            .toJSON()
                            .slice(0, 10)}`}
                        >
                          Exportar en .CSV
                          <i className="bi bi-file-earmark-spreadsheet hidden lg:flex text-xl ml-2"></i>
                        </CSVLink> */}
                        <ButtonTable
                          text="Agenda general"
                          icon="calendar2-check"
                          onClick={() =>
                            router.push(`/categories/${category}/calendary`)
                          }
                          type="button"
                        />
                        {includesString(userSession.rols ?? [], [
                          "superadmin",
                          category,
                        ]) && (
                          <>
                            <ButtonTable
                              text="Solicitudes"
                              icon="exclamation-circle"
                              onClick={() =>
                                router.push(`/categories/${category}/requests`)
                              }
                              type="button"
                            />
                            <ButtonTable
                              text="Añadir sitio"
                              icon="plus-circle"
                              onClick={() => router.push(`/categories/${category}/sites/add`)}
                              type="button"
                            />
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </section>
              <section className="overflow-hidden rounded-lg border border-borders-light">
                <section className="overflow-y-auto 2xl:overflow-hidden">
                  <table
                    className={`table-data min-w-[1800PX] border-collapse overflow-hidden ${className}`}
                  >
                    <thead className="text-borders rounded-lg bg-borders-light select-none">
                      {instance.getHeaderGroups().map((headerGroup: any) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header: any) => (
                            <th
                              className="table-header"
                              key={header.id}
                              colSpan={header.colSpan}
                            >
                              {header.isPlaceholder ? null : (
                                <div>
                                  {header.renderHeader()}
                                  {activeFilters &&
                                    header.column.getCanFilter() && (
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
                          <tr className="" key={row.id}>
                            {row.getVisibleCells().map((cell: any) => {
                              const valueRender = cell
                                .renderCell()
                                .props.cell.getValue();
                              if (
                                stringIncludes(cell.column.id, [
                                  "fecha_creacion",
                                  "fecha_actualizacion",
                                ])
                              ) {
                                return (
                                  <td className="p-2" key={cell.id}>
                                    {formatDate(valueRender, true)}
                                  </td>
                                );
                              }
                              if (
                                stringIncludes(cell.column.id, [
                                  "estado_espacio",
                                ])
                              ) {
                                return (
                                  <Chip
                                    key={1}
                                    className="capitalize border-none gap-1"
                                    color={statusColorMap[valueRender]}
                                    size="lg"
                                    variant="dot"
                                  >
                                    {valueRender}
                                  </Chip>
                                );
                              }
                              if (stringIncludes(cell.column.id, ["options"])) {
                                return (
                                  <td className="p-2" key={cell.id}>
                                    <div className="relative justify-center flex items-center">
                                      <a
                                        title="Ver sitio"
                                        target="_blank"
                                        href={`${process.env.NEXT_PUBLIC_COWORKING_URL}/sites/${cell.row.original.id}`}
                                        className="text-lg outline-none text-default-400 cursor-pointer hover:text-custom-black transition-all"
                                      >
                                        <i className="bi bi-eye m-2 text-2xl"></i>
                                      </a>
                                      <span
                                        title="Ver agenda de sitio"
                                        onClick={() =>
                                          router.push(
                                            `/categories/${category}/sites/${cell.row.original.id}/calendar`
                                          )
                                        }
                                        className="text-lg outline-none text-default-400 cursor-pointer hover:text-custom-black transition-all"
                                      >
                                        <i className="bi bi-calendar2-check m-2 text-xl"></i>
                                      </span>
                                      {includesString(userSession.rols ?? [], [
                                        "superadmin",
                                        category,
                                      ]) && (
                                        <>
                                          <span
                                            title="Editar datos"
                                            onClick={() =>
                                              router.push(
                                                `/categories/${category}/sites/${cell.row.original.id}/edit`
                                              )
                                            }
                                            className="text-lg outline-none text-default-400 cursor-pointer hover:text-custom-black transition-all"
                                          >
                                            <i className="bi bi-pen m-2 text-xl"></i>
                                          </span>
                                          <span
                                            title="Editar imagenes"
                                            onClick={() =>
                                              router.push(
                                                `/categories/${category}/sites/${cell.row.original.id}/edit/images`
                                              )
                                            }
                                            className="text-lg outline-none text-default-400 cursor-pointer hover:text-custom-black transition-all"
                                          >
                                            <i className="bi bi-images m-2 text-xl"></i>
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                );
                              }
                              return (
                                <td className="p-2" key={cell.id}>
                                  {cell.renderCell()}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </section>
                {instance.getFilteredRowModel().rows.length > 5 && (
                  <section className="md:grid md:grid-cols-3 w-full px-4 border-t border-borders-light bg-gray-box items-center text-center">
                    <div className="hidden md:flex items-center gap-3">
                      <p className="font-medium text-dark-gray">Página: </p>
                      <Input
                        className="my-0 py-1 max-w-[80px]  "
                        type="number"
                        value={(currentPage + 1).toString()}
                        onChange={({ value }) => {
                          if (Number(value) <= instance.getPageCount()) {
                            const page = value ? Number(value) - 1 : 0;
                            instance.setPageIndex(page);
                            setCurrentPage(page);
                          }
                        }}
                      />
                      <p className="font-medium text-dark-gray">
                        Cantidad de filas:{" "}
                      </p>
                      <Select
                        placeholder="Seleccionar"
                        className="my-0 py-1 max-w-[80px]"
                        defaultValue={String(
                          instance.getState().pagination.pageSize
                        )}
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
                )}
              </section>
            </div>
          </>
        )}
      </Fragment>
    );

  return (
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
  );
};

export default TableData;
