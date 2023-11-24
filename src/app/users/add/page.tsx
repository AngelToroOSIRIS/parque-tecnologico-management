import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import FormUser from "@/components/FormUser";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Añadir usuarios",
};

export default async function () {
  const session = await getServerSession(authOptions)
      if(session?.user.interno) return redirect("/sites")
  return (
    <>
      <Header />
      <h1 className=" margin-header mx-auto text-3xl text-center font-semibold m-6 text-primary">
        Nuevo usuario
      </h1>
      <div className="w-[70%] md:w-[34%] h-[80%] bg-off-white rounded-lg mb-44 mx-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] m-10 p-5">
        <FormUser />
      </div>
    </>
  );
}
