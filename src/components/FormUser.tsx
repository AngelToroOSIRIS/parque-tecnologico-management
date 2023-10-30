"use client";

import { useEffect, useState } from "react";
import { SelectItem } from "@nextui-org/react";
import InputForm from "./forms/InputForm";
import Button from "./Button";
import { TailSpin } from "react-loader-spinner";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { includesString } from "@/libs/functionsStrings";
import Select from "./forms/Select";
import { Rol, UsersAndRoles } from "@/types/d";
import GraySubtitle from "./Subtitle";

const FormUser = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRols, setSelectedRols] = useState<string[]>([]);
  const [emailUser, setEmailUser] = useState<string | null>(null);
  const [roles, setRoles] = useState<Rol[]>([]);

  const getData = async () => {
    const res = await fetchFn(`/getRoles`);
    if (res.code !== 200) {
      return toast.error("No se han podido obtener los datos", {
        id: "1",
      });
    }
    setRoles(res.data);
  };

  const newUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validar
    if (!emailUser) {
      return toast.error("Se necesita un correo para crear el usuario", {
        id: "1",
      });
    }

    const response = await fetchFn(`/createUser${session?.user.emailHash}`, {
      method: "POST",
      body: {
        email: emailUser,
        roles: selectedRols.map((rol) => Number(rol)),
      },
    });
    console.log(response.code);
    if (response.code !== 200) {
      return toast.error("No se han podido obtener los filtros", {
        id: "1",
      });
    }
    setLoading(false);
    toast.success("usuario creado exitosamente!", { id: "2" });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!loading && (
        <form onSubmit={newUser}>
          <InputForm
            type="text"
            name="email"
            label={{
              required: true,
              value: "Email:",
            }}
            validations={{
              required: "Se requiere un email",
              validateEmail: true,
              maxLength: {
                value: 50,
                message: "El email debe contener máximo 50 caracteres.",
              },
            }}
            onChange={({ value }) => setEmailUser(value)}
          />
          <GraySubtitle text={"Roles"} required={true} />
          <Select
            name="new user"
            placeholder="Asignar Rol"
            aria-label="rol"
            selectionMode="multiple"
            className="outline-none"
            disabledKeys={
              includesString(session?.user.rols ?? [], ["superadmin"])
                ? undefined
                : ["1"]
            }
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
          <div className="flex items-center mx-auto w-[65%] justify-center mt-8 gap-5">
            <Button type="submit" text="Agregar" disabled={!emailUser || !selectedRols["0"]} />
            <Button route="/users" text="Cancelar" />
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
