import Header from "@/components/Header";
import PlaceCard from "@/components/PlaceCard";

export const metadata = {
  title: "Coworking || ECIJG",
};

export default function SitesPage() {
  return (
    <>
      <main>
        <Header />
        <div className="margin-header  mx-auto justify-center items-center">
          <h1 className="font-semibold text-primary text-2xl text-center m-8">
            Sitios disponible a reservar
          </h1>
        </div>
        <div className="mx-auto w-[80%]">
          <div className="sm:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-col-2 gap-5 mt-10 mx-auto mb-10 items-center">
          </div>
        </div>
      </main>
    </>
  );
}
