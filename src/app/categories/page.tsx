import CategoriesComponent from "@/components/CategoriesComponent";
import Header from "@/components/Header";

 export async function generateMetadata() {
    return {
      title: `Categorías | Administración Co-working`,
    };
  }
  
export default async function AddCategoryPage() {
  return (
    <>
        <Header />
      <main>
        <h1 className="margin-header mb-10 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
          Categorías
        </h1>
        <CategoriesComponent />
      </main>
    </>
  );
}
