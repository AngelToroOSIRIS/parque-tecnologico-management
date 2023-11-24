import fetchFn from "@/libs/fetchFn";
import { includesString } from "@/libs/functionsStrings";
import {
  Avatar,
  Chip,
  ChipProps,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
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
          roles: includesString(selectedRols, ["1"])
            ? [1]
            : selectedRols.map((rol) => Number(rol)),
        },
      }
    );
    if (response.code !== 200) {
      return toast.error("No se ha podido actualizar el usuario.", {
        id: "2",
      });
    }
    getData();

    if (includesString(selectedRols, ["1"])) {
      toast("Superadmin concede permisos globales", {
        icon: "💡",
      });
    }
    toast.success("Usuario actualizado correctamente");
    return;
  };
  const disabledUser = async () => {
    const res = await fetchFn(
      `/disableUser?email=${session?.user.emailHash}&emailUser=${user.email}`,
      {
        method: "PUT",
      }
    );
    if (res.code !== 200) {
      return toast.error("No se ha podido inactivar el usuario.", {
        id: "1",
      });
    }
    if (res.data.message) {
      return toast.success(res.data.message, { id: "4" });
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

  const statusColorMap: Record<string, ChipProps["color"]> = {
    Activo: "success",
    Inactivo: "danger",
  };

  return (
    <article className="my-5 flex w-auto justify-between items-center">
      {/* celda 1 */}
      <div className=" w-[30%] items-center justify-center">
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
      <div className="w-[30%]">
        <Select
          name="rol"
          isDisabled={user.estado === "Inactivo"}
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

      <div className="w-[10%] text-center">
        <Chip
          className="capitalize border-none gap-1"
          color={statusColorMap[user.estado]}
          size="lg"
          variant="dot"
        >
          <p className="text-lg font-medium text-borders contrast-50">
            {user.estado}
          </p>
        </Chip>
      </div>

      {/* celda 4 */}
      <div className="w-[10%] text-center justify-between ">
        {user.estado === "Activo" && (
          <>
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
                  changedRols
                    ? "text-borders transition-all"
                    : "text-borders-light transition-all cursor-default"
                }`}
              >
                <i className="bi bi-floppy text-xl"></i>
              </button>
            </Tooltip>

            <Tooltip
              className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
              content="Inactivar usuario"
            >
              <button
                onClick={() => {
                  onDeleteClick(user.email);
                }}
                className="mx-1 text-borders outline-none hover:text-primary transition-all"
              >
                <ModalIcon
                  button1="Inactivar usuario"
                  onClick={disabledUser}
                  text={`¿Seguro que quiere Inhabilitar el usuario ${user.email}?`}
                  title="Inactivar usuario"
                  icon="dash-circle"
                />
              </button>
            </Tooltip>
          </>
        )}
        {user.estado === "Inactivo" && (
          <>
            <Tooltip
            className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
            content="Activar usuario"
            >
              <button className="ml-7">
                <ModalIcon
                  button1="Activar usuario"
                  text={`¿Seguro que quiere activar el usuario ${user.email}?`}
                  title="Activar usuario"
                  icon="plus-circle "
                />
              </button>
            </Tooltip>
          </>
        )}
      </div>
    </article>
  );
};

export default UserRow;
