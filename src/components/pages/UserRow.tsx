import fetchFn from "@/libs/fetchFn";
import { includesString } from "@/libs/functionsStrings";
import { Select, SelectItem, Tooltip } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";

interface Props {
  disabled?: boolean;
}

const UserRow = ({ disabled }: Props) => {
  const classbtn =
    "text-lg m-3 text-soft-gray hover:text-soft-blue cursor-pointer transform transition-all";
  const router = useRouter();
  const { data: session, status } = useSession();
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
  };

  useEffect(() => {
    if (status === "authenticated") getData();
  }, [status]);

  return (
    <>
      {dataUsers.map((item, i) => {
        return (
          <article className="m-5 grid grid-cols-3 justify-between  items-center">
            <div className="wfull text-lg">
              {item.email?.substring(0, item.email?.search("@"))}
              <p className="text-sm text-default-400">{item.email}</p>
            </div>
            <div>
              <Select
                aria-label="rol"
                placeholder="Seleccionar rol"
                radius="lg"
                size="sm"
                selectionMode="multiple"
                disabledKeys={
                  includesString(session?.user.rols ?? [], ["superadmin"])
                    ? undefined
                    : ["1"]
                }
                variant="faded"
                className="max-w-xs outline-none"
                defaultSelectedKeys={item.roles.map((rol) => String(rol.id))}
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
            </div>
            <div className="mx-auto">
              <Tooltip
                className="font-semibold rounded-lg shadow-xl bg-off-white"
                content="Guardar cambios"
              >
                <button
                  disabled={disabled}
                  onClick={() => router.push("/")}
                  className={
                    disabled
                      ? "text-lg m-3 text-default-500 cursor-pointer transform transition-all"
                      : classbtn
                  }
                >
                  <i className="bi bi-floppy text-xl"></i>
                </button>
              </Tooltip>
              <Tooltip
                className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
                content="Eliminar usuario"
              >
                <button className="text-lg m-3 text-soft-gray hover:text-primary cursor-pointer transform transition-all">
                  <Modal
                    title="Eliminar usuario"
                    text="¿Esta seguro de eliminar el usuario?"
                    option1="Eliminar"
                    onClick={() => ({})}
                  ></Modal>
                  <i className="bi bi-trash3 text-xl"></i>
                </button>
              </Tooltip>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default UserRow;
