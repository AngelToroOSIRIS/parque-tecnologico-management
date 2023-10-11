"use client";

import { SelectItem } from "@nextui-org/react";
import { statusOptions, users } from "@/components/table/data";
import SwitchComponent from "@/components/Switch";
import { useRouter } from "next/navigation";
import InputForm from "./forms/InputForm";
import SelectForm from "./forms/SelectForm";
import useValidateForm from "@/hooks/useValidateForm";
import Button from "./Button";

const FormSite = ({ site }: { site?: any }) => {
  const router = useRouter();
  const { validData, getData, setField } = useValidateForm([
    { name: "password", type: "str", required: true },
  ]);
  return (
    <>
      <div className="w-[95%] gap-10 flex mx-auto p-5">
        {/* <i className="bi bi-upload flex my-10 text-borders-light items-center justify-center border-3 border-dotted border-borders-light rounded-lg p-5 text-5xl ">
            <p className="p-5 text-base text-center">
              Subir imagenes: <br /> <b> minimo 3 y maximo 10</b>
              <br />
              resolucion recomendada: <b>1920*1080</b>
            </p>
          </i> */}

        <div className="p-10 mx-auto w-[90%] md:flex-nowrap mb-6 md:mb-0 ">
          <InputForm
            type="text"
            name="nombre del sitio"
            label={{
              required: true,
              value: "Nombre del sitio",
            }}
            validations={{
              required: "Se requiere nombre del sitio.",
              maxLength: {
                value: 30,
                message: "El nombre debe contener máximo 30 caracteres.",
              },
            }}
            onChange={setField}
          />
          <InputForm
            type="text"
            name="ubicación del sitio"
            label={{
              required: true,
              value: "Ubicación del sitio",
            }}
            validations={{
              required: "Se requiere ubicación del sitio.",
              maxLength: {
                value: 50,
                message: "La ubicación debe contener máximo 50 caracteres.",
              },
            }}
            onChange={setField}
          />
          <SelectForm
            name="category_site"
            placeholder="Seleccionar Categoria"
            label={{
              value: "Categoria",
            }}
            onChange={() => {}}
          >
            {[
              { text: "Auditorio", value: "auditoriums" },
              { text: "Espacio Deportivo", value: "Sport" },
              { text: "Laboratorio", value: "laboratories" },
              { text: "Sala de junta", value: "meetings" },
            ].map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.text}
              </SelectItem>
            ))}
          </SelectForm>
        </div>
      </div>
      <div className="w-[95%] gap-16 flex mx-auto p-5">
        <div className="mx-auto w-[60%] justify-center items-center">
          <SelectForm name="Estado" onChange={() => {}}>
            {statusOptions.map((statusOptions) => (
              <SelectItem key={statusOptions.uid} value={statusOptions.uid}>
                {statusOptions.name}
              </SelectItem>
            ))}
          </SelectForm>
          <InputForm
            type="text"
            name="descripción"
            label={{
              required: true,
              value: "Descripción corta del sitio",
            }}
            validations={{
              required: "Se requiere descripción corta del sitio.",
              minLength: {
                value: 15,
                message:
                  "La descripción corta debe contener minimo 15 caracteres.",
              },
              maxLength: {
                value: 250,
                message:
                  "La descripción corta debe contener máximo 200 caracteres.",
              },
            }}
            onChange={setField}
          />
        </div>
        <div className="grid grid-cols-2 w-[50%] gap-3 mx-auto p-5 text-center justify-center items-center">
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
      <div className="flex mx-auto m-10 gap-2 justify-center items-center">
        <p className="mr-5 "> Visible Coworking: </p>
        <SwitchComponent />
        <p className="ml-5 mr-5">Visible Internos: </p>
        <SwitchComponent />
      </div>
      <div className=" flex items-center mx-auto w-[full] justify-center mt-8 gap-5">
        <Button
          route="/"
          text="Continuar"
          key={1}
        />
        <Button
          route="/"
          text="Cancelar"
          key={2}
          //TODO:CAMBIAR RUTA
          onClick={() => router.push(`/sports`)}
        />
      </div>
    </>
  );
};

export default FormSite;
