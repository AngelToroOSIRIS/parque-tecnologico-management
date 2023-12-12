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
import useFormData from "@/hooks/UseFormData";
import fetchFileFn from "@/libs/fetchFileFn";
import { useSession } from "next-auth/react";

export function EditImagesComponent({ id }: { id?: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [action, setAction] = useState<1 | 2 | 3>(1);
  const [idImageSelected, setIdImageSelected] = useState<number>(0);
  const [contentModal, setContentModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataSite, setDataSite] = useState<Site>(siteInitialState);
  const { data: session } = useSession();

  const getImages = async () => {
    setLoading(true);
    const response = await fetchFn(`/getPlace/${id}`);
    if (response.code !== 200) {
      return toast.error("No se ha podido obtener la información", { id: "1" });
    }
    setDataSite(response.data);
    setLoading(false);
  };

  const { setData } = useFormData({
    minFiles: 1,
    maxFiles: 1,
    fdFilesName: "images",
  });

  const deleteImage = async () => {
    if (dataSite.images.length < 4) {
      toast.error("Debe tener al menos 3 imágenes", { id: "error1" });
      return;
    }
    const toastLoading = toast.loading("Eliminando imagen...");
    const fd = setData({
      id_espacio: id,
      id_imagen: idImageSelected,
      email: session?.user.emailHash,
      action: 3,
    });
    const response = await fetchFileFn(`/updateImagePlace`, {
      method: "PUT",
      formData: fd,
    });
    if (response.code !== 200) {
      toast.error("Ha ocurrido un error", { id: toastLoading });
      return;
    }
    toast.success("Imagen eliminada", { id: toastLoading });
    setShowModal(false);
    getImages();
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
            classContainer={
              contentModal === "images"
                ? " w-[95%] max-w-[900px]"
                : " w-[95%] max-w-[450px]"
            }
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
                <ContentImageEdit
                  idSite={id}
                  action={action}
                  idImage={idImageSelected}
                  onSuccessUpload={() => {
                    setShowModal(false);
                    getImages();
                  }}
                />
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
                      onClick={deleteImage}
                      type="button"
                      className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                    >
                      Eliminar
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
                {dataSite.images.map((image) => (
                  <div key={image.id} className="grid">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASEURL}/image?imageName=${image.img_big}`}
                      className="border-[10px] border-default-300 rounded-lg"
                      alt="Imagen lugar"
                      radius="none"
                    />
                    <div>
                      <button
                        className="bg-borders-light rounded-lg m-2 p-2 hover:font-semibold transition-all"
                        onClick={() => {
                          setContentModal("images");
                          setIdImageSelected(image.id);
                          setShowModal(true);
                          setAction(1);
                        }}
                      >
                        Cambiar
                      </button>
                      <button
                        className="bg-borders-light rounded-lg m-2 p-2 hover:text-primary hover:font-semibold transition-all"
                        onClick={() => {
                          setIdImageSelected(image.id);
                          setContentModal("eliminar");
                          setShowModal(true);
                          setAction(3);
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                {dataSite.images.length < 10 && (
                  <div className="w-full h-[400px] p-2 grid justify-center items-center rounded-lg">
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
              <p className="text-default-400 text-sm p-2 font-medium select-none">*Debe haber mínimo tres foto, máximo diez*</p>
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
