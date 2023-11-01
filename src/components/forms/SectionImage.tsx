"use client";

import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Button from "../Button";
import { useSession } from "next-auth/react";

export default function ModalImage() {
  const [images, setImages] = React.useState([]);
  const { data: session } = useSession();
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
    ) => {

      // data for submit
      const sendImages = async () => {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
          `/imagesPlace?email=${session?.user.emailHash}`,
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              Accept:
              "application/json, application/xml, text/plain, text/html, *.*",
              "Content-Type": "multipart/form-data",
            },
            body: JSON.stringify({ id_espacio: 1 }),
          }
          );
          
          const res = await response.json();
          console.log(res);
        };

      setImages(imageList as never[]);
      console.log(imageList)
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
          <div>
            <h1 className="mx-auto text-3xl text-center font-semibold m-6 text-primary">
              Subir imagenes
            </h1>
            <div className="text-center">
              {imageList.length === 0 && (
                <div className="w-[60%] p-2 md:p-10 justify-center rounded-lg mx-auto">
                  <p className="font-normal text-default-400 text-center select-none text-base md:text-xl mx-auto">
                    * Puede subir mínimo 3 fotos, máximo 10 <br /> resolución
                    recomendada: 1920 x 1080 *
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
                Eliminar todas las fotos
              </button>
            </div>
            {errors && (
              <div className="text-center m-2">
                {errors.maxNumber && (
                  <span className="text-primary font-semibold">
                    Solo puede agregar hasta 10 imagenes.
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
                      className="border-3 text-xl shadow-xl object-cover border-borders-light rounded-lg h-[400px]"
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
          </div>
        )}
      </ImageUploading>
      <div className="flex items-center mx-auto w-full md:w-[30%] justify-center mt-8 gap-5">
        <Button text="Guardar" type="submit" />
      </div>
    </>
  );
}
