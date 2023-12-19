import Header from "@/components/Header";
import SitesPageInter from "@/components/pages/SitesPageInter";

export const metadata = {
  title: "Coworking || ECIJG",
};

export default function SitesPage() {
  return (
    <>
      <main>
        <Header />
        <div className="margin-header  mx-auto justify-center items-center">
          <h1 className="font-semibold text-primary text-3xl text-center m-8">
            Sitios disponible a reservar
          </h1>
        </div>
        <div className="mx-auto w-[80%]">
          <SitesPageInter/>
        </div>
      </main>
    </>
  );
}
