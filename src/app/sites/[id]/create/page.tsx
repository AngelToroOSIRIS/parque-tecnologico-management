import Header from "@/components/Header";
import { Category } from "@/app/[category]/page";
import FormSite from "@/components/FormSite";

export default function CreatePage({
  params,
}: {
  params: { id: string; category: Category };
}) {
  return (
    <>
      <Header />
      <p className="text-center text-primary mt-[20%] md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
        Crear sitio {params.id}
      </p>
      <FormSite params={params} />
    </>
  );
}
