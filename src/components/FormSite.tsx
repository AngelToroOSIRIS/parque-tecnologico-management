"use client";

import { useState, useEffect } from "react";
import { SelectItem, Textarea } from "@nextui-org/react";
import Switch from "@/components/Switch";
import InputForm from "./forms/InputForm";
import SelectForm from "./forms/SelectForm";
import useValidateForm from "@/hooks/useValidateForm";
import Button from "./Button";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Category, Enlace, States } from "@/types/d";
import SectionImage from "@/components/forms/SectionImage";
import { TailSpin } from "react-loader-spinner";
import TextareaForm from "./forms/TextareaForm";

const FormSite = ({ site }: { site?: any }) => {
  const { data: session, status } = useSession();
  const {
    validData,
    getData: dataForm,
    setField,
  } = useValidateForm([
    { name: "id_categoria", type: "int", required: true },
    { name: "id_estado_espacio", type: "int", required: true },
    { name: "id_identificador_enlace", type: "int", required: true },
    { name: "nombre", type: "str", required: true },
    { name: "descripcion_corta", type: "str", required: true },
    { name: "descripcion", type: "str", required: true },
    { name: "activo_coworking", type: "str", required: true },
    { name: "activo_interno", type: "str", required: true },
  ]);

  const [content, setContent] = useState<"sites" | "images">("sites");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [dataFilters, setDataFilters] = useState<{
    categorias: Category[];
    estadoEspacios: States[];
    enlaceCodigo: Enlace[];
  }>({ categorias: [], estadoEspacios: [], enlaceCodigo: [] });

  const getData = async () => {
    const response = await fetchFn(
      `/characteristicsPlace?email=${session?.user.emailHash}`
    );
    if (response.code !== 200) {
      return toast.error("No se han podido obtener los filtros", { id: "1" });
    }

    setDataFilters(response.data);
    setLoadingData(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validData) return toast.error("Por favor complete el formulario");
    console.log(dataForm);
    setLoading(true);
    const toastLoading = toast.loading("Guardando información...");
    const res = await fetchFn(`/place?email=${session?.user.emailHash}`, {
      method: "POST",
      body: {
        ...dataForm,
        activo_coworking: "0",
        activo_interno: "0",
        id_estado_espacio: dataFilters.estadoEspacios.find(
          (estado) => estado.descripcion === "Inactivo"
        )?.id,
      },
    });
    setLoading(false);

    if (res.code !== 200) {
      return toast.error("No se ha podido guardar", { id: toastLoading });
    }

    setContent("images");
    return toast.success("El sitio se ha guardado exitosamente", {
      id: toastLoading,
    });
  };

  useEffect(() => {
    if (status === "authenticated") getData();
  }, [status]);

  return (
    <>
      {!loadingData && content === "sites" && (
        <form onSubmit={handleSubmit}>
          <h1 className="mx-auto text-3xl text-center font-semibold m-6 text-primary">
            Datos:
          </h1>
          <div className="w-[95%] items-center justify-center mx-auto gap-x-10 flex py-1 px-5">
            <InputForm
              type="number"
              name="id_identificador_enlace"
              label={{
                required: true,
                value: "id_identificador_enlace:",
              }}
              validations={{
                required: "Se requiere un id_identificador_enlace",
                maxLength: {
                  value: 50,
                  message:
                    "El id_identificador_enlace debe contener máximo 50 caracteres.",
                },
              }}
              onChange={setField}
            />
          </div>
          <div className="w-[95%] items-center justify-center mx-auto gap-x-10 flex py-1 px-5">
            <InputForm
              type="text"
              name="nombre"
              label={{
                required: true,
                value: "Nombre:",
              }}
              validations={{
                required: "Se requiere un nombre",
                maxLength: {
                  value: 50,
                  message: "El nombre debe contener máximo 50 caracteres.",
                },
              }}
              onChange={setField}
            />
            <InputForm
              placeholder="Ingresar descripción corta"
              type="text"
              name="descripcion_corta"
              label={{
                required: true,
                value: "Descripción corta:",
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
          <div className="w-[95%] items-center justify-center mx-auto gap-10 flex py-1 px-5">
            <SelectForm
              name="id_categoria"
              placeholder="Seleccionar categoria"
              label={{
                value: "Categoria:",
              }}
              onChange={setField}
            >
              {dataFilters.categorias.map((categoria) => (
                <SelectItem key={categoria.id} value={categoria.id}>
                  {categoria.descripcion}
                </SelectItem>
              ))}
            </SelectForm>
            <SelectForm
              name="id_estado_espacio"
              placeholder="Seleccionar el estado"
              label={{
                required: true,
                value: "Estado:",
              }}
              onChange={setField}
            >
              {dataFilters.estadoEspacios.map((estado) => (
                <SelectItem key={estado.id} value={estado.id}>
                  {estado.descripcion}
                </SelectItem>
              ))}
            </SelectForm>
          </div>
          <SelectForm
            name="Id Enlace"
            placeholder="Seleccionar Id Enlace"
            label={{
              value: "Seleccionar Id Enlace:",
            }}
            onChange={setField}
          >
            {dataFilters.enlaceCodigo.map((enlace) => (
              <SelectItem key={enlace.id} value={enlace.id}>
                {enlace.llave}
              </SelectItem>
            ))}
          </SelectForm>
          <div className="w-[95%] items-center justify-center mx-auto gap-10 flex py-3 px-5">
            <div className="mx-auto w-[50%] justify-center items-center">
              <TextareaForm
                name="descripcion"
                onChange={setField}
                placeholder="Ingresar descripción completa"
                minRows={8}
                label={{
                  required: true,
                  value: "Descripción:",
                }}
                validations={{
                  required: "Se requiere descripción",
                  minLength: {
                    value: 15,
                    message:
                      "La descripción debe contener minimo 20 caracteres.",
                  },
                  maxLength: {
                    value: 32000,
                    message:
                      "La descripción debe contener máximo 32000 caracteres.",
                  },
                }}
              />
            </div>
            <div className="grid grid-cols-2 w-[50%] gap-3 mx-auto p-5 text-center justify-center items-center">
              <p>Wifi:</p>
              <Switch onChange={() => {}} />
              <p>Cafe:</p>
              <Switch onChange={() => {}} />
              <p>Proyector:</p>
              <Switch onChange={() => {}} />
              <p>PC:</p>
              <Switch onChange={() => {}} />
            </div>
          </div>
          <div className="flex mx-auto m-10 gap-2 justify-center items-center">
            <p className="mr-5 "> Visible Coworking: </p>
            <Switch
              onChange={(value: boolean) =>
                setField({ name: "activo_coworking", value: value ? "1" : "0" })
              }
            />
            <p className="ml-5 mr-5">Visible Internos: </p>
            <Switch
              onChange={(value: boolean) =>
                setField({ name: "activo_interno", value: value ? "1" : "0" })
              }
            />
          </div>
          <div className="flex items-center mx-auto w-[full] justify-center mt-8 gap-5">
            <Button type="submit" text="Continuar" />
            <Button
              //TODO:CAMBIAR RUTA
              route="/"
              text="Cancelar"
            />
          </div>
        </form>
      )}
      {content === "images" && (
        <>
          <SectionImage />
          <div className="flex items-center mx-auto w-[full] justify-center mt-8 gap-5">
            <Button text="Guardar" />
            <Button text="Cancelar" route="/" />
          </div>
        </>
      )}
      {loadingData && (
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

export default FormSite;
