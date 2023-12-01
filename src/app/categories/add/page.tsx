import CategoryForm from "@/components/CategoryForm";
import Header from "@/components/Header";

 export async function generateMetadata() {
    return {
      title: `Añadir Categoría | Administración Co-working`,
    };
  }
  
export default async function AddCategoryPage() {
  return (
    <>
        <Header />
      <main>
        <h1 className="margin-header mb-10 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
          Crear categoría
        </h1>
        <CategoryForm />
      </main>
    </>
  );
}
