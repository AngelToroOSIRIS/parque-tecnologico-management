"use client";

import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import InputForm from "./forms/InputForm";
import Button from "./Button";
import { TailSpin } from "react-loader-spinner";

const FormUser = ({ site }: { site?: any }) => {

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
        <form>
          <div className="w-[95%] items-center justify-center mx-auto gap-x-10 flex py-1 px-5">
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
              onChange={()=>{}}
            />
            </div>
            <div className="w-[95%] justify-between mx-auto gap-3 flex py-1 px-5">
            <Select
                  placeholder="Asignar Rol"
                  aria-label="rol"
                  label="Rol"
                  labelPlacement="outside"
                  radius="full"
                  size="lg"
                  className="outline-none"
                  variant="faded"
                  classNames={{
                    label: "text-base ml-3",
                    errorMessage: "text-sm font-medium",
                    value: "text-base",
                    trigger: "bg-[#ffffff]"
                }}
                >
                  <SelectItem key={1}>Auditorios</SelectItem>
                  <SelectItem key={2}>Espacios Deportivos</SelectItem>
                  <SelectItem key={3}>Laboratorios</SelectItem>
                  <SelectItem key={4}>Salas de Juntas</SelectItem>
                </Select>
                <Select
                  aria-label="permiso"
                  label="Permisos"
                  labelPlacement="outside"
                  placeholder="Asignar Permisos"
                  size="lg"
                  radius="full"
                  variant="faded"
                  className="outline-none"
                  classNames={{
                    label: "text-base ml-3",
                    errorMessage: "text-sm font-medium",
                    value: "text-base",
                    trigger: "bg-[#ffffff]"
                }}
                >
                  <SelectItem key={1}>Editar</SelectItem>
                  <SelectItem key={2}>Consulta</SelectItem>
                </Select>
          </div>
          <div className="flex items-center mx-auto w-[full] justify-center mt-8 gap-5">
            <Button type="submit" text="Continuar" />
            <Button
              //TODO:CAMBIAR RUTA
              route="/users"
              text="Cancelar"
            />
          </div>
        </form>
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
