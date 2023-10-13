"use client";

import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

export default function ModalImage() {
  const [images, setImages] = React.useState([]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

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
            <h1 className="mx-auto text-2xl text-center font-medium m-6 text-primary">
              Subir imagenes
            </h1>
            <div className="text-center">
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
              <div>
                {errors.maxNumber && (
                  <span className="text-primary">
                    Solo puede agregar hasta 10 imagenes.
                  </span>
                )}
                {errors.acceptType && (
                  <span>Solo puede subir archivos de imagen.</span>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 text-center m-5 p-5 gap-7">
              {imageList.map((image, index) => (
                <div key={index} className="mx-auto">
                  <img
                    src={image.dataURL}
                    className="border-3 text-xl shadow-xl object-cover border-borders-light rounded-lg h-72"
                    alt=""
                    width="600px"
                  />
                  <div className="image-item__btn-wrapper">
                    <button
                      className="bg-borders-light rounded-lg m-2 p-2 hover:font-medium transition-all"
                      onClick={() => onImageUpdate(index)}
                    >
                      Cambiar
                    </button>
                    <button
                      className="bg-borders-light rounded-lg m-2 p-2 hover:text-primary hover:font-medium transition-all"
                      onClick={() => onImageRemove(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </>
  );
}
