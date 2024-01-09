"use client";

import CategoriesCards from "@/components/CategoriesCard";
import Header from "@/components/Header";
import fetchFn from "@/libs/fetchFn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

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
              <h2 className="text-center justify-center text-3xl font-semibold mb-8 items-center mx-auto">
                Acceso Rápido
              </h2>
            </div>
            <h2 className="text-center justify-center text-lg items-center mx-auto">
              Bienvenido a la administración de Coworking, Categorias Activas:
            </h2>
            <div className="mx-auto w-[90%]">
              <CategoriesCards />
            </div>
          </div>
        </main>
      </>
    );
  }
}
