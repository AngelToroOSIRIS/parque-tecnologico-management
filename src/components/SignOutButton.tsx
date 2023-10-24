"use client";
import { signOut } from "next-auth/react";
import Modal from "./Modal";
import { Tooltip } from "@nextui-org/react";

export default function SignOutButton() {
  return (
    <Tooltip
      className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
      content="Cerrar sesión"
    >
      <span className="text-lg p-2 text-soft-gray hover:text-primary cursor-pointer active:opacity-50 transition ease-in duration-200 transform">
        <i className="bi bi-box-arrow-right text-xl"></i>
        <Modal
          title="Cerrar sesión"
          text="¿Esta seguro de Cerrar sesión?"
          option1="Cerrar sesión"
          onClick={()=>signOut({ callbackUrl: "/" })}
        ></Modal>
      </span>
    </Tooltip>
  );
}
