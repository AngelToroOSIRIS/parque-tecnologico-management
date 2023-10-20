"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  text: string;
  onClick?: any;
  route?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

const Button = ({ route, text, onClick, type, disabled = false }: Props) => {
  const router = useRouter();
  const classbtn = "max-w-[200px] min-w-[50px] h-10 px-2 border-2 rounded-xl xl:text-lg text-base font-normal md:h-10 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] my-1 hover:font-semibold text-primary hover:bg-primary hover:text-default-white hover:border-primary transition-all"
  return (
    <button
    disabled={disabled}
    className={
      disabled
      ? "w-auto px-3 h-12 border-2 rounded-xl xl:text-lg text-base font-normal  md:h-12 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] my-2 text-borders opacity-50 hover:none transition-all"
      : classbtn
    }
      onClick={() => {
        if (onClick) return onClick();
        if (route) return router.push(route);
      }}
      type={type ?? "button"}
    >
      {text}
    </button>
  );
};

export default Button;
