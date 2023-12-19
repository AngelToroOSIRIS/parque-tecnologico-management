"use client";

import { useAppSelector } from "@/redux/hook";
const SitesPageInter = () => {

const categories = useAppSelector((state) => state.categoriesReducer);

  return (
    <>
    <main>
      {categories.data.map((category) => (
        <>
        <h1 className="text-primary text-xl font-bold text-center pt-4">{category.titulo}</h1>
        <p className="text-center text-default-400 pb-5">{category.identificador}</p>
        </>
      ))}
      </main>
    </>
  );
};

export default SitesPageInter;
