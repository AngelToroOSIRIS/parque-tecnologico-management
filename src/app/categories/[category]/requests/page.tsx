import Header from "@/components/Header";
import Request from "@/components/pages/Request";
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
        <Request />
      </main>
    </>
  );
}
