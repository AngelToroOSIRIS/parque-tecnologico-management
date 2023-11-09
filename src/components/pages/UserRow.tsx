import fetchFn from "@/libs/fetchFn";
import { includesString } from "@/libs/functionsStrings";
import { Avatar, Chip, SelectItem, Tooltip } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Rol, UsersAndRoles } from "@/types/d";
import Select from "../forms/Select";
import toast from "react-hot-toast";
import ModalIcon from "../ModalIcon";

const UserRow = ({
  user,
  roles,
  getData,
  onDeleteClick,
}: {
  user: UsersAndRoles;
  roles: Rol[];
  getData: any;
  onDeleteClick: (email: string) => void;
}) => {
  const { data: session } = useSession();
  const [changedRols, setChangedRoles] = useState<boolean>(false);
  const [asignedRols, setasignedRols] = useState<string[]>(
    user.roles.map((rol) => String(rol.id))
  );
  const [selectedRols, setSelectedRols] = useState<string[]>(
    user.roles.map((rol) => String(rol.id))
  );

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
    getData();
    return toast.success("Usuario actualizado correctamente ", { id: "5" });
  };
  const deleteUser = async () => {
    const res = await fetchFn(`/deleteUser?email=${session?.user.emailHash}`, {
      method: "DELETE",
      body: {
        email: user.email,
      },
    });
    console.log(res);
    if (res.code !== 200) {
      return toast.error("No se ha podido eliminar el usuario.", {
        id: "1",
      });
    }

    getData();
    if (res.data.message) {
      return toast.success(res.data.message, { id: "4" });
    }
  };

  const Name = user.email.toString().toUpperCase();

  useEffect(() => {
    setChangedRoles(String(selectedRols.sort()) !== String(asignedRols.sort()));
  }, [selectedRols]);

  return (
    <article className="my-5 flex w-auto items-center">
      {/* celda 1 */}
      <div className=" w-[40%] items-center justify-center">
        <Chip
          variant="light"
          size="lg"
          classNames={{
            avatar: "text-lg w-[40px] h-[40px] text-gray",
            base: "",
            content: "m-2 text-lg",
          }}
          avatar={
            <Avatar
              name={Name}
              size="lg"
              getInitials={(name) => name.charAt(0)}
            />
          }
        >
          {user.email?.substring(0, user.email?.search("@"))}
          <p className="text-sm text-default-400">{user.email}</p>
        </Chip>
      </div>
      {/* celda 2 */}
      <div className="w-[40%]">
        <Select
          name="rol"
          placeholder="Seleccionar rol"
          selectionMode="multiple"
          disabledKeys={
            includesString(session?.user.rols ?? [], ["superadmin"])
              ? undefined
              : ["1"]
          }
          className="max-w-lg outline-none"
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
      {/* celda 3 */}
      <div className="text-center justify-between w-[20%]">
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
              changedRols ? "text-borders transition-all" : "text-borders-light transition-all cursor-default"
            }`}
          >
            <i className="bi bi-floppy text-xl"></i>
          </button>
        </Tooltip>
        <Tooltip
          className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
          content="Eliminar usuario"
        >
          <button
            onClick={() => {
              onDeleteClick(user.email);
            }}
            className="mx-1 text-borders outline-none hover:text-primary transition-all"
          >
            <ModalIcon
              button1="Eliminar usuario"
              onClick={deleteUser}
              text={`¿Seguro que quiere eliminar el usuario ${user.email}?`}
              title="Eliminar usuario"
              icon="trash3"
            />
            {/* <i className="bi bi-trash3 text-xl"></i> */}
          </button>
        </Tooltip>
      </div>
    </article>
  );
};

export default UserRow;
