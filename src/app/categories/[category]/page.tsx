import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import Header from "@/components/Header";
import Categories from "@/components/pages/Categories";
import { categoriesObj } from "@/libs/staticData";
import { CategoryTextShort } from "@/types/d";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  params: { category: CategoryTextShort };
}

export default async function CategoryPage({ params }: Props) {
  const categoryFound = categoriesObj.find(
    (item) => item.route === params.category
  );
  const session = await getServerSession(authOptions)
  if (session?.user.interno) return redirect("/sites")
  return (
    <>
      <Header />
      <main className="margin-header mx-auto">
        <h1 className="mt-[7%] md:mt-[5%] pt-5 lg:mt-[2%] mb-10 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
          Administración de {categoryFound?.name}
        </h1>
        <Categories category={categoryFound?.route as CategoryTextShort} />
      </main>
    </>
  );
}
