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
        
        <EditImagesComponent id={params.id}/>
      </main>
    </>
  );
}