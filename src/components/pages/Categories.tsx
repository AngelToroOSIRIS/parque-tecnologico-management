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
      <div className="bg-default-white shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] mx-auto p-5 w-[90%]  mb-60 rounded-lg">
        <Table/>
      </div>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-x-3 gap-y-5 text-center">
      </section>
    </main>
  );
}
