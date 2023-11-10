"use client";

import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import { Modal, ModalBody, useDisclosure } from "@nextui-org/react";
import { Request } from "@/types/d";
import Button from "./Button";

const RequestCard = ({
  request,
  onClickAction,
}: {
  request: Request;
  onClickAction: (request: Request) => void;
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [typeRequest, setTypeRequest] = useState<"changeDate" | "Cancel">(
    "changeDate"
  );
  const [typeModal, setTypeModal] = useState<
    "form" | "options" | "aceptedDate" | "CancelDate"
  >("options");

  const [titleModal, setTitleModal] = useState<
    "Aceptar Solicitud" | "Rechazar solicitud"
  >("Aceptar Solicitud");
  const [buttonModal, setButtonModal] = useState<
    "Aceptar Solicitud" | "Rechazar solicitud"
  >("Aceptar Solicitud");

  return (
    <article className="relative overflow-x-auto min-w-max flex justify-between items-center mb-6 px-4 h-[150px] box">
      <ModalComponent
        type={typeModal}
        closeModal={onClose}
        onClick={() => {}}
        isOpen={isOpen}
        button1={buttonModal}
        title={titleModal}
      />
      <section className="w-[400px]">
        <p>
          <strong>Nombre: </strong>
          {request.nombre}
        </p>
        <p>
          <strong> Correo: </strong>
          {request.correo}
        </p>
        <p>
          <strong> Teléfono: </strong>
          {request.telefono}
        </p>
        <p className="text-primary">
          <strong> Tipo de la solicitud: </strong>
          {request.estado}
        </p>
      </section>
      <section className="relative px-4">
        <p>
          <strong> Valor: </strong>
          {request.valor}
        </p>
        <p>
          <strong> Valor con descuento: </strong>
          {request.valor_descuento}
        </p>
        <p>
          <strong> Valor Pagado: </strong>
          {request.valor_pagado}
        </p>
        <p className="mt-2 text-blue text-sm hover:underline select-none cursor-pointer transition-all">
          <i className="bi bi-clock-history"></i>
          Historial de actualizaciones
        </p>
      </section>
      <section className="relative px-4">
        <p>
          <strong> Fecha inicio: </strong>
          {request.fecha_inicio}
        </p>
        <p>
          <strong> Fecha fin: </strong>
          {request.fecha_fin}
        </p>
        <p>
          <strong>Última actualización: </strong>
          {request.fecha_actualizacion}
        </p>
        <p>
          <strong> Fecha creación: </strong>
          {request.fecha_creacion}
        </p>
      </section>
      <section className="w-[400px] pl-28 grid grid-cols-1">
        <div className="grid grid-cols-1 ml-28 mx-1 items-center gap-2">
          <Button
          text="Gestionar"
          // className="w-[150px] select-none rounded-xl py-1 px-2 text-base font-normal border-2 hover:font-semibold text-primary hover:opacity-100 opacity-70 hover:shadow-md border-primary bg-default-white transition-all"
            onClick={() => {
              onClickAction(request);
            }}
          />
        </div>
      </section>
    </article>
  );
};

export default RequestCard;
