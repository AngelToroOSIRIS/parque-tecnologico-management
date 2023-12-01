import { Category } from "@/types/d";
import { Chip, ChipProps } from "@nextui-org/react";
import React, { useState } from "react";
import Modal from "./Modal";

const CategoryRow = ({ category }: { category: Category }) => {
  const [contentModal, setContentModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const statusColorMap: Record<string, ChipProps["color"]> = {
    1: "success",
    0: "danger",
  };
  return (
    <>
      <Modal
        setIsOpen={setShowModal}
        isOpen={showModal}
        classContainer="w-[95%] max-w-[500px]"
      >
        {contentModal === "Inhabilitar" && (
          <>
            <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
              Inhabilitar categoría
            </h1>
            <div>
              <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                ¿Seguro que quiere Inhabilitar la categoría <b>{category.titulo}</b>?
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
      </Modal>

      <article className="flex justify-between items-center h-20 mx-auto py-2">
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
        <div className="w-[45%] h-full px-2 items-center overflow-y-auto rounded-lg pt-3">
          {category.descripcion}
        </div>
        <div className="w-[10%] h-full px-2 items-center text-center text-xl flex-center">
          <i className="mr-2 ml-1 block bi bi-pencil"></i>
          <i
            onClick={() => {
              setShowModal(true);
              setContentModal("Inhabilitar");
            }}
            className="mr-2 ml-1 block bi bi-dash-circle hover:text-primary transition-all"
          ></i>
        </div>
      </article>
    </>
  );
};

export default CategoryRow;
