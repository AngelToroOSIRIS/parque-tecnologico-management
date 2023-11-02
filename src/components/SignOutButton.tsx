"use client";

import { signOut } from "next-auth/react";
import { Tooltip } from "@nextui-org/react";
import ModalComponent from "./ModalComponent";

export default function SignOutButton() {
  return (
    <Tooltip
      className="font-semibold text-primary rounded-lg shadow-xl bg-off-white"
      content="Cerrar sesión"
    >
      <div>
        <ModalComponent
          button1="Cerrar sesión"
          onClick={() => {
            signOut();
          }}
          icon="box-arrow-right"
          text="¿Seguro que quiere cerrar sesión?"
          title="Cerrar sesión"
        />
      </div>
    </Tooltip>
  );
}
