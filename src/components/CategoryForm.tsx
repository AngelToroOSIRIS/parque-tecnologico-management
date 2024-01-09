"use client";

import React, { useEffect, useState } from "react";
import InputForm from "./forms/InputForm";
import { TailSpin } from "react-loader-spinner";
import SelectForm from "./forms/SelectForm";
import { SelectItem } from "@nextui-org/react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Button from "./Button";
import TextareaForm from "./forms/TextareaForm";
import fetchFn from "@/libs/fetchFn";
import { useSession } from "next-auth/react";
import useValidateForm from "@/hooks/useValidateForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import fetchFileFn from "@/libs/fetchFileFn";
import useFormData from "@/hooks/UseFormData";
0;
const CategoryForm = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [content, setContent] = useState<"add" | "images">("add");
  const [images, setImages] = useState<{ dataURL: string; file: File }[]>([]);
  const { setFilesField, setData } = useFormData({
    minFiles: 1,
    maxFiles: 5,
    fdFilesName: "images",
  });
  const router = useRouter();
  const onChange = (imageList: ImageListType) =>
    setImages(imageList as never[]);
  const validData = useValidateForm([
    { name: "titulo", type: "str", required: true },
    { name: "identificador", type: "str", required: true },
    { name: "descripcion", type: "str", required: true },
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validData.validData) {
      return toast.error("Por favor complete el formulario", { id: "empty" });
    }
    setLoading(true);
    const toastLoading = toast.loading("Guardando información...", {
      id: "Save",
    });

    const response = await fetchFn(`/createCategory`, {
      method: "POST",
      body: {
        email: session?.user.emailHash,
        identificador: validData.getData.identificador,
        descripcion: validData.getData.descripcion,
        titulo: validData.getData.titulo,
      },
    });
    setLoading(false);

    if (response.code !== 200) {
      if (response.data.message) {
        return toast.error(response.data.message, { id: toastLoading });
      }

      return toast.error("No se ha podido guardar", { id: toastLoading });
    }

    toast.dismiss(toastLoading);
    setCategoryId(response.data.id);
    setContent("images");
  };

  const SendImages = async () => {
    const toastLoading = toast.loading("Guardando información...", {
      id: "Save",
    });
    if (images.length < 1 || images.length > 5) {
      return toast.error("Seleccione la cantidad necesaria de imágenes");
    }
    setFilesField(images.map((image) => image.file));
    const fd = setData({
      email: session?.user.emailHash,
      id_category: categoryId,
    });
    const res = await fetchFileFn(`/imageCategory`, {
      method: "POST",
      formData: fd,
    });
    setLoading(false);
    if (res.code !== 200) {
      return toast.error("No se ha podido guardar", { id: toastLoading });
    }
    toast.success("La categoría se ha guardado exitosamente", {
      id: toastLoading,
    });
    router.push("/categories");
  };

  useEffect(() => {
    if (session?.user.rols || session?.user.interno) {
      if (session?.user.interno) {
        return router.push("/categories");
      }
    }
  }, []);

  return (
    <>
      {!loading && (
        <>
          {content === "add" && (
            <div className="w-[95%] max-w-[800px] mx-auto p-1 bg-gray-box normal-shadow rounded-lg mb-10">
              <form
                onSubmit={handleSubmit}
                className="W-full m-2 bg-default-white p-2 px-16 rounded-lg pt-7 gap-2"
              >
                <p className="mb-2 text-primary text-start text-sm select-none">
                  Campos obligatorios (
                  <i className="bi bi-asterisk text-xs"></i>)
                </p>
                <InputForm
                  name="titulo"
                  label={{ required: true, value: "Nombre:" }}
                  placeholder="Nombre de la categoría"
                  onChange={validData.setField}
                  validations={{
                    required: "Este campo es obligatorio",
                    maxLength: {
                      value: 25,
                      message: "Maxímo se pueden ingresar 25 caracteres",
                    },
                  }}
                />
                <InputForm
                  name="identificador"
                  placeholder="Identificador de la categoría"
                  validations={{
                    required: "Este campo es obligatorio",
                    maxLength: {
                      value: 50,
                      message: "Maxímo se pueden ingresar 50 caracteres",
                    },
                  }}
                  label={{ required: true, value: "Nombre identificador:" }}
                  onChange={validData.setField}
                  description="*Por favor ingresar un nombre válido en minúscula y sin caracteres especiales (Ejemplo: Nombre: Deportes, identificador: sports)*"
                />

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
                        "Se admiten máximo 150 caracteres en la observación",
                      value: 150,
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
                    onClick={() => {
                      router.push("/categories");
                    }}
                  />
                </div>
              </form>
            </div>
          )}
        </>
      )}
      {content === "images" && (
        <>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={5}
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
              <div className="w-[75%] border-[12px] border-gray-box min-w-unit-8 rounded-lg mb-44 mx-auto normal-shadow m-7 px-7 pt-4 pb-7">
                <h1 className="text-3xl text-center font-semibold mb-5 text-primary">
                  Subir imágenes
                </h1>
                <div className="text-center">
                  {imageList.length === 0 && (
                    <div className="w-[60%] p-2 md:p-10 justify-center rounded-lg mx-auto">
                      <p className="font-normal text-default-400 text-center select-none text-base md:text-xl mx-auto">
                        * Puede subir mínimo 1 imagen, máximo 5 imagen. <br />
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
                        Solo puede agregar hasta 5 imágenes.
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 text-center m-2 p-2 gap-4">
                    {imageList.map((image, index) => (
                      <div key={index} className="mx-auto">
                        <img
                          src={image.dataURL}
                          className="border-3 text-xl normal-shadow border-borders-light rounded-lg h-[400px]"
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
                {images.length < 1 && !errors?.maxNumber && (
                  <div className="w-full mt-3 text-center">
                    <span className="text-primary font-semibold">
                      Se necesita mínimo 1 imagen
                    </span>
                  </div>
                )}
                <div className="flex items-center mx-auto w-full md:w-[30%] justify-center mt-8 gap-5">
                  <Button
                    text="Guardar"
                    onClick={() => {
                      SendImages();
                    }}
                    disabled={images.length < 1 || loading}
                  />
                </div>
              </div>
            )}
          </ImageUploading>
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

export default CategoryForm;
