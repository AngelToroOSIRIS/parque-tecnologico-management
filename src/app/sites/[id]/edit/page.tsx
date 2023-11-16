import Header from "@/components/Header";
import FormSite from "@/components/FormSite";
import { validateString } from "@/libs/functionsStrings";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Editar sitio",
};

export default function EditPage({ params }: { params: { id: string } }) {
  const idSite = validateString(params.id, "int");
  //TODO:
  if (!idSite) {
    return redirect(`/categories/sports`);
  }

  return (
    <>
      <Header />
        <main className="margin-header mb-9">
          <FormSite idSite={idSite}/>
        </main>
    </>
  );
}