import Header from "@/components/Header";
import Categories from "@/components/pages/Categories";
import { redirect } from "next/navigation";

export type Category = "classrooms" | "meeting" | "sports" | "auditoriums" | "laboratories";
const categories = ["classrooms", "meeting", "sports", "auditoriums", "laboratories"];


interface Props{
  params: {category: Category};
}

const CategoryPage = ({ params} : Props) => {
  if (!categories.includes(params.category)) return redirect("/");
  return (
    <>
      <Header />
      <Categories category={params.category} />
    </>
  );
};

export default CategoryPage;
