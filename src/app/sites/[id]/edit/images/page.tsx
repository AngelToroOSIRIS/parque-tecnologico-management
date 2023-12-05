import { EditImagesComponent } from "@/components/EditImagesComponent";
import Header from "@/components/Header";

 export async function generateMetadata() {
    return {
      title: `Editar Imagenes | Administración Co-working`,
    };
  }
  
export default async function EditImagesSites({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
        <Header />
      <main>
        <h1 className="margin-header mb-10 text-center text-3xl font-bold text-primary mx-auto justify-center items-center">
          Editar imágenes 
        </h1>
        <EditImagesComponent id={params.id}/>
      </main>
    </>
  );
}