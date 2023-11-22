import Header from "@/components/Header";
import FormSite from "@/components/FormSite";
import { validateString } from "@/libs/functionsStrings";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export const metadata = {
  title: "Editar sitio",
};

export default async function EditPage({ params }: { params: { id: string } }) {
  const idSite = validateString(params.id, "int");
  //TODO:
  if (!idSite) {
    return redirect(`/categories/sports`);
  }
  const session = await getServerSession(authOptions)
  if(session?.user.interno) return redirect("/sites")
  return (
    <>
      <Header />
        <main className="margin-header mb-9">
          <FormSite idSite={idSite}/>
        </main>
    </>
  );
}