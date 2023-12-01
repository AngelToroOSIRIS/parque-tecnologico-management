"use client";

import fetchFn from "@/libs/fetchFn";
import { Category } from "@/types/d";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import CategoryRow from "./CategoryRow";
import { useSession } from "next-auth/react";

const CategoriesComponent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();
  const [dataCategory, setDataCategory] = useState<Category[]>([]);
  const router = useRouter();

  const CategoryData = async () => {
    const response = await fetchFn(process.env.NEXT_PUBLIC_API_BASEURL + `/categorias`, {
      externalUrl: true,
    });
    if (response.code !== 200) {
      router.push("/logout?error=auth");
      toast.error("Ha ocurrido un error iniciando sesión", { id: "1" });
      return;
    }
    setDataCategory(response.data);
    setLoading(false);
  };
  useEffect(() => {
    if (status === "authenticated") {
      CategoryData();
    }
  }, []);
  return (
    <>
      {!loading && (
          <div className="w-full overflow-x mb-10 max-w-6xl mx-auto p-3 bg-default-white rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <div className="p-3 flex justify-end">
            <button
                onClick={() => router.push("/categories/add")}
                className="bg-borders-light px-2 py-1 border-2 items-center justify-center font-medium border-borders-light hover:border-default-400 transition-all text-borders rounded-xl"
              >
                Añadir categoría
                <i className="bi bi-plus-circle ml-2 text-xl "></i>
              </button>
            </div>
            <section className="w-full p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-[#ffffff] rounded-xl">
              <article className="flex h-10 rounded-lg p-2 items-center justify-between select-none bg-borders-light text-borders text-md font-semibold">
                <div className="w-[20%] ml-2">TÍTULO</div>
                <div className="w-[20%] text-center">IDENTIFICADOR</div>
                <div className="w-[10%] text-center">ESTADO</div>
                <div className="w-[45%] text-center">DESCRIPCIÓN</div>
                <div className="w-[10%] text-center">OPCIONES</div>
              </article>
              {dataCategory.map((category) => (
                <CategoryRow key={category.id} category={category} />
              ))}
            </section>
          </div>
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

export default CategoriesComponent;
