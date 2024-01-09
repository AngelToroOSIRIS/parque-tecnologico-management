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
import { emptyValue, formatDate } from "@/libs/functionsStrings";
import { categoriesObj } from "@/libs/staticData";
import { TailSpin } from "react-loader-spinner";
import Link from "next/link";
import ValidateNewRequestDates from "./ValidateNewRequestDates";
import ButtonTable from "../ButtonTable";
import { useRouter } from "next/navigation";

interface Props {
  params: { category: CategoryTextShort };
}

const Requests = ({ params }: Props) => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
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
    const toastLoading = toast.loading("Guardando información...");
    const res = await fetchFn("/handleRequestsUsers", {
      method: "PUT",
      body: {
        email: session?.user.emailHash,
        id_historic: selectedRequest?.id_historial,
        approved: approved,
        observations: observation,
      },
    });
    if (res.code !== 200) {
      return toast.error("No se ha podido guardar", { id: toastLoading });
    }
    setShowModal(false);
    getData();
    toast.success("Datos guardados con exito", { id: toastLoading });
  };

  useEffect(() => {
    if (status === "authenticated") getData();
  }, [status]);

  const router = useRouter();

  return (
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
          {contentModal === "Solicitud cambio fecha" && (
            <>
              <h1 className="font-semibold text-primary text-2xl text-center m-4">
                Gestionar cambio de fecha
              </h1>
              <ValidateNewRequestDates
                newDates={selectedRequest?.cambio_fecha_reservacion ?? []}
                idPlace={selectedRequest?.reservacion.id_espacio ?? 0}
              />
            </>
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
                      selectedRequest?.reservacion.fecha_actualizacion ?? "",
                      true
                    )}
                  </p>
                </div>
              </section>
              <section className="flex justify-between px-3 gap-10 text-center mb-10">
                <p className="min-w-[250px] max-h-10">
                  <strong>Numero de Factura: </strong>
                  {selectedRequest?.cancelar_reservacion?.factura}
                </p>
                <Link
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_API_BASEURL}/document?name_document=${selectedRequest?.cancelar_reservacion?.cuenta_bancaria}`}
                  className="text-blue ml-2 text-base hover:underline select-none cursor-pointer transition-all"
                >
                  Cuenta bancaria{" "}
                  <i className="bi bi-file-earmark-text ml-1"></i>
                </Link>
              </section>
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
              onChange={({ value }: { value: string }) => setObservation(value)}
              name="observation"
              label={{
                value: "Observación del proceso:",
                required: false,
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
            <p className="text-sm font-medium text-gray">
              Si desea rechazar la solicitud debe ingresar una observación.
            </p>
            <div className="flex mx-auto text-lg justify-center gap-7 mt-4">
              <div
                className={
                  "border-b-3  border-default-white hover:border-green transition-all"
                }
              >
                <button
                  onClick={() => {
                    putData(true);
                  }}
                  type="button"
                  className="font-base hover:font-semibold border-b-2 hover:text-green border-primary outline-none border-none transition-all justify-center rounded-lg px-4 py-1 text-xl"
                >
                  Aceptar
                </button>
              </div>
              <div
                className={
                  !emptyValue(observation)
                    ? "border-b-3 border-default-white hover:border-primary transition-all"
                    : "border-b-3 border-default-white transition-all"
                }
              >
                <button
                  onClick={() => {
                    putData(false);
                  }}
                  disabled={emptyValue(observation)}
                  type="button"
                  className={
                    !emptyValue(observation)
                      ? "font-base text-xl outline-none hover:text-primary hover:font-semibold border-none transition-all justify-center rounded-lg px-4 py-1"
                      : "font-base text-xl outline-none text-default-300 border-none transition-all justify-center rounded-lg px-4 py-1"
                  }
                >
                  Rechazar
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
      {!loading && (
        <>
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
              <div className="absolute top-28 ml-[17%]">
                <ButtonTable
                  text="Volver"
                  icon="arrow-left"
                  onClick={() => {
                    router.back();
                  }}
                />
              </div>
              <div className="text-center text-default-300 select-none mt-[7%]">
                <i className="bi bi-x-circle text-7xl"></i>
                <p className="text-4xl mt-[1%]">
                  No existen solicitudes <br /> para {categoryFound?.name}
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
