"use client";

import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import InputForm from "./forms/InputForm";
import Button from "./Button";
import { TailSpin } from "react-loader-spinner";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { includesString } from "@/libs/functionsStrings";

const FormUser = ({ site }: { site?: any }) => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<boolean>(false);
  const [roles, setRoles] = useState<
    {
      id: number;
      descripcion: string;
      identificador: string;
    }[]
  >([]);

  const getData = async () => {
    const res = await fetchFn(`/getRoles`);
    if (res.code !== 200) {
      return toast.error("No se han podido obtener los datos", {
        id: "1",
      });
    }
    console.log(res.data);
    setRoles(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!loading && (
        <form>
            <InputForm
              type="text"
              name="usuario"
              label={{
                required: true,
                value: "Usuario:",
              }}
              validations={{
                required: "Se requiere un nombre de usuario",
                maxLength: {
                  value: 50,
                  message: "El nombre debe contener máximo 50 caracteres.",
                },
              }}
              onChange={() => {}}
            />
            <Select
              placeholder="Asignar Rol"
              aria-label="rol"
              label="Rol"
              labelPlacement="outside"
              radius="full"
              selectionMode="multiple"
              size="lg"
              className="outline-none"
              variant="faded"
              disabledKeys={
                includesString(session?.user.rols ?? [], ["superadmin"])
                  ? undefined
                  : ["1"]
              }
              classNames={{
                label: "text-base ml-3",
                errorMessage: "text-sm font-medium",
                value: "text-base",
                trigger: "bg-[#ffffff]",
              }}
            >
              {roles.map((rol) => (
                <SelectItem value={rol.id} key={rol.id}>
                  {rol.descripcion}
                </SelectItem>
              ))}
            </Select>
          <div className="flex items-center mx-auto w-[50%] justify-center mt-8 gap-5">
            <Button type="submit" text="Continuar" />
            <Button
              //TODO:CAMBIAR RUTA
              route="/users"
              text="Cancelar"
            />
          </div>
        </form>
      )}
      {loading && (
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
      )}
    </>
  );
};

export default FormUser;
