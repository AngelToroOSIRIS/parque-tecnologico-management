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
import Modal from "../Modal";

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
  const [contentModal, setContentModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [stateUser, setStateUser] = useState<boolean>();
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
  const updateUser = async () => {
    const res = await fetchFn(
      `/stateUser?email=${session?.user.emailHash}&emailUser=${user.email}&state=${stateUser}`,
      {
        method: "PUT",
      }
    );
    if (res.code !== 200) {
      return toast.error("No se ha podido actualizar el usuario.", {
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

  const statusColorMap: Record<string, ChipProps["color"]> = {
    Activo: "success",
    Inactivo: "danger",
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        setIsOpen={setShowModal}
        classContainer="w-[95%] max-w-[500px]"
      >
        {contentModal === "Inhabilitar" && (
          <>
            <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
              Inhabilitar usuario
            </h1>
            <div>
              <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                ¿Seguro que quiere Inhabilitar el usuario {user.email}?
              </p>
            </div>
            <div className="flex items-center gap-7 pb-3 justify-center text-center">
              <div className="mt-5">
                <button
                  onClick={() => {
                    updateUser();
                  }}
                  type="button"
                  className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                >
                  Inhabilitar usuario
                </button>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex font-base hover:font-bold outline-none border-none transition-all justify-center rounded-lg px-4 text-lg"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </>
        )}
        {contentModal === "Activar" && (
          <>
            <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
              Activar usuario
            </h1>
            <div>
              <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                ¿Seguro que quiere activar el usuario {user.email}?
              </p>
            </div>
            <div className="flex items-center gap-7 pb-3 justify-center text-center">
              <div className="mt-5">
                <button
                  onClick={() => {
                    updateUser();
                  }}
                  type="button"
                  className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                >
                  Activar usuario
                </button>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex font-base hover:font-bold outline-none border-none transition-all justify-center rounded-lg px-4 text-lg"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
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
                    setShowModal(true);
                    setContentModal("Inhabilitar");
                    setStateUser(false)
                    onDeleteClick(user.email);
                  }}
                  className="mx-1 text-borders outline-none hover:text-primary transition-all"
                >
                  <i className={`bi bi-dash-circle text-xl m-2`}></i>
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
                <button
                  onClick={() => {
                    setShowModal(true);
                    setStateUser(true)
                    setContentModal("Activar");
                    onDeleteClick(user.email);
                  }}
                  className="mx-1 text-borders outline-none hover:text-primary transition-all"
                >
                  <i className={`bi bi-plus-circle text-xl ml-7`}></i>
                </button>
              </Tooltip>
            </>
          )}
        </div>
      </article>
    </>
  );
};

export default UserRow;
