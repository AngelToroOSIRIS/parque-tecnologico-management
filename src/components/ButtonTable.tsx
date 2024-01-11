"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  text: string;
  onClick?: any;
  route?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  icon?: string;
}

const ButtonTable = ({ route, text, onClick, type, icon, disabled = false }: Props) => {
  const router = useRouter();
  const classbtn = "flex h-10 justify-center select-none px-2 items-center rounded-xl font-medium text-base border-borders-light hover:border-borders text-borders border-2 bg-borders-light transition-all"
  return (
    <button
    disabled={disabled}
    className={
      disabled
      ? "hidden"
      : classbtn
    }
      onClick={() => {
        if (onClick) return onClick();
        if (route) return router.push(route);
      }}
      type={type ?? "button"}
    >
      {text}
      <i className={`bi bi-${icon} flex text-xl ml-2`}></i>
    </button>
  );
};

export default ButtonTable;