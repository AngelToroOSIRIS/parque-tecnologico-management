import Header from "@/components/Header";
import { CategoryTextShort } from "@/types/d";
import CalendaryCategory from "@/components/pages/CalendaryCategory";

export default function CategoryCalendaryPage({params}:{
  params: { category: CategoryTextShort }
}) {
  return (
    <>
      <Header />
      <main>
        <CalendaryCategory category={params.category}/>
      </main>
    </>
  );
}
