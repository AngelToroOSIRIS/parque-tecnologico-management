"use client";

import { Button, Select, SelectItem, Textarea, user } from "@nextui-org/react";
import Input from "@/components/Input";
import { statusOptions, users } from "@/components/table/data";
import SwitchComponent from "@/components/Switch";
import { useRouter } from "next/navigation";
import { Category } from "@/app/[category]/page";


const FormSite = ({ params }: { params: { id: string, category: Category } }) => {
  const router = useRouter();
  return (
    <>
        <div className=" w-[80%] h-[80%] rounded-lg mb-44 mx-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mt-7 m-20 p-7">
        <div className="w-[83%] gap-16 mt-7 flex mx-auto p-2 ">
          <i className="bi bi-upload flex text-borders-light items-center justify-center border-3 border-dotted border-borders-light rounded-lg p-10 text-5xl ">
            <p className="p-5 text-base text-center">
              Subir imagenes: <br /> <b> minimo 3 y maximo 10</b><br />resolucion recomendada: <b>1920*1080</b>
            </p>
          </i>
          
          <div className="p-10 mx-auto w-[70%] md:flex-nowrap mb-6 md:mb-0 ">
            <Input
              type="text"
              labelPlacement="outside"
              classNames={{
                input: "bg-default-white",
              }}
              variant={"faded"}
              label="Nombre"
            />
            <Input
              className="my-8"
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
        <div className="w-[85%] gap-16 flex mx-auto p-5">
          <div className="mx-auto w-[60%] justify-center items-center">
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
              variant="bordered"
              label="Descripción"
              labelPlacement="outside"
              placeholder="Ingrese la descripción del sitio"
              className="max-w-xl mx-auto min-h-xl mt-5 "
            />
          </div>
          <div className="grid grid-cols-2 w-[50%]  mx-auto p-5 justify-center items-center">
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
        <div className=" flex items-center mx-auto w-[full] justify-center mt-8 gap-5">
          <Button
            onClick={() => router.push("/")}
            color="primary"
            className="font-semibold"
            variant="ghost"
          >
            Guardar
          </Button>
          <Button
            onClick={() => router.push(`/${params.category}`)}
            color="primary"
            className="font-semibold"
            variant="ghost"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </>
  )
}

export default FormSite