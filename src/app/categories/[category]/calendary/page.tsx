import Header from "@/components/Header";
import { CategoryTextShort } from "@/types/d";
import CalendaryCategory from "@/components/pages/CalendaryCategory";
import { redirect } from "next/navigation";
import { categoriesObj } from "@/libs/staticData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

interface Props {
  params: { category: CategoryTextShort };
}

export default async function CategoryCalendaryPage({
  params,
}: {
  params: { category: CategoryTextShort };
}) {
  const categoryFound = categoriesObj.find(
    (item) => item.route === params.category
  );
  const session = await getServerSession(authOptions);

  if (!categoryFound) return redirect("/404");
  if (session?.user.interno) return redirect("/sites");

 

  return (
    <>
      <Header />
      <main>
        <CalendaryCategory category={params.category} />
      </main>
    </>
  );
}
