"use client";

import Header from "@/components/Header";
import { Checkbox, Select, SelectItem, Textarea } from "@nextui-org/react";
import Input from "@/components/Input";
import { statusOptions, users } from "@/components/table/data";
import SwitchComponent from "@/components/Switch";

export default function EditPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <div className=" w-[80%] h-[80%] mt-32 mx-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] m-20 p-5">
        <p className="text-center mt-5 text-primary font-semibold text-3xl">
          Editar sitio {params.id}
        </p>

        <div className="mt-10">
          <div className="w-full flex gap-5">
            <div className="flex px-10 w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-7">
              <Input
                className=""
                type="text"
                labelPlacement="outside"
                classNames={{
                  input: "bg-default-white",
                }}
                variant={"faded"}
                label="Nombre"
              />
              <Input
                type="text"
                labelPlacement="outside"
                classNames={{
                  input: "bg-default-white",
                }}
                variant={"faded"}
                label="Ubicación"
              />
              <Input
                type="text"
                labelPlacement="outside"
                classNames={{
                  input: "bg-default-white",
                }}
                variant={"faded"}
                label="Tipo"
              />
            </div>
          </div>
        </div>
        <div className=" w-[50%] mt-[4%] h-[50%] gap-4 justify-center items-center">
          <Select
            label="Estado del sitio"
            variant={"faded"}
            labelPlacement="outside"
            placeholder="Seleccione un estado"
            selectionMode="single"
            className="max-w-md "
          >
            {statusOptions.map((statusOptions) => (
              <SelectItem key={statusOptions.uid} value={statusOptions.uid}>
                {statusOptions.name}
              </SelectItem>
            ))}
          </Select>
          <Textarea
          variant="faded"
            label="Descripción"
            labelPlacement="outside"
            placeholder="Ingrese la descripción del sitio"
            className="max-w-md mt-5"
          />
        </div>
        <Checkbox/>
        <SwitchComponent/>
        <SwitchComponent/>
        <SwitchComponent/>
        <SwitchComponent/>
      </div>
    </>
  );
}
