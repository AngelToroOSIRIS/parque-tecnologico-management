"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  text: string;
  onClick?: any;
  route?: string;
}

const Button = ({ route, text, onClick }: Props) => {
  const router = useRouter();
  return (
    <button
      className="w-full h-12 border-2 rounded-xl xl:text-lg text-base  md:h-12 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  bg-default-white my-2 font-semibold text-primary hover:bg-primary hover:text-default-white"
      onClick={() => {
        if (onClick) return onClick();
        if (route) return router.push(route);
      }}
    >
      {text}
    </button>
  );
};

export default Button;
