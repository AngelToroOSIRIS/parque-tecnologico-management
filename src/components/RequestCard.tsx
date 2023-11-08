"use client";

import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import { Button, useDisclosure } from "@nextui-org/react";

const RequestCard = ({
  name,
  email,
  phone,
  status,
  price,
  discount,
  paid,
}: {
  name: string;
  email: string;
  phone: number;
  status: string;
  price: string;
  discount: string;
  paid: string;
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <article className="relative flex justify-between items-center mb-8 px-4 h-[150px] box">
      <section className="w-[400px]">
        <p>
          <strong>Nombre: </strong>
          {name}
        </p>
        <p>
          <strong> Correo: </strong>
          {email}
        </p>
        <p>
          <strong> Teléfono: </strong>
          {phone}
        </p>
        <p>
          <strong> Estado de la reservación: </strong>
          {status}
        </p>
      </section>
      <section className="relative px-4">
        <p>
          <strong> Valor: </strong>
          {price}
        </p>
        <p>
          <strong> Valor con descuento: </strong>
          {discount}
        </p>
        <p>
          <strong> Valor Pagado: </strong>
          {paid}
        </p>
        <p className="mt-2 text-blue text-sm hover:underline select-none cursor-pointer transition-all">
          <i className="bi bi-clock-history"></i> Historial de actualizaciones
        </p>
      </section>
      <section className="w-[400px] pl-36 grid grid-cols-1">
        <Button
          onPress={onOpen}
          className="rounded-xl  p-1 m-1 font-normal hover:font-semibold border-2 text-green hover:opacity-100 opacity-70 hover:shadow-xl border-green bg-default-white transition-all"
        >
          Aceptar
          <i className="bi bi-check-circle mx-2"></i>
          <>
            <ModalComponent
              type="datetime"
              closeModal={onClose}
              onClick={()=>{}}
              isOpen={isOpen}
              button1="Aceptar Solicitud"
              title="Aceptar solicitud"
            />
          </>
        </Button>
        <button className="rounded-xl p-1 m-1 font-medium hover:font-semibold border-2 text-primary hover:opacity-100 opacity-70 hover:shadow-xl border-primary bg-default-white transition-all">
          Rechazar
          <i className="bi bi-x-circle mx-2"></i>
        </button>
        <button className="rounded-xl p-1 m-1 font-medium border-2 text-blue hover:opacity-100 opacity-70 hover:shadow-xl border-blue bg-default-white transition-all">
          Detalles de solicitud
          <i className="bi bi-calendar-week mx-2"></i>
        </button>
      </section>
    </article>
  );
};

export default RequestCard;
