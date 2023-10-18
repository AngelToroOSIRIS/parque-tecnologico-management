"use client";

import {
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

const Users = () => {
  return (
    <>
      <h1 className="margin-header mx-auto text-3xl text-center rounded-lg font-semibold m-6 text-primary">
        Usuarios
      </h1>
      <div className="w-[85%] mx-auto shadow-xl">
        <Table aria-label="Table" className="rounded-lg">
          <TableHeader>
            <TableColumn className="bg-borders-light text-md">
              CORREO
            </TableColumn>
            <TableColumn className="bg-borders-light text-md">ROL</TableColumn>
            <TableColumn className="bg-borders-light text-md">
              PERMISO
            </TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="text-md font-medium">
                angel.toro@escuelaing.edu.co
                <p className="text-bold text-sm capitalize text-default-400">
                  Angel Stiven Toro Fuentes
                </p>
              </TableCell>
              <TableCell className="text-md">
                <Select
                  placeholder="Seleccionar rol"
                  aria-label="rol"
                  size="sm"
                  className="max-w-xs"
                  variant="faded"
                  classNames={{
                    trigger: "bg-[#ffffff]"
                }}
                >
                  <SelectItem key={1}>Auditorios</SelectItem>
                  <SelectItem key={2}>Espacios Deportivos</SelectItem>
                  <SelectItem key={3}>Laboratorios</SelectItem>
                  <SelectItem key={4}>Salas de Juntas</SelectItem>
                  <SelectItem key={5}>SuperAdmin</SelectItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  aria-label="permiso"
                  placeholder="Seleccionar Permisos"
                  size="sm"
                  variant="faded"
                  className="max-w-xs"
                  classNames={{
                    trigger: "bg-[#ffffff]",
                }}
                >
                  <SelectItem key={1}>Editar</SelectItem>
                  <SelectItem key={2}>Consulta</SelectItem>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell className="text-md font-medium">
                camilo.galindo-r@escuelaing.edu.co
                <p className="text-bold text-sm capitalize text-default-400">
                  Camilo Andres Galindo Rivera
                </p>
              </TableCell>
              <TableCell className="text-md">
                <Select
                  aria-label="rol"
                  placeholder="Seleccionar rol"
                  size="sm"
                  variant="faded"
                  className="max-w-xs"
                  classNames={{
                    trigger: "bg-[#ffffff]"
                }}
                >
                  <SelectItem key={1}>Auditorios</SelectItem>
                  <SelectItem key={2}>Espacios Deportivos</SelectItem>
                  <SelectItem key={3}>Laboratorios</SelectItem>
                  <SelectItem key={4}>Salas de Juntas</SelectItem>
                  <SelectItem key={5}>SuperAdmin</SelectItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  variant="flat"
                  size="sm"
                  aria-label="permiso"
                  placeholder="Seleccionar Permisos"
                  variant="faded"
                  className="max-w-xs"
                  classNames={{
                    trigger: "bg-[#ffffff]"
                }}
                >
                  <SelectItem key={1}>Editar</SelectItem>
                  <SelectItem key={2}>Consulta</SelectItem>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className="text-md font-medium">
                sebastian.valbuena@escuelaing.edu.co
                <p className="text-bold text-sm capitalize text-default-400">
                  Sebastian Arturo Valbuena Acosta
                </p>
              </TableCell>
              <TableCell className="text-md">
                <Select
                  aria-label="rol"
                  size="sm"
                  variant="faded"
                  placeholder="Seleccionar rol"
                  className="max-w-xs"
                  classNames={{
                    trigger: "bg-[#ffffff]"
                }}
                >
                  <SelectItem key={1}>Auditorios</SelectItem>
                  <SelectItem key={2}>Espacios Deportivos</SelectItem>
                  <SelectItem key={3}>Laboratorios</SelectItem>
                  <SelectItem key={4}>Salas de Juntas</SelectItem>
                  <SelectItem key={5}>SuperAdmin</SelectItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  aria-label="permiso"
                  placeholder="Seleccionar Permisos"
                  size="sm"
                  className="max-w-xs"
                  variant="faded"
                  classNames={{
                    trigger: "bg-[#ffffff]"
                }}
                >
                  <SelectItem key={1}>Editar</SelectItem>
                  <SelectItem key={2}>Consulta</SelectItem>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Users;
