"use client";

import { useEffect, useState } from "react";
import Modal from "../Modal";
import RequestCard from "../RequestCard";
import { CategoryTextShort, RequestData } from "@/types/d";
import TextareaForm from "../forms/TextareaForm";
import fetchFn from "@/libs/fetchFn";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ReservationRecordCard from "../ReservationRecordCard";
import { formatDate } from "@/libs/functionsStrings";
import { categoriesObj } from "@/libs/staticData";
import { TailSpin } from "react-loader-spinner";
import ValidateNewRequestDates from "./ValidateNewRequestDates";

interface Props {
  params: { category: CategoryTextShort };
}

const Requests = ({ params }: Props) => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [validInfo, setValidInfo] = useState<any>();
  const [observation, setObservation] = useState<string>("");
  const [selectedRequest, setSelectedRequest] = useState<RequestData>();
  const [requests, setRequests] = useState<RequestData[]>([]);

  const categoryFound = categoriesObj.find(
    (item) => item.route === params.category
  );

  const getData = async () => {
    setLoading(true);
    const response = await fetchFn(
      `/getReservationsRequests?email=${session?.user.emailHash}&categoria=${params.category}`
    );
    if (response.code !== 200) {
      return toast.error("No se han podido obtener los datos", { id: "1" });
    }
    setRequests(response.data);
    setLoading(false);
  };

  const putData = async (approved: boolean) => {
    if (!approved) {
      if (!observation) {
        return toast.error("La observación es obligatoria", { id: "1" });
      }
    }
    const res = await fetchFn("/handleRequestsUsers", {
      method: "PUT",
      body: {
        email: session?.user.emailHash,
        id_historic: selectedRequest?.id_historial,
        approved: approved,
        observations: observation,
      },
    });
  };

  useEffect(() => {
    if (status === "authenticated") getData();
  }, [status]);

  return (
    <>
      {!loading && (
        <>
          <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            classContainer="w-[95%] max-w-2xl"
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
                      Fecha actual reservación:
                    </p>
                    <div className="flex justify-between px-3 text-center">
                      <p className="pb-7 text-center">
                        <strong> Fecha creación: </strong>{" "}
                        {formatDate(
                          selectedRequest?.reservacion.fecha_creacion ?? "",
                          true
                        )}
                      </p>
                      <p className="pb-7 text-center">
                        <strong> Fecha actualización: </strong>
                        {formatDate(
                          selectedRequest?.reservacion.fecha_actualizacion ??
                            "",
                          true
                        )}
                      </p>
                    </div>
                  </section>
                  <section className="flex justify-between px-3 gap-10 text-center mb-10">
                    <p className="min-w-[250px] max-h-10">
                      <strong>Numero de Factura:</strong> #
                      {selectedRequest?.cancelar_reservacion?.factura}
                    </p>
                    <p className="text-blue ml-2 text-base hover:underline select-none cursor-pointer transition-all">
                      Cuenta bancaria:{" "}
                      {selectedRequest?.cancelar_reservacion?.cuenta_bancaria}
                      <i className="bi bi-file-earmark-text ml-1"></i>
                    </p>
                  </section>
                </>
              )}

              {contentModal === "Solicitud cambio fecha" && (
                <>
                  <ValidateNewRequestDates
                    newDates={selectedRequest?.cambio_fecha_reservacion ?? []}
                    idPlace={selectedRequest?.reservacion.id_espacio ?? 0}
                    onSubmitAction={(valid) => setValidInfo(valid)}
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
            </div>
            {contentModal !== "history" && (
              <>
                <TextareaForm
                  onChange={() => {
                    setObservation;
                  }}
                  name="observation"
                  label={{
                    value: "Observación del proceso:",
                    required: false,
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
                <div className="flex mx-auto text-lg justify-center gap-7">
                  <div
                    className={
                      validInfo
                        ? "border-b-3  border-default-white  hover:border-green transition-all"
                        : "cursor-none "
                    }
                  >
                    <button
                      disabled={validInfo}
                      onClick={() => {
                        putData(true);
                      }}
                      type="button"
                      className={
                        validInfo
                          ? "font-base text-xl outline-none hover:text-green hover:font-semibold border-none transition-all justify-center rounded-lg px-4 py-1"
                          : "font-base text-xl cursor-default outline-none text-default-300 transition-all justify-center rounded-lg px-4 py-1"
                      }
                    >
                      Aceptar
                    </button>
                  </div>
                  <div className="border-b-3 border-default-white hover:border-primary transition-all">
                    <button
                      onClick={() => {
                        putData(false);
                      }}
                      type="button"
                      className="font-base hover:font-semibold border-b-2 hover:text-primary border-primary outline-none border-none transition-all justify-center rounded-lg px-4 py-1 text-xl"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              </>
            )}
          </Modal>
          {requests.length >= 1 && (
            <section className="lg:w-[85%] w-[70%] mx-auto">
              {requests.map((request) => (
                <RequestCard
                  key={request.reservacion.id}
                  request={request}
                  onClickAction={(request, action) => {
                    setSelectedRequest(request);
                    setContentModal(action);
                    setShowModal(true);
                  }}
                />
              ))}
            </section>
          )}
          {requests.length === 0 && (
            <>
              <div className="text-center text-default-300 select-none mt-[7%]">
                <i className="bi bi-x-circle text-7xl"></i>
                <p className="text-4xl mt-[1%]">
                  No se encuentran solicitudes <br /> para {categoryFound?.name}
                </p>
              </div>
            </>
          )}
        </>
      )}
      {loading && (
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
      )}
    </>
  );
};

export default Requests;
