"use client";

import Header from "@/components/Header";
import PlaceCard from "@/components/PlaceCard";
import { useSession } from "next-auth/react";

export default function SitesPage() {
  const { data, status } = useSession();
  const user = data?.user ?? {
    name: "default",
    email: "useremail",
  };
  return (
    <>
      <main>
        <Header />
        <div className="margin-header  mx-auto justify-center items-center">
          <h1 className="font-semibold text-primary text-2xl text-center m-8">
            Sitios disponible a reservar
          </h1>
        </div>
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
      </main>
      {user.interno && (
        <footer className="text-default-white bg-primary p-6 text-center z-40 w-full fixed bottom-0 left-0">
          <p>
            Todos los derechos reservados ©2023 - Escuela Colombiana de
            Ingeniería Julio Garavito. Personería Jurídica 086 de enero 19 de
            1973. Renovación de Acreditación Institucional de Alta Calidad.
            Resolución 002710 del 18 de marzo de 2019 (vigencia de 6 años).
            Vigilada por Mineducación.
          </p>
        </footer>
      )}
    </>
  );
}
