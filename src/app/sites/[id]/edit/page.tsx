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
      <p className="text-center text-primary mt-[20%] md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
        Editar sitio {params.id}
      </p>
      <div className="w-[80%] rounded-lg mx-auto overflow-x shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mt-7 m-20 p-7">
        <FormSite site={{}} />
      </div>
    </>
  );
}