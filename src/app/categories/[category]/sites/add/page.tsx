import Header from "@/components/Header";
import FormSite from "@/components/FormSite";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Crear sitio",
};

export default async function CreatePage() {
  const session = await getServerSession(authOptions)
      if(session?.user.interno) return redirect("/sites")
  return (
    <>
      <Header />
        <main className="margin-header mb-9">
          <FormSite/>
        </main>
    </>
  );
}
