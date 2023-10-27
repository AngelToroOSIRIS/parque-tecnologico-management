"use client";
import { useRouter } from "next/navigation";
import UserRow from "./UserRow";

const UsersEdit = () => {
  const router = useRouter();
  return (
    <>
      <h1 className="margin-header mx-auto text-3xl text-center font-semibold m-6 text-primary">
        Usuarios
      </h1>
      <div className="w-[95%] mb-10 max-w-5xl mx-auto p-3 bg-default-white rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
        <div className="p-3 flex justify-end">
          <button
            onClick={() => router.push("/users/add")}
            className="bg-borders-light px-2 py-1 border-2 items-center justify-center font-medium border-borders-light hover:border-default-400 transition-all text-borders rounded-xl"
          >
            Añadir usuario
            <i className="bi bi-person-plus-fill ml-2 text-xl "></i>
          </button>
        </div>
        <section className="w-full mx-auto p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-[#ffffff] rounded-xl">
          <article className="flex h-10 rounded-lg p-2 items-center justify-center bg-borders-light text-borders text-md font-semibold">
            <div className="w-full">CORREO</div>
            <div className="w-full text-center">ROL</div>
            <div className="w-full text-center">OPCIONES</div>
          </article>
          <UserRow />
        </section>
      </div>
    </>
  );
};

export default UsersEdit;
