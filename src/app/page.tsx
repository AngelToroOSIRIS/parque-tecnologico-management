import Button from "@/components/Button";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="margin-header">
        <div className="grid grid-cols-1">
          <div className="margin-header mt-[15%] lg:mt-[7%]  mx-auto justify-center items-center">
            <h1 className="font-bold text-primary text-3xl text-center m-8">
              Administración Co-Working
            </h1>
          </div>
              <h2 className="text-center justify-center items-center mx-auto">
                Bienvenido a la administración de Co-working, por favor seleccione
                la categoría a administrar:
              </h2>
          <div className=" flex sm:grid lg:grid-cols-4 sm:grid-cols-1 flex-col w-[80%] gap-4 mt-16 mx-auto justify-center items-center">
            <Button route="/classrooms" text="Aulas y Salones" />
            <Button route="/meeting" text="Sala de Juntas" />
            <Button route="/sports" text="Sitios Deportivos" />
            <Button route="/recreational" text="Sitios Recreativos" />
          </div>
        </div>
      </main>
    </>
  );
}
