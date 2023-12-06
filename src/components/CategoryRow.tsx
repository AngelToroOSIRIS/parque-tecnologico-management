import { CategoryComplete } from "@/types/d";
import { Chip, ChipProps, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import TextareaForm from "./forms/TextareaForm";
import InputForm from "./forms/InputForm";
import toast from "react-hot-toast";
import useValidateForm from "@/hooks/useValidateForm";
import Button from "./Button";
import SelectForm from "./forms/SelectForm";
import { useAppSelector } from "@/redux/hook";

const CategoryRow = ({
  titulo,
  identificador,
  estado,
  descripcion,
}: {
  titulo: any;
  identificador: any;
  estado: any;
  descripcion: any;
}) => {
  const [contentModal, setContentModal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CategoryComplete[]>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const statusColorMap: Record<string, ChipProps["color"]> = {
    1: "success",
    0: "danger",
  };

  const categories = useAppSelector((state) => state.categoriesReducer);
  console.log(categories.data);
  const router = useRouter();
  const categoryData = useValidateForm([
    { name: "titulo", type: "str", required: true },
    {
      name: "identificador",
      type: "str",
      required: true,
    },
    {
      name: "descripcion",
      type: "str",
      required: true,
    },
  ],{
    loadData: !loading ? true : false,
    status: loading ? "loading" : "charged",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryData.validData) {
      return toast.error("Por favor complete el formulario", { id: "empty" });
    }
    setLoading(true);
    const toastLoading = toast.loading("Guardando información...", {
      id: "Save",
    });
  };
  return (
    <>
      <Modal
        setIsOpen={setShowModal}
        isOpen={showModal}
        classContainer={
          contentModal === "Editar"
            ? "w-[95%] max-w-[800px]"
            : "w-[95%] max-w-[750px]"
        }
      >
        {contentModal === "Inhabilitar" && (
          <>
            <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
              Inhabilitar categoría
            </h1>
            <div>
              <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                ¿Seguro que quiere Inhabilitar la categoría <b>{titulo}</b>?
              </p>
            </div>
            <div className="flex items-center gap-7 pb-3 justify-center text-center">
              <div className="mt-5">
                <button
                  onClick={() => {}}
                  type="button"
                  className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                >
                  Inhabilitar categoría
                </button>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex font-base hover:font-bold outline-none border-none transition-all justify-center rounded-lg px-4 text-lg"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </>
        )}
        {contentModal === "Habilitar" && (
          <>
            <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
              Habilitar categoría
            </h1>
            <div>
              <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                ¿Seguro que quiere Habilitar la categoría <b></b>?
              </p>
            </div>
            <div className="flex items-center gap-7 pb-3 justify-center text-center">
              <div className="mt-5">
                <button
                  onClick={() => {}}
                  type="button"
                  className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                >
                  Habilitar categoría
                </button>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex font-base hover:font-bold outline-none border-none transition-all justify-center rounded-lg px-4 text-lg"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </>
        )}

        {contentModal === "Editar" && (
          <>
            <h1 className="m-5 text-center text-2xl font-bold text-primary mx-auto justify-center items-center">
              Editar categoria
            </h1>
            <div className="mx-auto rounded-lg">
              <form
                onSubmit={handleSubmit}
                className="W-full m-2 rounded-lg px-12 gap-2"
              >
                <InputForm
                  name="titulo"
                  defaultValue={titulo}
                  label={{ required: true, value: "Nombre:" }}
                  placeholder="Nombre de la categoría"
                  onChange={categoryData.setField}
                  validations={{
                    required: "Este campo es obligatorio",
                    maxLength: {
                      value: 30,
                      message: "Maxímo se pueden ingresar 30 caracteres",
                    },
                  }}
                />
                <InputForm
                  name="identificador"
                  placeholder="Identificador de la categoría"
                  defaultValue={identificador}
                  validations={{
                    required: "Este campo es obligatorio",
                    maxLength: {
                      value: 30,
                      message: "Maxímo se pueden ingresar 30 caracteres",
                    },
                  }}
                  label={{ required: true, value: "Nombre identificador:" }}
                  onChange={categoryData.setField}
                  description="*Por favor ingresar un nombre válido en minúscula y sin caracteres especiales (Ejemplo: Nombre: Deportes, identificador: sports)*"
                />

                <SelectForm
                  name="state_category"
                  defaultValue={estado}
                  required={true}
                  onChange={() => {}}
                  label={{ required: true, value: "Estado:" }}
                  placeholder="Seleccionar estado"
                >
                  <SelectItem key={1}>Activo</SelectItem>
                  <SelectItem key={2}>Inactivo</SelectItem>
                </SelectForm>
                <TextareaForm
                  name="descripcion"
                  defaultValue={descripcion}
                  placeholder="Descripción de la categoría"
                  onChange={categoryData.setField}
                  minRows={5}
                  label={{
                    required: true,
                    value: "Descripción:",
                  }}
                  validations={{
                    required: "La observación del sitio es obligatoria",
                    minLength: {
                      message:
                        "Se requiere mínimo 15 caracteres en la observación",
                      value: 15,
                    },
                    maxLength: {
                      message:
                        "Se admiten máximo 200 caracteres en la observación",
                      value: 200,
                    },
                  }}
                />
                <div className="flex-center justify-between my-5 gap-6 px-10">
                  <Button
                    type="submit"
                    text="Continuar"
                    disabled={!categoryData.validData}
                  />
                  <Button text="Cancelar" onClick={() => setShowModal(false)} />
                </div>
              </form>
            </div>
          </>
        )}
      </Modal>

      <article className="flex justify-between items-center h-20 mx-auto py-2">
        <div className="w-[20%] h-full px-2 items-center flex">
          <p className="text-base font-semibold">{titulo}</p>
        </div>
        <div className="w-[20%] h-full px-2 items-center flex-center">
          <p className="text-default-500">{identificador}</p>
        </div>
        <div className="w-[10%] h-full px-2 items-center flex-center">
          <Chip
            className="capitalize border-none gap-1"
            color={statusColorMap[estado]}
            size="lg"
            variant="dot"
          >
            <p>{estado === "1" ? "Activo" : "Inactivo"}</p>
          </Chip>
        </div>
        <div className="w-[45%] h-full px-2 items-center overflow-y-auto rounded-lg pt-3">
          {descripcion}
        </div>
        <div className="w-[10%] h-full px-2 items-center text-center text-xl flex-center">
          <i
            title="Editar categoría"
            className="mr-2 ml-1 block bi bi-pencil text-borders hover:text-custom-black"
            onClick={() => {
              setShowModal(true);
              setContentModal("Editar");
            }}
          ></i>
          <i
            title="Editar imágenes categoría"
            onClick={() => {
              router.push("");
            }}
            className="mr-2 ml-1 block bi bi-images text-borders hover:text-custom-black transition-all"
          ></i>
          <i
            title={estado === "1" ? "Inactivar categoría" : "Activar categoría"}
            onClick={() => {
              setShowModal(true);
              setContentModal("Habilitar");
            }}
            className={
              estado === "1"
                ? "mr-2 ml-1 block bi bi-dash-circle text-borders hover:text-primary transition-all"
                : "mr-2 ml-1 block bi bi-plus-circle text-borders hover:text-primary transition-all"
            }
          ></i>
        </div>
      </article>
    </>
  );
};

export default CategoryRow;
