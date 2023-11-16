"use client";

import { useEffect, useState } from "react";
import Modal from "../Modal";
import RequestCard from "../RequestCard";
import { CategoryTextShort, RequestData } from "@/types/d";
import TextareaForm from "../forms/TextareaForm";
import Button from "../Button";
import fetchFn from "@/libs/fetchFn";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ReservationRecordCard from "../ReservationRecordCard";
import { formatDate } from "@/libs/functionsStrings";
import { categoriesObj } from "@/libs/staticData";
import Categories from "./Categories";

interface Props {
  params: { category: CategoryTextShort };
}

const Requests = ({ params }: Props) => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<string>("");
  const [selectedRequest, setSelectedRequest] = useState<RequestData>();
  const [requests, setRequests] = useState<RequestData[]>([]);

  const categoryFound = categoriesObj.find(
    (item) => item.route === params.category
  );

  const getData = async () => {
    const response = await fetchFn(
      `/getReservationsRequests?email=${session?.user.emailHash}&categoria=${params.category}`
    );
    if (response.code !== 200) {
      return toast.error("No se han podido obtener los datos", { id: "1" });
    }
    setRequests(response.data);
  };

  useEffect(() => {
    if (status === "authenticated") getData();
  }, [status]);

  return (
    <>
      <Modal
        isOpen={showModal}
        setIsOpen={setShowModal}
        classContainer="w-[95%] max-w-xl"
      >
        <div>
          <i
            className="bi bi-x absolute text-borders top-2 right-3 hover:text-primary text-3xl transition-all cursor-pointer"
            onClick={() => setShowModal(false)}
          ></i>
          {contentModal !== "history" && (
            <p className="text-xl m-5 font-semibold text-primary text-center">
              {contentModal}
            </p>
          )}

          {contentModal === "Solicitud cancelación" && (
            <>
              <section>
                <p className="mx-3 my-4 font-semibold text-center text-lg">
                  Fecha actual reserva
                </p>
                <div className="flex justify-between px-3 text-center">
                  <p className="pb-7 text-center">
                    <strong> Fecha inicio</strong>{" "}
                    {selectedRequest?.solicitud_reservacion.fecha_inicio}
                  </p>
                  <p className="pb-7 text-center">
                    <strong> Fecha fin</strong>
                    {selectedRequest?.solicitud_reservacion.fecha_fin}
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
            </>
          )}

          {contentModal === "Solicitud cambio fecha" && (
            <>
              <section className="font-medium gap-3 ">
                  <p className="my-3 font-semibold text-center text-lg">
                    Fecha actual reserva
                  </p>
                  <div className="flex justify-between text-center mb-10">
                    <p className="text-center">
                      <strong> Fecha inicio:</strong>{" "}
                      {formatDate(
                        selectedRequest?.solicitud_reservacion.fecha_inicio ?? "",
                        true
                      )}
                    </p>
                    <p className="text-center">
                      <strong> Fecha fin:</strong>{" "}
                      {formatDate(
                        selectedRequest?.solicitud_reservacion.fecha_fin ?? "",
                        true
                      )}
                    </p>
                </div>

                <div className="items-center text-center">
                  <p className="m-3 text-primary font-semibold text-lg">
                    Fecha petición de cambio
                  </p>
                  <div className="flex justify-between mb-10">
                    <p className="text-center">
                      <strong>Fecha inicio: </strong>
                      29/11/2023 11:00 am
                    </p>
                    <p>
                      <strong>Fecha fin: </strong>
                      29/11/2023 12:00 am
                    </p>
                  </div>
                </div>
              </section>
              <section className="w-[60%] mx-auto mb-5 p-2">
                <Button text="Consultar disponibilidad" />
              </section>
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
            </>
          )}

          {contentModal === "history" && (
            <>
              <p className="text-xl m-5 font-semibold text-primary text-center">
                Historial de actualizaciones
              </p>
              <section className="flex flex-col gap-5">
                {selectedRequest?.historial.map((record) => (
                  <ReservationRecordCard record={record} key={record.id} />
                ))}
              </section>
            </>
          )}

          {contentModal !== "history" && (
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
          )}
        </div>
      </Modal>
      <section className="lg:w-[85%] w-[70%] mx-auto">
        {requests.map((request) => (
          <RequestCard
            key={request.solicitud_reservacion.id}
            request={request}
            onClickAction={(request, action) => {
              setSelectedRequest(request);
              setContentModal(action);
              setShowModal(true);
            }}
          />
        ))}
      </section>
    </>
  );
};

export default Requests;
