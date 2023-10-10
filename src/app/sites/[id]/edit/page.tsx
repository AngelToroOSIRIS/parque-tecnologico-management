import Header from "@/components/Header";
import FormSite from "@/components/FormSite";
import { validateString } from "@/libs/functionsStrings";
import { redirect } from "next/navigation";

export default function EditPage({ params }: { params: { id: string } }) {
const idSite = validateString(params.id,"int")
//TODO:
   if (!idSite) {
     return redirect(`/sports`)
   }

  return (
    <>
      <Header />
        <p className="text-center text-primary mt-[20%] md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
          Editar sitio {params.id}
        </p>
      <FormSite site={{}}/>
    </>
  );
}
