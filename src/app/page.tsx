import Button from "@/components/Button";
import Header from "@/components/Header";
import fetchFn from "@/libs/fetchFn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
	if (session) {
		const email = session.user?.email;
			const response = await fetchFn(`/admin/login?email=${email}`);
      const data = response.data
      Object.entries(data)
      .map(entry => {
        const [key, value] = entry
        if(key === "roles" && value === "sports") return redirect("/sports")
        console.log({key, value})
      })
			if (response.code === 400) return redirect("/logout?error=auth");
		} else {
			return redirect("/logout?error=rol");
	}
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
          <div className=" flex sm:grid lg:grid-cols-2 sm:grid-cols-1 flex-col w-[80%] gap-4 mt-16 mx-auto justify-center items-center">
            {/* <Button route="/classrooms" text="Salones de Clase" /> */}
            <Button route="/sports" text="Espacios Deportivos" key={1} />
            <Button route="/auditoriums" text="Auditorios" key={2}/>
            <Button route="/meeting" text="Salas de reunión" key={3}/>
            <Button route="/laboratories" text="Laboratorios" key={4}/>
          </div>
        </div>
      </main>
    </>
  );
}
