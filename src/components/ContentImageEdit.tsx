import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import useFormData from "@/hooks/UseFormData";
import fetchFileFn from "@/libs/fetchFileFn";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export function ContentImageEdit({
  idSite,
  idCategory,
  idImage,
  action,
  onSuccessUpload,
}: {
  idSite?: any;
  idImage?: number;
  idCategory?: number;
  action: 1 | 2 | 3;
  onSuccessUpload?: () => any;
}) {
  const [images, setImages] = useState<{ dataURL: string; file: File }[]>([]);
  const { data: session } = useSession();

  const { setFilesField, setData } = useFormData({
    minFiles: 1,
    maxFiles: 1,
    fdFilesName: "images",
  });

  const updateImages = async () => {
    const toastLoading = toast.loading("Guardando imagen...");
    setFilesField(images.map((image) => image.file));

    const fd = setData({
      id_espacio: idSite ?? 0,
      id_imagen: idImage ?? 0,      
      id_category: idCategory ?? 0,
      id_image_category: idImage ?? 0,
      email: session?.user.emailHash,
      action: action,
    });
    const response = await fetchFileFn(idSite ? `/updateImagePlace` : `/updateImageCategory`, {
      method: "PUT",
      formData: fd,
    });

    if (response.code !== 200) {
      toast.error("Ha ocurrido un error", { id: toastLoading });
      return;
    }
    toast.success("Imagen guardada", { id: toastLoading });
    if (onSuccessUpload) onSuccessUpload();
  };

  const onChange = (imageList: any, addUpdateIndex: any) => {
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
            {imageList.length > 0 && (
              <div className="text-center mt-5 p-5 gap-7 mx-auto">
                {imageList.map((image, index) => (
                  <div key={index} className="mx-auto">
                    <img
                      src={image["data_url"]}
                      className="border-3 text-xl mx-auto shadow-xl object-cover border-borders-light rounded-lg h-[460px]"
                      alt=""
                      width="800px"
                    />
                    <div className="flex-center gap-1 px-20 my-5">
                      <div className="text-center flex-center w-[70%] lg:w-[55%]">
                        <button
                          className=" bg-default-white border-2 hover:font-semibold border-borders-light hover:border-soft-blue rounded-lg m-2 p-2 hover:text-soft-blue font-medium transition-all"
                          onClick={updateImages}
                        >
                          <i className="bi bi-floppy text-xl mr-2 font-medium"></i>
                          Guardar
                        </button>
                        <button
                          className=" bg-default-white border-2 hover:font-semibold border-borders-light hover:border-primary rounded-lg m-2 p-2 hover:text-primary font-medium transition-all"
                          onClick={() => {
                            onImageRemove(index);
                          }}
                        >
                          <i className="bi bi-x-lg text-xl mr-2 font-medium"></i>
                          Quitar
                        </button>
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
                    * Puede subir una foto. <br />
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
              </div>
            )}
            {errors && (
              <div className="text-center m-2">
                {errors.maxNumber && (
                  <span className="text-primary font-semibold">
                    Solo puede agregar una imagen.
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
