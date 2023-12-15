"use client";

import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ButtonTable from "../ButtonTable";
import { TailSpin } from "react-loader-spinner";
import { DtCalendar } from "../react-calendar-datetime-picker/dist";
import Modal from "../Modal";
import Calendar from "../Calendar";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { ReservationSite } from "@/types/d";
import TableCalendarSite from "../TableCalendarSite";
import { convertToCurrency, formatDate } from "@/libs/functionsStrings";
import { useRouter } from "next/navigation";

const CalendarSitePage = ({ idPlace }: { idPlace: number }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationSite>();
  const [reservationSite, setReservationSite] = useState<ReservationSite[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<string>("");
  const { data, status } = useSession();
  const userSession = data?.user ?? {
    name: "default",
    email: "useremail",
  };
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

  const newDates = selectedReservation?.fechas ?? [];

  const getData = async () => {
    setLoading(true);
    const response = await fetchFn(
      `/reservationsByPlace?email=${userSession.emailHash}&id_place=${idPlace}`
    );
    if (response.code !== 200) {
      return toast.error("No se ha podido obtener la información", {
        id: "1",
      });
    }
    setReservationSite(response.data);
    setLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status]);
  return (
    <>
      <div>
        <p className="text-center text-primary mt-[20%] md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
          Reservaciones
        </p>
        <>
          {!loading && (
            <div className="w-[95%] m-5 p-4 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mx-auto bg-off-white rounded-xl">
              <Modal
                isOpen={showModal}
                setIsOpen={setShowModal}
                classContainer={
                  contentModal !== "info" ? "max-w-[700px]" : "max-w-4xl"
                }
              >
                <div>
                  <i
                    className="bi bi-x absolute text-borders top-2 right-3 hover:text-primary text-3xl transition-all cursor-pointer"
                    onClick={() => setShowModal(false)}
                  ></i>
                  <div className="">
                    {contentModal === "info" && (
                      <>
                        <div>
                          <p className="text-primary text-xl text-center mt-4 mb-3 font-semibold">
                            Información de la reserva:{" "}
                          </p>
                          <section className="flex items-center justify-between gap-2 mb-4 py-3 px-8">
                            <div>
                              <p>
                                <strong># Reservación: </strong>
                                {selectedReservation?.id}
                              </p>
                              <p>
                                <strong>Nombre del espacio: </strong>
                                {selectedReservation?.nombre_espacio}
                              </p>
                              <p>
                                <strong>Estado del pago: </strong>
                                {selectedReservation?.estado_pago}
                              </p>
                              <p>
                                <strong>Estado de la reservación: </strong>
                                {selectedReservation?.estado_reservacion}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Valor espacio: </strong>
                                {convertToCurrency(selectedReservation?.valor)}
                              </p>
                              <p>
                                <strong>Valor descuento: </strong>
                                {convertToCurrency(
                                  selectedReservation?.valor_descuento
                                )}
                              </p>
                              <p>
                                <strong>Valor pagado: </strong>
                                {convertToCurrency(
                                  selectedReservation?.valor_pagado
                                )}
                              </p>
                            </div>
                          </section>
                          {newDates.length > 0 && (
                            <>
                              <hr className="w-[90%] border-1 rounded-lg text-default-300 mx-auto" />
                              <p className="text-primary mt-4 text-xl mb-3 text-center font-semibold">
                                Fechas reservadas:{" "}
                              </p>
                              {newDates.map((dates) => {
                                return (
                                  <div
                                    className="my-5"
                                    key={dates.id_reservacion_espacio}
                                  >
                                    <p className="mx-8 m-2 text-primary font-semibold">
                                      # Fecha reservada:{" "}
                                      {dates.id_reservacion_espacio}
                                    </p>
                                    <section className=" flex-center gap-5 mx-10 px-10">
                                      <div>
                                        <p>
                                          <strong>Fecha de Inicio: </strong>
                                          {formatDate(dates.fecha_inicio, true)}
                                        </p>
                                      </div>
                                      <div>
                                        <p>
                                          <strong>Fecha de Fin: </strong>
                                          {formatDate(dates.fecha_fin, true)}
                                        </p>
                                      </div>
                                      <p>
                                        <strong>Valor: </strong>
                                        {convertToCurrency(dates.valor)}
                                      </p>
                                    </section>
                                  </div>
                                );
                              })}
                            </>
                          )}
                          <hr className="w-[90%] border-1 mt-7 rounded-lg text-default-300 mx-auto" />
                          <p className="text-primary text-xl text-center mt-4 mb-3 font-semibold">
                            Información del cliente:{" "}
                          </p>
                          <section className="flex items-center justify-between gap-3 mb-4 py-3 px-8">
                            <div>
                              <p>
                                <strong>Nombre cliente: </strong>
                                {selectedReservation?.persona_info.nombre}
                              </p>
                              <p>
                                <strong>Email cliente: </strong>
                                {selectedReservation?.persona_info.email}
                              </p>
                              <p
                                className={
                                  selectedReservation?.persona_info
                                    .email_facturacion
                                    ? "block"
                                    : "hidden"
                                }
                              >
                                <strong>Email facturación cliente: </strong>
                                {
                                  selectedReservation?.persona_info
                                    .email_facturacion
                                }
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Telefono cliente: </strong>
                                {selectedReservation?.persona_info.telefono}
                              </p>
                              <p>
                                <strong>Dirección cliente: </strong>
                                {selectedReservation?.persona_info.direccion}
                              </p>
                            </div>
                          </section>
                        </div>
                      </>
                    )}
                    {contentModal === "hour" && (
                      <div className="py-2 m-3 justify-between">
                        {" "}
                        <Calendar idPlace={1} customFn={() => {}} />{" "}
                      </div>
                    )}
                    {contentModal === "day" && (
                      <DtCalendar
                        onChange={setDate}
                        type="single"
                        placeholder="Filtrar por día"
                        local="en"
                        minDate={minDate}
                      />
                    )}
                    {contentModal === "range" && (
                      <DtCalendar
                        onChange={setDate}
                        type="range"
                        placeholder="Filtrar por rango"
                        local="en"
                        minDate={minDate}
                      />
                    )}
                    {contentModal === "reservation" && (
                      <>
                        <p className="text-primary text-xl text-center mt-4 mb-3 font-semibold">
                          Reservar espacio
                        </p>
                        <div className="m-5">
                          <Calendar idPlace={1} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Modal>

              <div className="flex justify-between font-medium items-center gap-3 ">
                <div className="flex justify-center items-center text-center gap-2">
                  {/* <ButtonTable
                    text="Filtrar por Hora"
                    type="button"
                    icon="calendar-event"
                    onClick={() => {
                      setShowModal(true);
                      setContentModal("hour");
                    }}
                  />
                  <ButtonTable
                    text="Filtrar por dia"
                    type="button"
                    icon="calendar-range"
                    onClick={() => {
                      setShowModal(true);
                      setContentModal("day");
                    }}
                  />
                  <ButtonTable
                    text="Filtrar por rango"
                    type="button"
                    icon="calendar-event"
                    onClick={() => {
                      setShowModal(true);
                      setContentModal("range");
                    }}
                  /> */}
                </div>
                <div className="flex items-center gap-2 justify-center text-center">
                  <ButtonTable
                    text="Administrar fechas"
                    onClick={() => {
                      router.push(`/sites/${idPlace}/dates`);
                    }}
                    icon="calendar-week"
                  />
                  <ButtonTable
                    onClick={() => {
                      setContentModal("reservation");
                      setShowModal(true);
                    }}
                    text="Reservar espacio"
                    icon="calendar-event"
                  />
                </div>
              </div>
              <TableCalendarSite
                onClickAction={(reservation, action) => {
                  setSelectedReservation(reservation);
                  setContentModal(action);
                  setShowModal(true);
                }}
                reservationSite={reservationSite}
              />
            </div>
          )}
        </>
      </div>
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

export default CalendarSitePage;
