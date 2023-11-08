"use client";

import { signIn, signOut } from "next-auth/react";
import { Tooltip } from "@nextui-org/react";
import ModalComponent from "./ModalIcon";

export default function SignOutButton() {
  return (
    <Tooltip
      className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
      content="Cerrar sesión"
    >
      <div>
        <ModalComponent
          button1="Cerrar sesión"
          onClick={()=>signOut({ callbackUrl: "/" })}
          icon="box-arrow-right"
          text="¿Está seguro de cerrar sesión?"
          title="Cerrar sesión"
        />
      </div>
    </Tooltip>
  );
}
