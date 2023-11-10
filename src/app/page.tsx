"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import PlaceCard from "@/components/PlaceCard";
import fetchFn from "@/libs/fetchFn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [coworking, setCoworking] = useState<boolean>(true);
  const updateSession = async (email: string) => {
    const response = await fetchFn(`/login?email=${email}`);
    if (response.code !== 200) {
      router.push("/logout?error=auth");
      toast.error("Ha ocurrido un error iniciando sesión", { id: "1" });
      return;
    }
    if (response.data.interno) {
      await update({
        ...session,
        user: { ...session?.user, interno: true },
      });
      return;
    }
    await update({
      ...session,
      user: {
        ...session?.user,
        emailHash: response.data.email,
        rols: response.data.roles.map(
          (rol: { id: number; descripcion: string; identificador: string }) =>
            rol.identificador
        ),
      },
    });
    return;
  };
  useEffect(() => {
    if (status === "authenticated") {
      if (!session.user.rols && !session.user.interno) {
        const userEmail = session.user.email ? session.user.email : "";
        updateSession(userEmail);
      }

      if (session.user.rols || session.user.interno) {
        if (session.user.interno) {
          return router.push("/sites");
        }
      }
    }
  }, [status]);
  if (status === "authenticated" && session.user.rols) {
    return (
      <>
        <Header />
        <main>
          <div className="grid grid-cols-1">
            <div className="margin-header mx-auto justify-center items-center">
              <h2 className="text-center border-b-3 border-primary justify-center text-3xl font-semibold m-8 items-center mx-auto">
                  Acceso Rápido:
              </h2>
            </div>
            {coworking && (
             <>
              <h2 className="text-center justify-center text-lg items-center mx-auto">
                Bienvenido a la administración de Co-working, Sitios Activos:
              </h2>
               <div className="mx-auto w-[80%]">
                 <div className="sm:grid lg:grid-cols-4 sm:grid-cols-2 md:grid-col-2 gap-5 mt-10 mx-auto mb-10 items-center">
                   <PlaceCard
                     place={{
                       id: 1,
                       nombre: "prueba",
                       descripcion_corta:
                         "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                       img_card: "999dceea-b0c2-4c6b-9645-1ec0f2aca806.jpg",
                     }}
                   />
                   <PlaceCard
                     place={{
                       id: 1,
                       nombre: "prueba",
                       descripcion_corta:
                         "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                       img_card: "0f357678-2787-4a46-96a1-d51626950103.jpg",
                     }}
                   />
                   <PlaceCard
                     place={{
                       id: 1,
                       nombre: "prueba",
                       descripcion_corta:
                         "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                       img_card: "ade41460-7837-4e05-b7ac-649b04619125.jpg",
                     }}
                   />
                   <PlaceCard
                     place={{
                       id: 1,
                       nombre: "prueba",
                       descripcion_corta:
                         "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                       img_card: "f5d77cdc-91a4-4660-b1b5-1f7b6ee2f76d.jpg",
                     }}
                   />
                 </div>
               </div>
             </>
            )}
            {!coworking && (
              <>
              <h2 className="text-center justify-center text-lg items-center mx-auto">
                Bienvenido a la administración de Tienda Virtual:
              </h2>
                <div className="w-[65%] min-w-lg lg:flex grid grid-cols-1 mx-auto m-8 gap-7">
                  <Button text="Inventario" icon="box2 mr-3"/> 
                  <Button text="Crear productos" icon="plus-circle mr-3"/>
                  <Button text="Editar productos" icon="pencil mr-3"/>
                  <Button text="PQR's" icon="question-circle mr-3"/>
                </div>
              </>
            )}
          </div>
        </main>
      </>
    );
  }
}
