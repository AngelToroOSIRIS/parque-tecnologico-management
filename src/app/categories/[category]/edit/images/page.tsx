import { EditImagesCategory } from "@/components/EditImageCategory";
import Header from "@/components/Header";

export async function generateMetadata() {
  return {
    title: `Editar imágenes category | Administración Co-working`,
  };
}

export default async function EditCategoryImagePage({
    params,
  }: {
    params: { category: string };
  }) {
  return (
    <>
      <Header />
      <main>
        <h1 className="margin-header mb-10 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
          Editar Imágenes
        </h1>
        <EditImagesCategory category={params.category} />
      </main>
    </>
  );
}
