"use client";

import React from "react";

import { TailSpin } from "react-loader-spinner";

const LoadingPage = () => {
  return (
    <main className="py-14 text-center select-none mb.9">
      <>
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

        <p className="my-3 font-medium text-gray text-3xl select-none">
          Cargando...
        </p>
      </>
    </main>
  );
};

export default LoadingPage;
