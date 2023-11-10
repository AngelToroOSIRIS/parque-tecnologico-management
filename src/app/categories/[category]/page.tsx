"use client"
import Header from "@/components/Header";
import Categories from "@/components/pages/Categories";
import { includesString } from "@/libs/functionsStrings";
import { categoriesObj } from "@/libs/staticData";
import { CategoryTextShort } from "@/types/d";
import { Badge } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { category: CategoryTextShort };
}

// export async function generateMetadata({
//   params,
// }: {
//   params: { category: string };
// }) {
//   const categoryFound = categoriesObj.find(
//     (item) => item.route);

//   return {
//     title: `${
//       categoryFound?.name ?? "Categoría no encontrada"
//     } | Parque Tecnólogico ECIJG`,
//   };
// }

export default async function CategoryPage({ params }: Props) {
  const [rolAdmin, setRolAdmin] = useState<boolean>(false);
  const { data, status } = useSession();
  const router = useRouter();
  const userSession = data?.user ?? {
    name: "default",
    email: "useremail",
  };
  const categoryFound = categoriesObj.find(
    (item) => item.route === params.category
  );
  
  if (!categoryFound || categoryFound.disabled) return redirect("/404");

  useEffect(() => {
    if (status === "authenticated") {
      const result = includesString(userSession.rols ?? [], [
        "superadmin",
        params.category,
      ]);
      setRolAdmin(result);
    }
  }, [status]);
  console.log(rolAdmin)
  return (
    <>
      <Header/>
      <main className="margin-header mx-auto">
      <h1 className="mt-[7%] md:mt-[5%] pt-5 lg:mt-[2%] mb-10 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
        Administración de {categoryFound.name}
      </h1>
      {rolAdmin && (
            <div className="flex gap-4">
              <Badge
                content={<i className="bi bi-bell-fill text-sm"></i>}
                color="primary"
                size="lg"
                className="animate-pulse"
              >
                <button
                  onClick={() => router.push(`${params.category}/requests`)}
                  aria-label="button"
                  className="h-10 justify-center px-2 items-center rounded-lg font-medium border-borders-light hover:border-borders text-borders text-base border-2 bg-borders-light transition-all"
                >
                  Solicitudes
                  <i className="bi bi-exclamation-circle mx-1 text-xl"></i>
                </button>
              </Badge>
              <button
                onClick={() => router.push("/sites/add")}
                aria-label="button"
                className="h-10 justify-center px-2 items-center rounded-lg font-medium border-borders-light hover:border-borders text-borders text-base border-2 bg-borders-light transition-all"
              >
                Añadir sitio
                <i className="bi bi-plus-circle mx-1 text-xl"></i>
              </button>
            </div>
          )}
      <Categories params={params}/>
      </main>
    </>
  );
};
