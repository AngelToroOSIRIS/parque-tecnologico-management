"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className="flex justify-between">
        <div className="image-login hidden md:flex h-[100vh] w-[70%]"></div>
        <div className="mx-auto w-[80%] md:w-[40%] text-center mt-[12%] max-w-md justify-center items-center">
          <Image
            className="mx-auto"
            alt="logo_Login"
            src={"/images/ecijg250.png"}
            width={200}
            height={200}
          />
          <p className="text-3xl text-center my-12 font-semibold">
            Administración Coworking
          </p>
          <div className="py-3 px-2 pb-5 mx-5 bg-gray-box rounded-xl normal-shadow">
            <p className="pb-2 text-primary text-lg font-medium">
              Iniciar sesión
            </p>
            <button
              className="w-[95%] max-w-xs h-12 bg-primary text-off-white py-2 px-4 font-semibold rounded-xl hover:bg-dark-red transition-all"
              onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
            >
              <i className="bi bi-microsoft mr-2"></i> Ingresa con Microsoft
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
