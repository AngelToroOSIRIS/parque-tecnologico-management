import Header from "@/components/Header";
import NotifyComponent from "@/components/NotifyComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function NotifyPage() {
    const session = await getServerSession(authOptions)
    if (session?.user.interno) return redirect("/sites")
  return (
    <>
      <Header />
      <main>
        <NotifyComponent />
      </main>
    </>
  );
}
