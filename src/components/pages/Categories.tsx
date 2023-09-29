"use client";

import { Category } from "@/app/[category]/page";
import Tabs from "@/components/Tabs";
import Table from "@/components/Table";

const returnTitle = (category: Category): string => {
  if (category === "classrooms") return "Aulas y Salones";
  if (category === "meeting") return "Sala de Juntas";
  if (category === "sports") return "Sitios Deportivos";
  if (category === "auditoriums") return "Auditorios";
  if (category === "laboratories") return "Laboratorios";

  return "Categoría no encontrada";
};

export default function Categories({ category }: { category: Category }) {
  return (
    <main className="margin-header w-[90%] mx-auto">
      <h1 className="margin-header mt-[20%] md:mt-[15%] pt-5 lg:mt-[7%] mb-10 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
        Administración de {returnTitle(category)}
      </h1>
      {/* <Tabs /> */}
      <div className="bg-off-white p-5  mb-60 rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
        <Table/>
      </div>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-x-3 gap-y-5 text-center">
      </section>
    </main>
  );
}
