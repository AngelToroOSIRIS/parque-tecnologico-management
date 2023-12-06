import React from "react";
import ImageUploading from "react-images-uploading";
import Button from "./Button";

export function ContentImageEdit() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
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
          // write your building UI
          <>
            <h1 className="text-3xl text-center font-semibold mt-5 mb-2 text-primary">
              Cambiar imágen
            </h1>
            {imageList.length > 0 && (
              <div className="text-center mt-5 p-5 gap-7 mx-auto">
                {imageList.map((image, index) => (
                  <div key={index} className="mx-auto">
                    <img
                      src={image["data_url"]}
                      className="border-3 text-xl mx-auto shadow-xl border-borders-light rounded-lg h-[460px]"
                      alt=""
                      width="800px"
                    />
                    <div className="flex justify-between gap-2 px-48 my-5">
                      <div className="text-center w-[50%] lg:w-[35%] mx-auto">
                        <Button text="Guardar" />
                      </div>
                      <div className="text-center w-[50%] lg:w-[35%] mx-auto">
                        <Button
                          text="Eliminar"
                          onClick={() => {
                            onImageRemove(index);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center">
              {imageList.length === 0 && (
                <div className="p-2 md:p-10 justify-center rounded-lg mx-auto">
                  <p className="font-normal text-default-400 text-center select-none text-base md:text-xl mx-auto">
                    * Puede subir una fotos. <br /> Resolución recomendada: 1920
                    x 1080 *
                    <br />
                    extensiones de archivo: jpg, png, jpeg
                  </p>
                </div>
              )}
            </div>
            {imageList.length === 0 && (
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
                  Eliminar imágen
                </button>
              </div>
            )}
            {errors && (
              <div className="text-center m-2">
                {errors.maxNumber && (
                  <span className="text-primary font-semibold">
                    Solo puede agregar una imágen.
                  </span>
                )}
                {errors.acceptType && (
                  <span className="text-primary font-semibold">
                    Solo puede subir archivos de imagen.
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </ImageUploading>
    </div>
  );
}
