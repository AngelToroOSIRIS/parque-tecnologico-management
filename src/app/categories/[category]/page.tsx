import Header from "@/components/Header";
import { getServerSession } from "next-auth/next"
import Categories from "@/components/pages/Categories";
import { categoriesObj } from "@/libs/staticData";
import { CategoryTextShort } from "@/types/d";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { includesString } from "@/libs/functionsStrings";

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

export default async function CategoryPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  const categoryFound = categoriesObj.find(
    (item) => item.route === params.category
  );
  includesString(session?.user.rols ?? [], ["sports", params.category])
  if (!categoryFound || categoryFound.disabled) return redirect("/404");

  return (
    <>
      <Header/>
      <main className="margin-header w-[95%] mx-auto">
      <h1 className="mt-[7%] md:mt-[5%] pt-5 lg:mt-[2%] mb-10 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
        Administración de {categoryFound.name}
      </h1>
      <Categories params={params}/>
      <pre>{JSON.stringify(session?.user.rols)}</pre>
      </main>
    </>
  );
};
