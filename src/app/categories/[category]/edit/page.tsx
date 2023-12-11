import CategoryForm from "@/components/CategoryForm";
import Header from "@/components/Header";
import { Category } from "@/types/d";

 export async function generateMetadata() {
    return {
      title: `Editar Categoría | Administración Co-working`,
    };
  }
  
export default async function EditCategoryPage() {
  return (
    <>
        <Header />
      <main>
        <h1 className="margin-header mb-10 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
          Editar Categoria 
        </h1>
        <CategoryForm />
      </main>
    </>
  );
}