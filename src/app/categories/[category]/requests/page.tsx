import Header from "@/components/Header";
import RequestCard from "@/components/RequestCard";
import { categoriesObj } from "@/libs/staticData";
import { CategoryTextShort } from "@/types/d";
import { redirect } from "next/navigation";

interface Props {
    params: { category: CategoryTextShort };
  }
  
  export async function generateMetadata({
    params,
  }: {
    params: { category: string };
  }) {
    const categoryFound = categoriesObj.find(
      (item) => item.route);
  
    return {
      title: `${
        categoryFound?.name ?? "Categoría no encontrada"
      } | Parque Tecnólogico ECIJG`,
    };
  }
  
export default function RequestPage({ params }: Props) {
    const categoryFound = categoriesObj.find(
        (item) => item.route === params.category
      );
      
      if (!categoryFound || categoryFound.disabled) return redirect("/404");
  return (
    <>
        <Header />
      <main className="margin-header">
        <h1 className="mt-[7%] md:mt-[5%] pt-5 lg:mt-[2%] mb-10 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
          Solicitudes de {categoryFound.name}
        </h1>
        <div className="w-[70%] mx-auto">
          <RequestCard name="Angel Toro" discount="50%" email="angel.toro@escuelaing.edu.co" paid="80.000" phone={3000000000} price="160.000" status="Pendiente" />
          <RequestCard name="Camilo Galindo" discount="0%" email="camilo.galindo-r@escuelaing.edu.co" paid="180.000" phone={3001122345} price="180.000" status="Pendiente" />
          <RequestCard name="Sebastian Valbuena" discount="70%" email="sebastian.valbuena@escuelaing.edu.co" paid="70.000" phone={3029876543} price="100.000" status="Pendiente" />
          <RequestCard name="Paulina Alvarado" discount="100%" email="paulina.alvarado@escuelaing.edu.co" paid="0" phone={3101234567} price="160.000" status="Pendiente" />
          <RequestCard name="katerin Rojas" discount="65%" email="katerin.rojas@escuelaing.edu.co" paid="65.000" phone={3095237841} price="200.000" status="Pendiente" />
        </div>
      </main>
    </>
  );
}
