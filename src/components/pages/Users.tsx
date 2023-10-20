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
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import fetchFn from "@/libs/fetchFn";

const Users = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const updateSession = async (email: string) => {
    const response = await fetchFn(`/login?email=${email}`);
    if (response.code !== 200) return router.push("/logout?error=auth");
    if (response.data.interno) {
      await update({
        ...session,
        user: { ...session?.user, interno: true },
      });
      return;
    }
    if(response.data){

    }
  };
  return (
    <>
      <h1 className="margin-header mx-auto text-3xl text-center rounded-lg font-semibold m-6 text-primary">
        Usuarios
      </h1>
      <div className="w-[85%] mx-auto p-3 bg-default-white rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
        <div className="p-3 flex justify-end">
          <button
            onClick={() => router.push("/users/add")}
            className="bg-borders-light px-1 border-2 items-center justify-center font-medium border-borders-light hover:border-borders transition-all text-borders rounded-lg"
          >
            Añadir usuario
            <i className="bi bi-person-plus-fill ml-2 text-xl "></i>
          </button>
        </div>
        <Table aria-label="Table">
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
                  radius="lg"
                  size="sm"
                  className="max-w-xs outline-none"
                  variant="faded"
                  classNames={{
                    trigger: "bg-[#ffffff]",
                  }}
                >
                  <SelectItem key={1}>Auditorios</SelectItem>
                  <SelectItem key={2}>Espacios Deportivos</SelectItem>
                  <SelectItem key={3}>Laboratorios</SelectItem>
                  <SelectItem key={4}>Salas de Juntas</SelectItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  aria-label="permiso"
                  placeholder="Seleccionar Permisos"
                  size="sm"
                  radius="lg"
                  variant="faded"
                  className="max-w-xs outline-none"
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
                  radius="lg"
                  size="sm"
                  variant="faded"
                  className="max-w-xs outline-none"
                  classNames={{
                    trigger: "bg-[#ffffff]",
                  }}
                >
                  <SelectItem key={1}>Auditorios</SelectItem>
                  <SelectItem key={2}>Espacios Deportivos</SelectItem>
                  <SelectItem key={3}>Laboratorios</SelectItem>
                  <SelectItem key={4}>Salas de Juntas</SelectItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  size="sm"
                  aria-label="permiso"
                  placeholder="Seleccionar Permisos"
                  variant="faded"
                  className="max-w-xs outline-none"
                  radius="lg"
                  classNames={{
                    trigger: "bg-[#ffffff]",
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
                  radius="lg"
                  placeholder="Seleccionar rol"
                  className="max-w-xs outline-none"
                  classNames={{
                    trigger: "bg-[#ffffff]",
                  }}
                >
                  <SelectItem key={1}>Auditorios</SelectItem>
                  <SelectItem key={2}>Espacios Deportivos</SelectItem>
                  <SelectItem key={3}>Laboratorios</SelectItem>
                  <SelectItem key={4}>Salas de Juntas</SelectItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  aria-label="permiso"
                  placeholder="Seleccionar Permisos"
                  size="sm"
                  radius="lg"
                  className="max-w-xs outline-none"
                  variant="faded"
                  classNames={{
                    trigger: "bg-[#ffffff]",
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
