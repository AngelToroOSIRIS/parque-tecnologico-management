"use client";

import { Category } from "@/app/[category]/page";
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
      <h1 className="margin-header mt-[20%] md:mt-[15%] pt-5 lg:mt-[7%] mb-5 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
        Administración de {returnTitle(category)}
      </h1>
        <Table/>
    </main>
  );
}
