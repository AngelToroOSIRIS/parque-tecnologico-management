"use client";

import { useState } from "react";
import Modal from "../Modal";
import RequestCard from "../RequestCard";
import { Request } from "@/types/d";
import TextareaForm from "../forms/TextareaForm";
import Button from "../Button";

const Request = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRequest, setselectedRequest] = useState<Request>();
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      nombre: "Angel Toro",
      correo: "angel.toro@escuelaing.edu.co",
      telefono: "3000000000",
      valor: "160.000",
      valor_descuento: "50%",
      valor_pagado: "80.000",
      estado: "Cancelación",
      fecha_creacion: "01/11/2023",
      fecha_actualizacion: "01/11/2023",
      fecha_inicio: "25/11/2023 10:00 am",
      fecha_fin: "25/11/2023 11:00 am",
    },
    {
      id: 2,
      nombre: "Camilo Galindo",
      correo: "camilo.galindo-r@escuelaing.edu.co",
      telefono: "3001122345",
      valor: "180.000",
      valor_descuento: "0%",
      valor_pagado: "180.000",
      estado: "Cambio de fecha",
      fecha_creacion: "01/11/2023",
      fecha_actualizacion: "01/11/2023",
      fecha_inicio: "25/11/2023 10:00 am",
      fecha_fin: "25/11/2023 11:00 am",
    },
  ]);

  return (
    <>
      <Modal
        isOpen={showModal}
        setIsOpen={setShowModal}
        classContainer="w-[95%] max-w-xl"
      >
        {selectedRequest?.estado === "Cancelación" && (
          <>
            <div>
              <i
                className="bi bi-x absolute text-borders top-2 right-3 hover:text-primary text-3xl transition-all cursor-pointer"
                onClick={() => setShowModal(false)}
              ></i>
              <p className="text-xl m-5 font-semibold text-primary text-center">
                Gestionar {selectedRequest.estado}
              </p>
              <section>
                <p className="mx-3 my-4 font-semibold text-center text-lg">
                  Fecha actual:
                </p>
                <div className="flex justify-between px-3 text-center">
                  <p className="pb-7 text-center">
                    <strong> Fecha inicio</strong>{" "}
                    {selectedRequest.fecha_inicio}
                  </p>
                  <p className="pb-7 text-center">
                    <strong> Fecha fin</strong> {selectedRequest.fecha_fin}
                  </p>
                </div>
              </section>
              <section className="flex justify-between  mx-12 mb-10">
                <p>
                  <strong>Numero de Factura:</strong> N° 168
                </p>
                  <p className="text-blue ml-2 text-base hover:underline select-none cursor-pointer transition-all">
                    Cuenta bancaria
                    <i className="bi bi-file-earmark-text ml-1"></i>
                  </p>
              </section>
              <section>
                <TextareaForm
                  onChange={() => {}}
                  name="observation"
                  label={{
                    value: "Observación del proceso:",
                  }}
                  validations={{
                    required: "Es necesaria la observación",
                    minLength: {
                      value: 10,
                      message:
                        "La observación debe tener minimo 10 caracteres.",
                    },
                    maxLength: {
                      value: 250,
                      message:
                        "La observación debe contener máximo 250 caracteres.",
                    },
                  }}
                  placeholder="Observación sobre el proceso de la solicitud"
                  minRows={5}
                />
              </section>
              <div className="flex mx-auto text-lg justify-center gap-7">
                <div className="border-b-3  border-default-white  hover:border-green transition-all">
                  <button
                    type="button"
                    className="font-base text-xl outline-none hover:text-green hover:font-semibold border-none transition-all justify-center rounded-lg px-4 py-1"
                  >
                    Aceptar
                  </button>
                </div>
                <div className="border-b-3 border-default-white hover:border-primary transition-all">
                  <button
                    type="button"
                    className="font-base hover:font-semibold border-b-2 hover:text-primary border-primary outline-none border-none transition-all justify-center rounded-lg px-4 py-1 text-xl"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {selectedRequest?.estado === "Cambio de fecha" && (
          <>
            <div>
              <i
                className="bi bi-x absolute text-borders top-2 right-3 hover:text-primary text-3xl transition-all cursor-pointer"
                onClick={() => setShowModal(false)}
              ></i>
              <p className="text-xl font-semibold text-primary p-5 text-center">
                Gestionar {selectedRequest.estado}
              </p>
              <section className="flex justify-between p-2 font-medium gap-3 ">
                <div className="px-5 text-center">
                  <p className="m-3 font-semibold text-lg">Fecha actual:</p>
                  <p className="pb-7 text-center">
                    <strong> Fecha inicio</strong>{" "}
                    {selectedRequest.fecha_inicio}
                  </p>
                  <p className="pb-7 text-center">
                    <strong> Fecha fin</strong> {selectedRequest.fecha_fin}
                  </p>
                </div>

                <div className="px-5 items-center text-center">
                  <p className="m-3 text-primary font-semibold text-lg">
                    Fecha petición:
                  </p>
                  <p className="pb-7 text-center">
                    <strong>Fecha inicio: </strong>
                    29/11/2023 11:00 am
                  </p>
                  <p>
                    <strong>Fecha fin: </strong>
                    29/11/2023 12:00 am
                  </p>
                </div>
              </section>

              <div className="w-[60%] mx-auto mb-5 p-2">
                <Button text="Consultar disponibilidad" />
              </div>
              <TextareaForm
                onChange={() => {}}
                name="observation"
                label={{
                  value: "Observación del proceso:",
                }}
                validations={{
                  required: "Es necesaria la observación",
                  minLength: {
                    value: 10,
                    message: "La observación debe tener minimo 10 caracteres.",
                  },
                  maxLength: {
                    value: 250,
                    message:
                      "La observación debe contener máximo 250 caracteres.",
                  },
                }}
                placeholder="Observación sobre el proceso de la solicitud"
                minRows={5}
              />
              <div className="flex mx-auto text-lg justify-center gap-7">
                <div className="border-b-3  border-default-white  hover:border-green transition-all">
                  <button
                    type="button"
                    className="font-base text-xl outline-none hover:text-green hover:font-semibold border-none transition-all justify-center rounded-lg px-4 py-1"
                  >
                    Aceptar
                  </button>
                </div>
                <div className="border-b-3 border-default-white hover:border-primary transition-all">
                  <button
                    type="button"
                    className="font-base hover:font-semibold border-b-2 hover:text-primary border-primary outline-none border-none transition-all justify-center rounded-lg px-4 py-1 text-xl"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
      <section className="lg:w-[85%] w-[70%] mx-auto">
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onClickAction={(request) => {
              setselectedRequest(request);
              setShowModal(true);
            }}
          />
        ))}
      </section>
    </>
  );
};

export default Request;
