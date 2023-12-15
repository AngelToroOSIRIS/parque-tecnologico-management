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
import { Rol } from "@/types/d";
import GraySubtitle from "./GraySubtitle";
import { useRouter } from "next/navigation";

const FormUser = () => {
  const router = useRouter();
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
    if (selectedRols.length === 0)
      return toast.error("Se necesita minimo un rol para crear el usuario");
    if (!emailUser) {
      return toast.error("Se necesita un correo para crear el usuario", {
        id: "2",
      });
    }

    const response = await fetchFn(
      `/createUser?email=${session?.user.emailHash}`,
      {
        method: "POST",
        body: {
          email: emailUser,
          roles:  includesString(selectedRols, ["1"])
          ? [1]
          : selectedRols.map((rol) => Number(rol)),
        },
      }
    );

    if (response.code !== 200) {
      if (response.data.message) {
        return toast.error(response.data.message, { id: "4" });
      }
      return toast.error("No se ha podido crear el usuario", {
        id: "3",
      });
    }
    if (includesString(selectedRols, ["1"])) {
      toast("Superadmin concede permisos globales", {
        icon: "💡",
      });
    }
    toast.success("Usuario creado exitosamente!", { id: "2" });
    router.push("/users");
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
            description="* Solo se permiten correos @escuelaing.edu.co"
            label={{
              required: true,
              value: "Email:",
            }}
            validations={{
              required: "Se requiere un email",
              validateEmail: true,
              maxLength: {
                value: 100,
                message: "El email debe contener máximo 100 caracteres.",
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
          <div className="flex items-center mx-auto w-[70%] justify-center mt-8 gap-5">
            <Button type="submit" text="Agregar" disabled={!emailUser} />
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
