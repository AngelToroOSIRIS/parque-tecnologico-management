import Header from "@/components/Header";
import FormSite from "@/components/FormSite";

export default function CreatePage() {
return (
    <>
      <Header />
      <p className="text-center text-primary mt-[20%] md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
        Añadir sitio:
      </p>
      <FormSite site={{}} />
    </>
  );
}
