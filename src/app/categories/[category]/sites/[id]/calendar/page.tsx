import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import Header from "@/components/Header";
import CalendarSitePage from "@/components/pages/CalendarSitePage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CalendarPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (session?.user.interno) return redirect("/sites");
  //TODO: validar id
  return (
    <>
      <Header />
      <main>
        <CalendarSitePage idPlace={Number(params.id)} />
      </main>
    </>
  );
}
