"use client";

import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Button from "../Button";
import { useSession } from "next-auth/react";
import fetchFileFn from "@/libs/fetchFileFn";
import useFormData from "@/hooks/UseFormData";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

export default function ModalImage(
  {
    additionalInfo,
  }: {
    additionalInfo: {
      id_estado_espacio: string;
      activo_coworking: boolean;
      activo_interno: boolean;
    };
  },
  {
    siteId,
  }: {
    siteId: {
      id: string;
    };
  }
) {
  const [images, setImages] = useState<{ dataURL: string; file: File }[]>([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setFilesField, setData } = useFormData({
    minFiles: 3,
    maxFiles: 10,
  });
  const onChange = (imageList: ImageListType) =>
    setImages(imageList as never[]);

  const sendImages = async () => {
    if (status === "loading") {
      return toast.error("Cargando información del usuario...");
    }
    if (images.length < 3 || images.length > 10) {
      return toast.error("Seleccione la cantidad necesaria de imágenes");
    }

    setFilesField(images.map((image) => image.file));
    const fd = setData({
      id_espacio: 28,
      id_estado_espacio: "1",
      activo_coworking: 1,
      activo_interno: 1,
      email: session?.user.emailHash,
    });

    setLoading(true);
    const toastLoading = toast.loading("Guardando imágenes...");

    const response = await fetchFileFn(`/imagesPlace`, {
      method: "POST",
      formData: fd,
    });
    if (response.code !== 200) {
      setLoading(false);
      return toast.error("Ha ocurrido un error", { id: toastLoading });
    }
    toast.success("Imágenes guardadas", { id: toastLoading });
    router.push("/");
    return;
  };

  // form.append("images", images.map((image) => image.file)[0]);

  return (
    <>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={10}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          <div className="w-[80%] border-[12px] border-gray-box min-w-unit-8 rounded-lg mb-44 mx-auto normal-shadow m-7 px-7 pt-4 pb-7">
            <h1 className="text-3xl text-center font-semibold mb-5 text-primary">
              Subir imágenes
            </h1>
            <div className="text-center">
              {imageList.length === 0 && (
                <div className="w-[60%] p-2 md:p-10 justify-center rounded-lg mx-auto">
                  <p className="font-normal text-default-400 text-center select-none text-base md:text-xl mx-auto">
                    * Puede subir mínimo 3 fotos, máximo 10. <br /> Resolución
                    recomendada: 1920 x 1080 *
                    <br />
                    extensiones de archivo: jpg, png, jpeg
                  </p>
                </div>
              )}
              <button
                className="bg-default-white font-medium border-3 hover:font-semibold hover:text-soft-blue hover:border-soft-blue border-borders-light border-dotted rounded-lg m-2 p-2 transition-all"
                style={isDragging ? { color: "blue" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <i className="bi bi-upload text-xl mr-2 font-medium"></i>
                Seleccionar o Arrastrar
              </button>
              &nbsp;
              <button
                className=" bg-default-white border-2 hover:font-semibold border-borders-light hover:border-primary rounded-lg m-2 p-2 hover:text-primary font-medium transition-all"
                onClick={onImageRemoveAll}
              >
                <i className="bi bi-trash3 text-xl mr-2 font-medium"></i>
                Eliminar todas las imágenes
              </button>
            </div>
            {errors && (
              <div className="text-center m-2">
                {errors.maxNumber && (
                  <span className="text-primary font-semibold">
                    Solo puede agregar hasta 10 imágenes.
                  </span>
                )}
                {errors.acceptType && (
                  <span className="text-primary font-semibold">
                    Solo puede subir archivos de imagen.
                  </span>
                )}
              </div>
            )}

            {imageList.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 text-center m-5 p-5 gap-7">
                {imageList.map((image, index) => (
                  <div key={index} className="mx-auto">
                    <img
                      src={image.dataURL}
                      className="border-3 text-xl shadow-xl border-borders-light rounded-lg h-[400px]"
                      alt=""
                      width="800px"
                    />
                    <div className="image-item__btn-wrapper">
                      <button
                        className="bg-borders-light rounded-lg m-2 p-2 hover:font-semibold transition-all"
                        onClick={() => onImageUpdate(index)}
                      >
                        Cambiar
                      </button>
                      <button
                        className="bg-borders-light rounded-lg m-2 p-2 hover:text-primary hover:font-semibold transition-all"
                        onClick={() => onImageRemove(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center mx-auto w-full md:w-[30%] justify-center mt-8 gap-5">
              <Button
                text="Guardar"
                onClick={sendImages}
                disabled={images.length < 3 || loading}
              />
            </div>
          </div>
        )}
      </ImageUploading>
    </>
  );
}
