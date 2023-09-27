import Header from "@/components/Header";
import PlaceCard from "@/components/PlaceCard";
import { redirect } from "next/navigation";

type Category = "classrooms" | "meeting" | "sports" | "recreational";

const categories = ["classrooms", "meeting", "sports", "recreational"];

const returnTitle = (category: Category): string => {
  if (category === "classrooms") return "Aulas y Salones";
  if (category === "meeting") return "Sala de Juntas";
  if (category === "sports") return "Sitios Deportivos";
  if (category === "recreational") return "Sitios Recreativos";

  return "Categoría no encontrada";
};

const CategoryPage = ({ params }: { params: { category: Category } }) => {
  const { category } = params;

  if (!categories.includes(category)) return redirect("/");

  return (
    <>
      <Header />
      <main className="margin-header"></main>
      <h1 className="font-bold text-primary text-3xl text-center mt-[5%] m-8">
        Administración de {returnTitle(category)}
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7">
					{[
						{ id: 1, nombre: "Coliseo", imagen: "4.jpg" },
						{ id: 2, nombre: "Salón 1", imagen: "1.jpg" },
						{ id: 3, nombre: "Salón 2", imagen: "2.jpg" },
						{ id: 4, nombre: "Salón 3", imagen: "3.jpg" },
						{ id: 5, nombre: "Salón 4", imagen: "1.jpg" },
						{ id: 6, nombre: "Salón 5", imagen: "2.jpg" },
						{ id: 7, nombre: "Salón 6", imagen: "5.jpg" },
					].map((place) => (
						<PlaceCard place={place} key={place.id} />
					))}
				</section>
    </>
  );
};

export default CategoryPage;
