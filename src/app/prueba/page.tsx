"use client";

import Header from "@/components/Header";
import Input from "@/components/forms/Input";
import fetchFn from "@/libs/fetchFn";
import { useState } from "react";
import { useSession } from "next-auth/react";


export default function Prueba() {
  const [images, setImages] = useState<[]>([])
  console.log(images)
  const sendImages = async () => {
    const { data: session } = useSession();
  
    // FORM DATA
    const formData = new FormData();
    // HTML file input, chosen by user
    formData.append("images", fileInputElement.files[0]);
    // JavaScript file-like object
    const request = new XMLHttpRequest();
    request.open("POST", "http://10.10.1.220:8070/admin/imagesPlace");
    request.send(formData);
  };
  return (
    <>
      <Header />
      <div className="margin-header w-[35%] shadow-2xl mx-auto bg-off-white items-center justify-center gap-x-10 flex py-1 px-5">
        <form
          encType="multipart/form-data"
          method="post"
          name="form"
          className="w-[95%] justify-center my-10 grid grid-cols-1 items-center"
        >
          <input
            name="images"
            id="images"
            type="file"
            placeholder="Imagenes"
            aria-label="imagenes"
            multiple
            //@ts-ignore
            onChange={(e)=>{setImages(e.target.files)}}
            accept="image/png, .jpeg, .jpg, image/gif"
            className="w-[95%] mx-auto bg-default-white font-medium border-3 hover:font-semibold hover:text-soft-blue hover:border-soft-blue border-borders-light border-dotted rounded-lg m-2 p-2 transition-all"
          />
          <button
            id="output"
            type="submit"
            className="w-[30%] mt-5 mx-auto h-10 border-2 rounded-xl text-base shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:font-semibold border-borders-light hover:border-primary bg-default-white hover:text-primary transition-all"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
