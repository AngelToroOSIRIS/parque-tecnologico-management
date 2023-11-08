"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import TextareaForm from "./forms/TextareaForm";
import { DtCalendar } from "./react-calendar-datetime-picker/dist";
import moment from "moment";
import InputForm from "./forms/InputForm";

interface Props {
  isOpen: any;
  title: string;
  text?: string;
  button1: string;
  onClick?: any;
  closeModal: any;
  type: "options" | "form" | "datetime";
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
        size={type === "datetime" ? "3xl" : "md"}
        classNames={{
          closeButton: "hidden",
          base: "w-full",
        }}
        isDismissable={false}
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center gap-1 outline-none">
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

              {type === "form" && (
                <ModalBody>
                  <div>
                    <TextareaForm
                      onChange={() => {}}
                      name="observation"
                      label={{
                        required: true,
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

              {type === "datetime" && (
                <ModalBody>
                  <div className="flex px-10 justify-between font-medium items-center gap-3 ">
                    <DtCalendar
                      onChange={setDate}
                      type="single"
                      placeholder="Filtrar por día"
                      local="en"
                      minDate={minDate}
                    />
                    <div>
                      <InputForm
                        name="dateInit"
                        type="datetime-local"
                        onChange={() => {}}
                        label={{
                          required: true,
                          value: "Fecha actual del usuario:",
                        }}
                        className="mb-14"
                      />
                      <InputForm
                        name="dateEnd"
                        type="datetime-local"
                        onChange={() => {
                          date;
                        }}
                        label={{
                          required: true,
                          value: "Seleccionar nueva fecha:"
                        }}
                      />
                    </div>
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
