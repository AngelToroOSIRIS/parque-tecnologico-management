"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hook";
import { Chip, ChipProps, ScrollShadow, SelectItem } from "@nextui-org/react";
import InputForm from "./forms/InputForm";
import SelectForm from "./forms/SelectForm";
import TextareaForm from "./forms/TextareaForm";
import Button from "./Button";
import Modal from "./Modal";
import toast from "react-hot-toast";
import useValidateForm from "@/hooks/useValidateForm";
import { TailSpin } from "react-loader-spinner";
import { CategoryComplete } from "@/types/d";

const CategoriesComponent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dataCategory, setDataCategory] = useState<CategoryComplete[]>();
  const [contentModal, setContentModal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const statusColorMap: Record<string, ChipProps["color"]> = {
    1: "success",
    0: "danger",
  };
  const categories = useAppSelector((state) => state.categoriesReducer);


  const validData = useValidateForm([
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
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validData.validData) {
      return toast.error("Por favor complete el formulario", { id: "empty" });
    }
  };
  
  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
    }
  }, []);
  return (
    <>
      {!loading && (
        <>
          <Modal
            setIsOpen={setShowModal}
            isOpen={showModal}
            classContainer={
              contentModal === "Editar"
                ? "w-[95%] max-w-[800px]"
                : "w-[95%] max-w-[500px]"
            }
          >
            {contentModal === "Inhabilitar" && (
              <>
                <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
                  Inhabilitar categoría
                </h1>
                <div>
                  <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                    ¿Seguro que quiere Inhabilitar la categoría <b></b>?
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
                      label={{ required: true, value: "Nombre:" }}
                      placeholder="Nombre de la categoría"
                      onChange={validData.setField}
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
                      validations={{
                        required: "Este campo es obligatorio",
                        maxLength: {
                          value: 30,
                          message: "Maxímo se pueden ingresar 30 caracteres",
                        },
                      }}
                      label={{ required: true, value: "Nombre identificador:" }}
                      onChange={validData.setField}
                      description="*Por favor ingresar un nombre válido en minúscula y sin caracteres especiales (Ejemplo: Nombre: Deportes, identificador: sports)*"
                    />

                    <SelectForm
                      name="state_category"
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
                      placeholder="Descripción de la categoría"
                      onChange={validData.setField}
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
                        disabled={!validData.validData}
                      />
                      <Button
                        text="Cancelar"
                        onClick={() => setShowModal(false)}
                      />
                    </div>
                  </form>
                </div>
              </>
            )}
          </Modal>
          <div className="w-full overflow-x mb-10 max-w-[1400px] mx-auto p-3 bg-default-white rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <div className="p-3 flex justify-end">
              <button
                onClick={() => router.push("/categories/add")}
                className="bg-borders-light px-2 py-1 border-2 items-center justify-center font-medium border-borders-light hover:border-default-400 transition-all text-borders rounded-xl"
              >
                Añadir categoría
                <i className="bi bi-plus-circle ml-2 text-xl "></i>
              </button>
            </div>
            <section className="w-full p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-[#ffffff] rounded-xl">
              <article className="flex h-10 rounded-lg p-2 items-center justify-between select-none bg-borders-light text-borders text-md font-semibold">
                <div className="w-[20%] ml-2">TÍTULO</div>
                <div className="w-[20%] text-center">IDENTIFICADOR</div>
                <div className="w-[10%] text-center">ESTADO</div>
                <div className="w-[45%] text-center">DESCRIPCIÓN</div>
                <div className="w-[10%] text-center">OPCIONES</div>
              </article>
              {categories.data.map((category) => (
                <article key={category.id} className="flex justify-between items-center h-28 mx-auto py-2">
                  <div className="w-[20%] h-full px-2 items-center flex">
                    <p className="text-base font-semibold">{category.titulo}</p>
                  </div>
                  <div className="w-[20%] h-full px-2 items-center flex-center">
                    <p className="text-default-500">{category.identificador}</p>
                  </div>
                  <div className="w-[10%] h-full px-2 items-center text-center flex-center">
                    <Chip
                      className="capitalize border-none gap-1"
                      color={statusColorMap[category.estado]}
                      size="lg"
                      variant="dot"
                    >
                      <p>{category.estado === "1" ? "Activo" : "Inactivo"}</p>
                    </Chip>
                  </div>
                  <div className="w-[45%] h-full px-2 items-center rounded-lg pt-3">
                    <ScrollShadow className="h-[80px]" size={20}>
                      {category.descripcion}
                    </ScrollShadow>
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
                        router.push(
                          `/categories/${category.identificador}/edit/images`
                        );
                      }}
                      className="mr-2 ml-1 block bi bi-images text-borders hover:text-custom-black transition-all"
                    ></i>
                    <i
                      title={
                        category.estado === "1"
                          ? "Inactivar categoría"
                          : "Activar categoría"
                      }
                      onClick={() => {
                        setShowModal(true);
                        setContentModal(
                          category.estado === "1" ? "Inhabilitar" : "Habilitar"
                        );
                      }}
                      className={
                        category.estado === "1"
                          ? "mr-2 ml-1 block bi bi-dash-circle text-borders hover:text-primary transition-all"
                          : "mr-2 ml-1 block bi bi-plus-circle text-borders hover:text-primary transition-all"
                      }
                    ></i>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </>
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

export default CategoriesComponent;
