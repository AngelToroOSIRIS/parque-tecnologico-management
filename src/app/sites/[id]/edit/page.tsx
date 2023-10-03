"use client";

import Header from "@/components/Header";
import {
  Checkbox,
  Chip,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import Input from "@/components/Input";
import { statusOptions, users } from "@/components/table/data";
import SwitchComponent from "@/components/Switch";

export default function EditPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <div className=" w-[80%] h-[80%] mt-32 mx-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] m-20 p-7">
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
        <div className="flex w-full mt-[20px] justify-between mx-auto">
          <div className="mx-auto w-[50%] justify-center items-center">
            <Select
              items={users}
              label="Estado del sitio"
              variant={"faded"}
              labelPlacement="outside"
              placeholder="Seleccione un estado"
              selectionMode="single"
              className="max-w-xl mx-auto"
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
              className="max-w-xl mx-auto min-h-xl mt-5"
            />
          </div>
            <div className="w-[10%] my-auto border-3 border-dotted border-borders-light rounded-lg mx-auto  text-center">
              <i className="bi bi-upload m-auto text-5xl p-3 w-full"></i>
              <p className="p-5">Subir imagenes de referencia</p>
            </div>
          <div className="grid grid-cols-2 w-[20%]  mx-auto p-5 justify-center items-center">
            <p>Wifi:</p>
            <SwitchComponent />
            <p>Cafe:</p>
            <SwitchComponent />
            <p>Proyector:</p>
            <SwitchComponent />
            <p>PC:</p>
            <SwitchComponent />
          </div>
        </div>
      </div>
    </>
  );
}
