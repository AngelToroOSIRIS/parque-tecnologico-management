import fetchFn from "@/libs/fetchFn";
import { includesString } from "@/libs/functionsStrings";
import { SelectItem, Tooltip } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Rol, UsersAndRoles } from "@/types/d";
import Select from "../forms/Select";
import toast from "react-hot-toast";

const UserRow = ({ user, roles, getData }: { user: UsersAndRoles; roles: Rol[]; getData:any }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [changedRols, setChangedRoles] = useState<boolean>(false);
  const [asignedRols, setasignedRols] = useState<string[]>(
    user.roles.map((rol) => String(rol.id))
  );
  const [selectedRols, setSelectedRols] = useState<string[]>(
    user.roles.map((rol) => String(rol.id))
  );

  const deleteUser = async () => {
    const response = await fetchFn(
      `/deleteUser?email=${session?.user.emailHash}`,
      {
        method: "DELETE",
        body: {
          email: user.email,
        },
      }
    );
    console.log(response)
    if (response.code !== 200) {
      return toast.error("No se ha podido eliminar el usuario.", {
        id: "1",
      });
    }
    getData()
    if(response.data.message){
      return toast.success(response.data.message, {id:"4"})
    }
  };
  const saveRols = async () => {
    const response = await fetchFn(
      `/updateUser?email=${session?.user.emailHash}`,
      {
        method: "PUT",
        body: {
          email: user.email,
          roles: selectedRols.map((rol) => Number(rol)),
        },
      }
    );
    if (response.code !== 200) {
      return toast.error("No se ha podido actualizar el usuario.", {
        id: "2",
      });
    }
    getData()
      return toast.success(("Usuario actualizado correctamente "), {id:"5"})
  };
  useEffect(() => {
    setChangedRoles(String(selectedRols.sort()) !== String(asignedRols.sort()));
  }, [selectedRols]);

  return (
    <article className="my-5 grid grid-cols-3 items-center">
      <div className="wfull text-lg">
        {user.email?.substring(0, user.email?.search("@"))}
        <p className="text-sm text-default-400">{user.email}</p>
      </div>
      <div>
        <Select
          name="rol"
          placeholder="Seleccionar rol"
          selectionMode="multiple"
          disabledKeys={
            includesString(session?.user.rols ?? [], ["superadmin"])
              ? undefined
              : ["1"]
          }
          className="max-w-xs outline-none"
          disallowEmptySelection={true}
          defaultValues={selectedRols}
          onChange={({ value }) => {
            const values = !value
              ? []
              : value?.length === 1
              ? [value]
              : value.split(",");
            setSelectedRols(values);
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
          className={`mx-1 outline-none ${
            changedRols
              ? "font-semibold rounded-lg shadow-xl bg-off-white"
              : "hidden"
          }`}
          content="Guardar cambios"
        >
          <button
            onClick={() => {
              if (changedRols) saveRols();
            }}
            className={`mx-1 outline-none ${
              changedRols ? "text-borders" : "text-borders-light cursor-default"
            }`}
          >
            <i className="bi bi-floppy text-xl"></i>
          </button>
        </Tooltip>
        {/* <Tooltip
          className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
          content="Eliminar usuario"
        > */}
        <button
          onClick={() => {
            deleteUser();
          }}
          className="mx-1 text-borders outline-none hover:text-primary transition-all"
        >
          <i className="bi bi-trash3 text-xl"></i>
        </button>
        {/* </Tooltip> */}
      </div>
    </article>
  );
};

export default UserRow;
