"use client";

import {
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { includesString } from "@/libs/functionsStrings";
import LoadingPage from "./LoadingPage";
import Modal from "../Modal";

const Users = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState<boolean>(true);
  const [roles, setRoles] = useState<
    {
      id: number;
      descripcion: string;
      identificador: string;
    }[]
  >([]);
  const [dataUsers, setDataUsers] = useState<
    {
      email: string;
      roles: { id: number; descripcion: string }[];
    }[]
  >([]);

  const getData = async () => {
    setLoading(true);
    const response = await fetchFn(
      `/getUsersAndRoles?email=${session?.user.emailHash}`
    );
    if (response.code !== 200) {
      return toast.error("No se han podido obtener los filtros", {
        id: "1",
      });
    }
    const res = await fetchFn(`/getRoles`);
    if (res.code !== 200) {
      return toast.error("No se han podido obtener los datos", {
        id: "2",
      });
    }
    setDataUsers(response.data);
    setRoles(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") getData();
  }, [status]);

  return (
    <>
      <h1 className="margin-header mx-auto text-3xl text-center rounded-lg font-semibold m-6 text-primary">
        Usuarios
      </h1>
      {!loading && (
        <>
          <div className="w-[95%] max-w-5xl mx-auto p-3 bg-default-white rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <div className="p-3 flex justify-end">
              <button
                onClick={() => router.push("/users/add")}
                className="bg-borders-light px-2 py-1 border-2 items-center justify-center font-medium border-borders-light hover:border-borders transition-all text-borders rounded-lg"
              >
                Añadir usuario
                <i className="bi bi-person-plus-fill ml-2 text-xl "></i>
              </button>
            </div>
            <Table aria-label="Table">
              <TableHeader className="justify-between">
                <TableColumn className="bg-borders-light text-md">
                  CORREO
                </TableColumn>
                <TableColumn className="bg-borders-light text-md">
                  ROL
                </TableColumn>
                <TableColumn className="bg-borders-light text-md">
                  OPCIONES
                </TableColumn>
              </TableHeader>
              <TableBody>
                {dataUsers.map((item, i) => {
                  return (
                    <TableRow key="1">
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        <Select
                          aria-label="rol"
                          placeholder="Seleccionar rol"
                          radius="lg"
                          size="sm"
                          selectionMode="multiple"
                          disabledKeys={
                            includesString(session?.user.rols ?? [], [
                              "superadmin",
                            ])
                              ? undefined
                              : ["1"]
                          }
                          variant="faded"
                          className="max-w-xs outline-none"
                          defaultSelectedKeys={item.roles.map((rol) =>
                            String(rol.id)
                          )}
                          classNames={{
                            trigger: "bg-[#ffffff]",
                          }}
                        >
                          {roles.map((rol) => (
                            <SelectItem value={rol.id} key={rol.id}>
                              {rol.descripcion}
                            </SelectItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          className="font-semibold rounded-lg shadow-xl bg-off-white"
                          content="Guardar cambios"
                        >
                          <span
                            onClick={() => router.push("/")}
                            className="text-lg m-3 text-soft-gray hover:text-soft-blue cursor-pointer active:opacity-50 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                          >
                            <i className="bi bi-floppy text-xl"></i>
                          </span>
                        </Tooltip>
                        <Tooltip
                          className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
                          content="Eliminar usuario"
                        >
                          <span className="text-lg m-3 text-soft-gray hover:text-primary cursor-pointer active:opacity-50 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                            <i className="bi bi-trash3 text-xl"></i>
                             {/* <Modal
                        title="Eliminar usuario"
                        text="¿Esta seguro de eliminar el usuario?"
                        option1="Eliminar"
                        onClick={()=>router.push("/")}
                      ></Modal> */}
                          </span>
                        </Tooltip>
                      </TableCell>
                      {/* <TableCell>{item.roles[0].descripcion}</TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {loading && (
        <>
          <LoadingPage />
        </>
      )}
    </>
  );
};

export default Users;
