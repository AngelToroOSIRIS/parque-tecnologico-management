import Button from "@/components/Button";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="">
        <div className="grid grid-cols-1">
          <div className="margin-header  mx-auto justify-center items-center">
            <h1 className="font-bold text-primary text-3xl text-center m-8">
              Administración Co-Working
            </h1>
          </div>
              <h2 className="text-center justify-center items-center mx-auto">
                Bienvenido a la administración de Co-working, por favor seleccione
                la categoría a administrar:
              </h2>
          <div className=" flex sm:grid lg:grid-cols-3 sm:grid-cols-1 flex-col w-[80%] gap-4 mt-16 mx-auto justify-center items-center">
            <Button route="/classrooms" text="Salones de Clase" />
            <Button route="/sports" text="Espacios Deportivos" />
            <Button route="/auditoriums" text="Auditorios" />
            <Button route="/meeting" text="Salas de reunión" />
            <Button route="/laboratories" text="Laboratorios" />
          </div>
        </div>
      </main>
    </>
  );
}
