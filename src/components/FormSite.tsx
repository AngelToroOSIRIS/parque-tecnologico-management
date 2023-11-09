"use client";

import { useState, useEffect } from "react";
import { Checkbox, Input, SelectItem, Textarea } from "@nextui-org/react";
import Switch from "@/components/Switch";
import InputForm from "./forms/InputForm";
import SelectForm from "./forms/SelectForm";
import useValidateForm from "@/hooks/useValidateForm";
import Button from "./Button";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Category, CategoryTextShort, Enlace, States } from "@/types/d";
import SectionImage from "@/components/forms/SectionImage";
import { TailSpin } from "react-loader-spinner";
import TextareaForm from "./forms/TextareaForm";
import { categoriesObj } from "@/libs/staticData";
import { redirect } from "next/navigation";


interface Props {
  params: { category: CategoryTextShort };
}

const FormSite = ({ params }: Props) => {
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
    identificadoresEnlace: Enlace[];
  }>({ categorias: [], estadoEspacios: [], identificadoresEnlace: [] });

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

    if (!validData)
    return toast.error("Por favor complete el formulario", { id: "empty" });
    setLoading(true);
    const toastLoading = toast.loading("Guardando información...", {
      id: "Save",
    });
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
      <h1 className="mx-auto text-3xl text-center  font-semibold m-6 text-primary">
        Datos:
      </h1>
      {!loadingData && content === "sites" && (
        <form onSubmit={handleSubmit}>
          <div className="w-[95%] items-center min-w-[60%]  justify-center mx-auto gap-x-10 lg:flex py-1 px-5">
            <InputForm
              onChange={() => {}}
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
              // onChange={({ value }) => {setField})}
            />
            <SelectForm
              name="id_identificador_enlace"
              placeholder="Seleccionar Identificador de enlace"
              label={{
                value: "Identificador de Enlace:",
              }}
              onChange={setField}
            >
              {dataFilters.identificadoresEnlace.map((enlace) => (
                <SelectItem key={enlace.id} value={enlace.id}>
                  {enlace.llave}
                </SelectItem>
              ))}
            </SelectForm>
          </div>
          <div className="w-[95%] items-center justify-center mx-auto gap-10 lg:flex py-1 px-5">
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
          <div className="w-[95%] items-center justify-center mx-auto gap-10 lg:flex py-5 px-5">
            <div className="mx-auto lg:w-[50%] justify-center items-center">
              <TextareaForm
                name="descripcion_corta"
                placeholder="Ingresar descripción corta completa"
                minRows={2}
                label={{
                  required: true,
                  value: "Descripción corta:",
                }}
                validations={{
                  required: "Se requiere descripción corta",
                  minLength: {
                    value: 15,
                    message:
                      "La descripción corta debe contener minimo 15 caracteres.",
                  },
                  maxLength: {
                    value: 250,
                    message:
                      "La descripción corta debe contener máximo 250 caracteres.",
                  },
                }}
                onChange={setField}
              />
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
            <div className=" lg:w-[50%] lg:-mt-12 grid grid-rows-2 mx-auto">
              <div className="flex  p-2 gap-10 items-center">
                <div className="mx-auto">
                  <Input
                    radius="full"
                    size="lg"
                    variant="faded"
                    label="Capacidad:"
                    labelPlacement="outside-left"
                    name="capacity"
                    type="number"
                    placeholder="0"
                    description="* Personas"
                    className="mt-1 mb-[10px] outline-none select-none "
                    classNames={{
                      inputWrapper: "bg-[#ffff]",
                      errorMessage: "text-sm font-medium",
                    }}
                  />
                </div>
                <div className=" mx-auto">
                  <Input
                    radius="full"
                    size="lg"
                    variant="faded"
                    type="number"
                    label="Precio:"
                    labelPlacement="outside-left"
                    placeholder="0"
                    description="* Hora"
                    className="mt-1 mb-[10px] outline-none select-none "
                    classNames={{
                      inputWrapper: "bg-[#ffff]",
                      errorMessage: "text-sm font-medium",
                    }}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mx-auto items-center">
                <p>Wifi:</p>
                <Checkbox />
                <p>Cafe:</p>
                <Checkbox />
                <p>Proyector:</p>
                <Checkbox />
                <p>PC:</p>
                <Checkbox />
              </div>
            </div>
          </div>
          <div className="flex mx-auto m-10 px-10 lg:px-[470px] gap-2 justify-center items-center">
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
          <div className="flex items-center mx-auto w-full md:w-[30%] justify-center mt-8 gap-5">
            <Button type="submit" text="Continuar" />
            <Button
              //TODO:CAMBIAR RUTA
              route="/"
              text="Cancelar"
            />
          </div>
        </form>
      )}
      {content === "images" && <SectionImage />}
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
