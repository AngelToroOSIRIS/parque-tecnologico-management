"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Chip, ChipProps, ScrollShadow, SelectItem } from "@nextui-org/react";
import Modal from "./Modal";
import useValidateForm from "@/hooks/useValidateForm";
import { TailSpin } from "react-loader-spinner";
import { CategoryComplete } from "@/types/d";
import ModalEditCategory from "./ModalEditCategory";
import toast from "react-hot-toast";
import fetchFn from "@/libs/fetchFn";
import { setCategories } from "@/redux/features/categoriesSlice";
import { useSession } from "next-auth/react";

const CategoriesComponent = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const [category, setCategory] = useState<CategoryComplete>();
  const [contentModal, setContentModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const categories = useAppSelector((state) => state.categoriesReducer);

  const getCategories = async () => {
    const response = await fetchFn(
      process.env.NEXT_PUBLIC_API_BASEURL + "/categories",
      {
        externalUrl: true,
      }
    );

    if (response.code !== 200) {
      return toast.error("No se han podido cargar las categorías", {
        id: "error1",
      });
    }

    dispatch(setCategories(response.data));
  };

  const disabledCategory = async (state: "1" | "0") => {
    if (!category) {
      return toast.error("Ha ocurrido un error", { id: "empty" });
    }
    const toastLoading = toast.loading("Actualizando categoría...", {
      id: "toast",
    });
    const response = await fetchFn("/updateCategory", {
      method: "PUT",
      body: {
        email: session?.user.emailHash,
        id_category: category?.id,
        identificador: category?.identificador,
        descripcion: category?.descripcion,
        titulo: category?.titulo,
        estado: state,
      },
    });
    if (response.code !== 200) {
      return toast.error("No se ha podido actualizar", { id: toastLoading });
    }
    toast.success("La categoría se ha actualizado exitosamente", {
      id: toastLoading,
    });
    getCategories();
    setShowModal(false);
  };

  useEffect(() => {
    if (categories.data.length > 0) {
      getCategories()
      setLoading(false);
    }
  }, [categories]);

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
                      type="button"
                      onClick={() => {
                        disabledCategory("0");
                      }}
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
                      onClick={() => {
                        disabledCategory("1");
                      }}
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
              <ModalEditCategory
                category={category}
                onCloseModal={() => {
                  setShowModal(false);
                  setCategory(undefined);
                }}
              />
            )}
          </Modal>
          <div className="w-full overflow-x mb-10 max-w-[1400px] mx-auto p-3 bg-default-white rounded-xl normal-shadow">
            <div className="p-3 flex justify-end">
              <button
                onClick={() => router.push("/categories/add")}
                className="bg-borders-light px-2 py-1 border-2 items-center justify-center font-medium border-borders-light hover:border-default-400 transition-all text-borders rounded-xl"
              >
                Añadir categoría
                <i className="bi bi-plus-circle ml-2 text-xl "></i>
              </button>
            </div>
            <section className="w-full p-5 normal-shadow bg-[#ffffff] rounded-xl">
              <article className="flex h-10 rounded-lg p-2 items-center justify-between select-none bg-borders-light text-borders text-md font-semibold">
                <div className="w-[20%] ml-2">TÍTULO</div>
                <div className="w-[20%] text-center">IDENTIFICADOR</div>
                <div className="w-[10%] text-center">ESTADO</div>
                <div className="w-[45%] text-center">DESCRIPCIÓN</div>
                <div className="w-[10%] text-center">OPCIONES</div>
              </article>
              {categories.data.map((category) => (
                <article
                  key={category.id}
                  className="flex justify-between items-center h-24 mx-auto py-2"
                >
                  <div className="w-[20%] h-full px-2 items-center flex">
                    <p className="text-base font-semibold">{category.titulo}</p>
                  </div>
                  <div className="w-[20%] h-full px-2 items-center flex-center">
                    <p className="text-default-500">{category.identificador}</p>
                  </div>
                  <div className="w-[10%] h-full px-2 items-center text-center flex-center">
                    <Chip
                      className="capitalize border-none gap-1"
                      color={category.estado === "1"? "success": "danger"}
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
                      className="mr-2 ml-1 block bi bi-pencil cursor-pointer text-borders hover:text-custom-black"
                      onClick={() => {
                        setShowModal(true);
                        setContentModal("Editar");
                        setCategory(category);
                      }}
                    ></i>
                    <i
                      title="Editar imágenes categoría"
                      onClick={() => {
                        router.push(
                          `/categories/${category.identificador}/edit/images`
                        );
                      }}
                      className="mr-2 ml-1 block bi bi-images cursor-pointer text-borders hover:text-custom-black transition-all"
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
                        setCategory(category);
                      }}
                      className={
                        category.estado === "1"
                          ? "mr-2 ml-1 block bi bi-dash-circle cursor-pointer text-borders hover:text-primary transition-all"
                          : "mr-2 ml-1 block bi bi-plus-circle cursor-pointer text-borders hover:text-primary transition-all"
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
