"use client";

import { useState, useEffect } from "react";
import { SelectItem } from "@nextui-org/react";
import SwitchComponent from "@/components/Switch";
import { useRouter } from "next/navigation";
import InputForm from "./forms/InputForm";
import SelectForm from "./forms/SelectForm";
import useValidateForm from "@/hooks/useValidateForm";
import Button from "./Button";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Category, States } from "@/types/d";
import SectionImage from "@/components/forms/SectionImage";
import { TailSpin } from "react-loader-spinner";

const FormSite = ({ site }: { site?: any }) => {
  const router = useRouter();
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
  }>({ categorias: [], estadoEspacios: [] });

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

    setLoading(true);
    const toastLoading = toast.loading("Guardando información...")
    const res = await fetchFn(`/place?email=${session?.user.emailHash}`, {
      method: "POST",
      body: dataForm,
    });
    setLoading(false);

    if (res.code !== 200) {
      return toast.error("No se ha podido guardar", { id: toastLoading });
    }

    setContent("images")
    return toast.success("El sitio se ha guardado exitosamente", { id: toastLoading });
  };

  useEffect(() => {
    if (status === "authenticated") getData();
  }, [status]);

  return (
    <>
      {!loadingData && content === "sites" && (
        <form onSubmit={handleSubmit}>
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
            <SelectForm
              type="text"
              name="ubicacion"
              label={{ required: true, value: "Ubicación" }}
              onChange={setField}
            >
              {dataFilters.categorias.map((categoria) => (
                <SelectItem key={categoria.id} value={categoria.id}>
                  {categoria.descripcion}
                </SelectItem>
              ))}
            </SelectForm>
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
            <SelectForm name="estado" onChange={() => {}}>
              {dataFilters.estadoEspacios.map((estado) => (
                <SelectItem key={estado.id} value={estado.id}>
                  {estado.descripcion}
                </SelectItem>
              ))}
            </SelectForm>
          </div>
          <div className="w-[95%] items-center justify-center mx-auto gap-x-10 flex py-1 px-5">
            <InputForm
              type="text"
              name="activo_coworking"
              label={{
                required: true,
                value: "activo_coworking:",
              }}
              validations={{
                required: "Se requiere un activo_coworking",
                maxLength: {
                  value: 50,
                  message:
                    "El activo_coworking debe contener máximo 50 caracteres.",
                },
              }}
              onChange={setField}
            />
            <InputForm
              type="text"
              name="activo_interno"
              label={{
                required: true,
                value: "activo_interno:",
              }}
              validations={{
                required: "Se requiere un activo_interno",
                maxLength: {
                  value: 50,
                  message:
                    "El activo_interno debe contener máximo 50 caracteres.",
                },
              }}
              onChange={setField}
            />
          </div>
          <div className="w-[95%] items-center justify-center mx-auto gap-10 flex py-3 px-5">
            <div className="mx-auto w-[50%] gap-10 justify-center items-center">
              <InputForm
                placeholder="Ingresar descripción corta"
                type="text"
                name="descripcion_corta"
                label={{
                  required: true,
                  value: "Descripción corta del sitio:",
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

              <InputForm
                placeholder="Ingresar descripción"
                type="text"
                name="descripcion"
                label={{
                  required: true,
                  value: "Descripción del sitio:",
                }}
                validations={{
                  required: "Se requiere descripción del sitio.",
                  minLength: {
                    value: 15,
                    message:
                      "La descripción debe contener minimo 15 caracteres.",
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
            <Button route="/" text="Continuar" key={1} />
            <Button
              route="/"
              text="Cancelar"
              key={2}
              //TODO:CAMBIAR RUTA
              onClick={() => router.push(`/sports`)}
            />
          </div>
        </form>
      )}
      {content === "images" && (
          <SectionImage />
      )}
      {loadingData &&(
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
