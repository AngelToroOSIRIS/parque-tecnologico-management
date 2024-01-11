"use client";

import fetchFn from "@/libs/fetchFn";
import { ImageCategory } from "@/types/d";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import Modal from "./Modal";
import { ContentImageEdit } from "./ContentImageEdit";
import { useSession } from "next-auth/react";
import useFormData from "@/hooks/UseFormData";
import fetchFileFn from "@/libs/fetchFileFn";
import { useAppSelector } from "@/redux/hook";
import ButtonTable from "./ButtonTable";
import { useRouter } from "next/navigation";

export function EditImagesCategory({ category }: { category: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [contentModal, setContentModal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [action, setAction] = useState<1 | 2 | 3>(1);
  const [imageCategory, setImageCategory] = useState<ImageCategory[]>([]);
  const { data: session } = useSession();
  const [idImageSelected, setIdImageSelected] = useState<number>(0);
  const [idCategory, setIdCategory] = useState<number>(0);

  const getImages = async () => {
    setLoading(true);
    const response = await fetchFn(`/imagesCategory?category=${category}`);
    if (response.code !== 200) {
      return toast.error("No se ha podido obtener los datos", { id: "1" });
    }
    setImageCategory(response.data);
    setLoading(false);
  };

  const categories = useAppSelector((state) => state.categoriesReducer);

  const router = useRouter();

  const { setData } = useFormData({
    minFiles: 1,
    maxFiles: 1,
    fdFilesName: "images",
  });

  const deleteImage = async () => {
    if (imageCategory.length < 2) {
      toast.error("Debe tener al menos 3 imágenes", { id: "error1" });
      return;
    }
    const toastLoading = toast.loading("Eliminando imagen...");
    const fd = setData({
      id_category: idCategory,
      id_image_category: idImageSelected,
      email: session?.user.emailHash,
      action: 3,
    });
    const response = await fetchFileFn(`/updateImageCategory`, {
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

  useEffect(() => {
    if (categories.data.length > 0) {
      setIdCategory(
        categories.data.find((item) => item.identificador === category)?.id ?? 0
      );
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
                <ContentImageEdit
                  idImage={idImageSelected}
                  action={action}
                  idCategory={idCategory}
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
          <div className="absolute top-24 lg:top-28 lg:ml-[23%] mx-4">
                <ButtonTable
                  text="Volver"
                  icon="arrow-left"
                  onClick={() => {
                    router.back();
                  }}
                />
              </div>
          <div className="mx-auto w-[55%] rounded-lg normal-shadow bg-gray-box mb-14 text-center ">
            <div className="grid grid-cols-1 lg:grid-cols-3 mx-auto m-5 p-5 gap-7">
              {imageCategory.map((image) => (
                <div key={image.id_image} className="grid mx-auto">
                  <Image
                    width={300}
                    height={200}
                    src={`${process.env.NEXT_PUBLIC_API_BASEURL}/imageCategory?image=${image.image}`}
                    className="border-[10px] border-default-300 rounded-lg"
                    alt="Imagen lugar"
                    radius="none"
                  />
                  <div>
                    <button
                      onClick={() => {
                        setContentModal("images");
                        setIdImageSelected(image.id_image);
                        setAction(1);
                        setShowModal(true);
                      }}
                      className="bg-borders-light rounded-lg m-2 p-2 hover:font-semibold transition-all"
                    >
                      Cambiar
                    </button>
                    <button
                      onClick={() => {
                        setContentModal("eliminar");
                        setIdImageSelected(image.id_image);
                        setShowModal(true);
                        setAction(3);
                      }}
                      className="bg-borders-light rounded-lg m-2 p-2 hover:text-primary hover:font-semibold transition-all"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              {imageCategory.length < 5 && (
                <div className="w-full h-[200px] p-2 grid justify-center items-center rounded-lg">
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
            <p className="text-default-400 text-sm p-2 font-medium select-none">
              *Debe haber mínimo una foto, máximo 5*
            </p>
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
