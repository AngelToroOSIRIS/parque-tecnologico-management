"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import TextareaForm from "./forms/TextareaForm";
import moment from "moment";
import InputForm from "./forms/InputForm";
import Button from "./Button";

interface Props {
  isOpen: any;
  title: "Aceptar Solicitud" | "Rechazar solicitud";
  text?: string;
  button1: string;
  onClick?: any;
  closeModal: any;
  type: "options" | "form" | "aceptedDate" | "CancelDate";
}
const ModalComponent = ({
  isOpen,
  title,
  text,
  button1,
  onClick,
  closeModal,
  type,
}: Props) => {
  const { onOpenChange } = useDisclosure();
  const [date, setDate] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);
  const minDate = {
    year: moment().year(),
    month: moment().month() + 1,
    day: moment().date(),
  };
  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        size={type === "aceptedDate" ? "3xl" : "md"}
        classNames={{
          closeButton: "hidden",
          base: "w-full",
        }}
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-primary text-center gap-1 outline-none">
                {title}
              </ModalHeader>

              {type === "options" && (
                <ModalBody>
                  <div>
                    <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                      {text}
                    </p>
                  </div>
                  <ModalFooter>
                    <div className="flex items-center mx-auto text-center">
                      <div>
                        <button
                          onClick={onClick}
                          type="button"
                          className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 py-2 text-lg"
                        >
                          {button1}
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="inline-flex font-base hover:font-bold outline-none border-none transition-all justify-center rounded-lg px-4 py-2 text-lg"
                          onClick={closeModal}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </ModalFooter>
                </ModalBody>
              )}

              {type === "CancelDate" && (
                <ModalBody>
                  <div className="px-5 font-medium items-center gap-3 ">
                    <p className="pb-7 text-center">
                      <strong> Fecha actual de reserva:</strong> 25/11/2023
                      10:00 am
                    </p>
                    <TextareaForm
                      onChange={() => {}}
                      name="observation"
                      label={{
                        required: false,
                        value: "Observación del proceso:",
                      }}
                      validations={{
                        maxLength: {
                          value: 250,
                          message:
                            "La observación debe contener máximo 250 caracteres.",
                        },
                      }}
                      placeholder="Observación sobre el proceso de la solicitud"
                      minRows={6}
                    />
                  </div>
                  <ModalFooter>
                    <div className="flex items-center mx-auto text-center">
                      <div>
                        <button
                          onClick={onClick}
                          type="button"
                          className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 py-2 text-lg"
                        >
                          {button1}
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="inline-flex font-base hover:font-bold outline-none border-none transition-all justify-center rounded-lg px-4 py-2 text-lg"
                          onClick={closeModal}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </ModalFooter>
                </ModalBody>
              )}

              {type === "aceptedDate" && (
                <ModalBody>
                  <div className="px-10 font-medium items-center gap-3 ">
                    <div className="flex justify-between px-10">
                      <p className="pb-7 text-center">
                        <strong> Fecha inicio</strong> 25/11/2023
                        10:00 am
                      </p>
                      <p className="pb-7 text-center">
                        <strong> Fecha final</strong> 25/11/2023
                        10:00 am
                      </p>
                    </div>

                    <div className="py-4 items-center text-center mb-7">
                      <p>
                        <strong>Fecha de peticíon: </strong>
                        29/11/2023
                        11:00 am
                      </p>
                      <div className="w-[40%] mx-auto p-4">
                        <Button text="Consultar disponibilidad" />
                      </div>
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
                  </div>
                  <ModalFooter>
                    <div className="flex items-center mx-auto text-center">
                      <div>
                        <button
                          onClick={onClick}
                          type="button"
                          className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 py-2 text-lg"
                        >
                          {button1}
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="inline-flex font-base hover:font-bold outline-none border-none transition-all justify-center rounded-lg px-4 py-2 text-lg"
                          onClick={closeModal}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </ModalFooter>
                </ModalBody>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
