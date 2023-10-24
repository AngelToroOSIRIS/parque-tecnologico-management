import Header from "@/components/Header";
import Table from "@/components/pages/Users";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { includesString } from "@/libs/functionsStrings";
import { redirect } from "next/navigation";

export default async function users() {
  const session = await getServerSession(authOptions)

  if(!includesString(session?.user.rols ?? [], ["superadmin", "users"])) return redirect("/");
  return (
    <>
      <Header />
      <Table />
    </>
  );
}
