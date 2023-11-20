import Header from "@/components/Header";
import { CategoryTextShort } from "@/types/d";
import CalendaryCategory from "@/components/pages/CalendaryCategory";
import { redirect } from "next/navigation";
import { categoriesObj } from "@/libs/staticData";

export default function CategoryCalendaryPage({params}:{
  params: { category: CategoryTextShort }
}) {
  const categoryFound = categoriesObj.find(
    (item) => item.route === params.category
  );

  if (!categoryFound || categoryFound.disabled) return redirect("/404");

  return (
    <>
      <Header />
      <main>
        <CalendaryCategory category={params.category}/>
      </main>
    </>
  );
}
