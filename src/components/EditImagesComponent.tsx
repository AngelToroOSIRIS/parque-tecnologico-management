"use client";

import { siteInitialState } from "@/libs/InitialsStates";
import fetchFn from "@/libs/fetchFn";
import { Site } from "@/types/d";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

export function EditImagesComponent({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSite, setDataSite] = useState<Site>(siteInitialState);

  const getImages = async () => {
    setLoading(true);
    const response = await fetchFn(`/getPlace/${id}`);
    if (response.code !== 200) {
      return toast.error("No se ha podido obtener la info", { id: "1" });
    }
    setLoading(false);
    console.log(response.data);
    setDataSite(response.data);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      {!loading && (
        <>
          {dataSite.images.map((image) => (
            <div className="w-[85%] grid grid-cols-1 lg:grid-cols-2 text-center mx-auto border-[10px] border-gray-box rounded-lg m-5 p-5 gap-7">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASEURL}/image?imageName=${image.img_medium}`}
                className="select-none"
                alt="Imagen lugar"
                radius="none"
              />
            </div>
          ))}
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
