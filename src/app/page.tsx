"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import fetchFn from "@/libs/fetchFn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const updateSession = async (email: string) => {
    const response = await fetchFn(`/login?email=${email}`);
    if (response.code !== 200) return router.push("/logout?error=auth");
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
          (rol: { id: number; descripcion: string; identificador: string }) => rol.identificador
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
            <div className="margin-header  mx-auto justify-center items-center">
              <h1 className="font-bold text-primary text-3xl text-center m-8">
                Administración Co-Working
              </h1>
            </div>
            <h2 className="text-center justify-center text-lg items-center mx-auto">
              Bienvenido a la administración de Co-working, por favor seleccione
              la categoría a administrar:
            </h2>
            <div className=" flex sm:grid lg:grid-cols-4 sm:grid-cols-1 w-[60%]  gap-3 mt-16 mx-auto items-center">
              {/* <Button route="/classrooms" text="Salones de Clase" /> */}
              <Button
                route="/categories/sports"
                text="Espacios Deportivos"
                key={1}
              />
              <Button
                route="/categories/auditoriums"
                text="Auditorios"
                key={2}
              />
              <Button
                route="/categories/meeting"
                text="Salas de reunión"
                key={3}
              />
              <Button
                route="/categories/laboratories"
                text="Laboratorios"
                key={4}
              />
            </div>
          </div>
        </main>
      </>
    );
  }
}
