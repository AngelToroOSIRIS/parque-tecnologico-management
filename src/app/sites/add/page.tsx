import Header from "@/components/Header";
import FormSite from "@/components/FormSite";

export const metadata = {
  title: "Crear sitio",
};

export default function CreatePage() {
  return (
    <>
      <Header />
        <main className="margin-header mb-9">
          <FormSite/>
        </main>
    </>
  );
}
