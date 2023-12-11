"use client";

import { siteInitialState } from "@/libs/InitialsStates";
import fetchFn from "@/libs/fetchFn";
import { Site } from "@/types/d";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import Modal from "./Modal";
import { ContentImageEdit } from "./ContentImageEdit";

export function EditImagesComponent({ id }: { id?: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [action, setAction] = useState<1 | 2 | 3>();
  const [contentModal, setContentModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataSite, setDataSite] = useState<Site>(siteInitialState);

  const getImages = async () => {
    setLoading(true);
    const response = await fetchFn(`/getPlace/${id}`);
    if (response.code !== 200) {
      return toast.error("No se ha podido obtener la info", { id: "1" });
    }
    setDataSite(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      {!loading && (
        <>
          <Modal
            setIsOpen={setShowModal}
            isOpen={showModal}
            classContainer="max-w-[1000px]"
          >
            <i
              className="bi bi-x absolute text-borders top-2 right-3 hover:text-primary text-3xl transition-all cursor-pointer"
              onClick={() => setShowModal(false)}
            ></i>
            {contentModal === "images" && (
              <>
                <h1 className="text-3xl text-center font-semibold mt-5 mb-2 text-primary">
                  {action === 1 ? "Cambiar" : "Añadir"} imagen
                </h1>
                <ContentImageEdit  />
              </>
            )}
            {contentModal === "eliminar" && (
              <>
                <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
                  Eliminar imagen
                </h1>
                <div>
                  <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                    ¿Seguro que quiere eliminar la imagen?
                  </p>
                </div>
                <div className="flex items-center gap-7 pb-3 justify-center text-center">
                  <div className="mt-5">
                    <button
                      onClick={() => {}}
                      type="button"
                      className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                    >
                      Eliminar imagen
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
          <h1 className="margin-header mb-10 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
            Editar imágenes {dataSite.nombre}
          </h1>
          <div className="mx-auto w-[85%] rounded-lg shadow-xl bg-gray-box mb-14 text-center ">
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto m-5 p-5 gap-7">
                {dataSite.images.map((site) => (
                  <>
                    <div className="grid">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASEURL}/image?imageName=${site.img_big}`}
                        className="border-[10px] border-default-300 rounded-lg"
                        alt="Imagen lugar"
                        radius="none"
                      />
                      <div>
                        <button
                          className="bg-borders-light rounded-lg m-2 p-2 hover:font-semibold transition-all"
                          onClick={() => {
                            setContentModal("images");
                            setShowModal(true);
                            setAction(1);
                          }}
                        >
                          Cambiar
                        </button>
                        <button
                          className="bg-borders-light rounded-lg m-2 p-2 hover:text-primary hover:font-semibold transition-all"
                          onClick={() => {
                            setContentModal("eliminar");
                            setShowModal(true);
                            setAction(3);
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </>
                ))}
                {dataSite.images.length < 10 && (
                  <div className="w-full grid justify-center items-center rounded-lg">
                    <button
                      onClick={() => {
                        setContentModal("images");
                        setShowModal(true);
                        setAction(2);
                      }}
                      className="border-[5px] transition-all border-dotted p-5 text-2xl text-default-400 hover:text-soft-blue hover:border-soft-blue border-default-300 rounded-3xl"
                    >
                      Añadir imagen
                    </button>
                  </div>
                )}
              </div>
            </>
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
}
