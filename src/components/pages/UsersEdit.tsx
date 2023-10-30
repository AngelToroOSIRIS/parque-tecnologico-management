"use client";
import { useRouter } from "next/navigation";
import UserRow from "./UserRow";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { Rol, UsersAndRoles } from "@/types/d";
import { TailSpin } from "react-loader-spinner";

const UsersEdit = () => {
  const { data: session, status } = useSession();
  const [loading, setloading] = useState<boolean>(true);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [dataUsers, setDataUsers] = useState<UsersAndRoles[]>([]);

  const getRols = async () => {
    const response = await fetchFn(`/getRoles`);
    if (response.code !== 200) {
      return toast.error("No se han podido obtener los datos", {
        id: "2",
      });
    }
    setRoles(response.data);
    getData();
    setloading(true);
  };

  const getData = async () => {
    setloading(true)
    const response = await fetchFn(
      `/getUsersAndRoles?email=${session?.user.emailHash}`
    );
    if (response.code !== 200) {
      return toast.error("No se han podido obtener los filtros", {
        id: "1",
      });
    }
    setDataUsers(response.data);
    setloading(false)
  };

  useEffect(() => {
    if (status === "authenticated") {
      getRols();
    }
  }, [status]);

  const router = useRouter();
  return (
    <>
      <h1 className="margin-header mx-auto text-3xl text-center font-semibold m-6 text-primary">
        Usuarios
      </h1>

      {!loading && (
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
            {dataUsers.map((user) => {
              return <UserRow getData={getData} user={user} key={user.email} roles={roles} />;
            })}
          </section>
        </div>
      )}
      {loading && (
        <TailSpin
          height="100"
          width="100"
          color="#990000"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{
            margin: "20px 0",
            justifyContent: "center",
          }}
        />
      )}
    </>
  );
};

export default UsersEdit;
