"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  text: string;
  onClick?: any;
  route?: string;
}

const ButtonImages = ({ route, text, onClick }: Props) => {
  const router = useRouter();

  return (
    <button
      className="w-50 absolute mt-[20%] md:mt-[12%] lg:mt-[8%] ml-[8%] px-3 h-11 border-2 rounded-xl text-md  font-normal  md:h-12 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] my-2 hover:font-semibold text-soft-blue hover:bg-soft-blue hover:text-default-white hover:border-soft-blue transition-all"
      onClick={() => {
        if (onClick) return onClick();
        if (route) return router.push(route);
      }}
    >
      <i className="bi bi-images mx-2 text-lg"></i>
      {text}
    </button>
  );
};

export default ButtonImages;
