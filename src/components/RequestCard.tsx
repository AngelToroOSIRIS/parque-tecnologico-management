"use client";

import {
  RequestData,
} from "@/types/d";
import Button from "./Button";
import { convertToCurrency, formatDate } from "@/libs/functionsStrings";

const RequestCard = ({
  request,
  onClickAction,
}: {
  request: RequestData;
  onClickAction: (requestData: RequestData, action: string) => void;
}) => {

  return (
        <article className="min-w-8xl flex p-4 justify-between mb-6 gap-10 items-center box">
          <section className="w-full flex justify-between">
            <div className="w-auto m-4">
            <p >
                <strong># Reservación: </strong>
                {request.reservacion.id}
              </p>
              <p>
                <strong>Nombre: </strong>
                {request.info_persona.nombre}
              </p>
              <p>
                <strong> Correo: </strong>
                {request.info_persona.email}
              </p>
              <p>
                <strong> Teléfono: </strong>
                {request.info_persona.telefono}
              </p>
            </div>
            <div className="w-auto m-4 my-auto">
              <p>
                <strong> Valor: </strong>
                {convertToCurrency(request.reservacion.valor)}
              </p>
              <p>
                <strong> Valor con descuento: </strong>
                {convertToCurrency(request.reservacion.valor_descuento)}
              </p>
              <p>
                <strong> Valor Pagado: </strong>
                {convertToCurrency(request.reservacion.valor_pagado)}
              </p>
              <p className="text-primary">
                <strong> Tipo de la solicitud: </strong>
                {request.estado_reservacion}
              </p>
            </div>
            <div className="w-auto m-4 my-auto">
              <p>
                <strong>Última actualización: </strong>
                {formatDate(request.reservacion.fecha_actualizacion, true)}
              </p>
              <p>
                <strong> Fecha creación: </strong>
                {formatDate(request.reservacion.fecha_creacion, true)}
              </p>
              <p onClick={() => {
                  onClickAction(request, "history");
                }} 
                className="mt-2 text-blue text-sm hover:underline select-none cursor-pointer transition-all">
                <i className="bi bi-clock-history"></i>{" "}
                Historial de actualizaciones
              </p>
            </div>
          </section>
          <section className="w-[12%] grid grid-cols-1">
            <div className="grid w-full grid-cols-1 mx-1 mr-0 justify-end gap-2">
              <Button
                text="Gestionar"
                // className="w-[150px] select-none rounded-xl py-1 px-2 text-base font-normal border-2 hover:font-semibold text-primary hover:opacity-100 opacity-70 hover:shadow-md border-primary bg-default-white transition-all"
                onClick={() => {
                  onClickAction(request, request.estado_reservacion);
                }}
              />
            </div>
          </section>
        </article>
  );
};

export default RequestCard;
