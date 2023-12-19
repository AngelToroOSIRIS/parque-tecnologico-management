import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import Header from "@/components/Header";
import Dates from "@/components/pages/Dates";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DatesPages({
    params,
  }: {
    params: { id: string };
  }){
      const session = await getServerSession(authOptions)
      if (session?.user.interno) return redirect("/sites")
    return(
        <>
        <Header/>
        <main className="margin-header">
            <Dates idSite={params.id} />
        </main>
        </>
    )
}