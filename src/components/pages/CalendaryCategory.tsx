"use client";

import React, { useEffect, useState } from "react";
import ButtonTable from "../ButtonTable";
import Calendar from "@/components/Calendar";
import { DtCalendar } from "../react-calendar-datetime-picker/dist";
import { categoriesObj } from "@/libs/staticData";
import { CategoryTextShort, ReservationCategory } from "@/types/d";
import TableCalendar from "@/components/pages/TableCalendar";
import { useSession } from "next-auth/react";
import moment from "moment";
import Modal from "../Modal";
import { includesString } from "@/libs/functionsStrings";
import Input from "../forms/Input";
import GraySubtitle from "../GraySubtitle";
import Button from "../Button";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

export default function CalendaryCategory({
  category,
}: {
  category: CategoryTextShort;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [reserCategory, setReserCategory] = useState<ReservationCategory[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<ReservationCategory>();
  const [contentModal, setContentModal] = useState<string>("");
  {
    const { data: session, status } = useSession();
    const userSession = session?.user ?? {
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

    const getData = async () => {
      setLoading(true);
      const response = await fetchFn(
        `/reservationsUsers?email=${session?.user.emailHash}&categoria=${category}`
      );
      if (response.code !== 200) {
        return toast.error("No se ha podido obtener la información.", {
          id: "1",
        });
      }
      setReserCategory(response.data);
      setLoading(false);
    };

    useEffect(() => {
      if (status === "authenticated") getData();
    }, [status]);

    const categoryFound = categoriesObj.find((item) => item.route === category);
    return (
      <>
        <>
          <p className="text-center text-primary mt-[20%] md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
            Agenda de {categoryFound?.name}
          </p>
          {!loading && (
            <div className="w-[95%] m-5 p-8 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mx-auto bg-off-white rounded-xl">
              <Modal
                isOpen={showModal}
                setIsOpen={setShowModal}
                classContainer={contentModal ? "max-w-[700px]" : "max-w-xl"}
              >
                <h1 className="text-center text-2xl font-bold text-primary mx-auto justify-center items-center">
                  Filtrar por{" "}
                </h1>
                <div>
                  <i
                    className="bi bi-x absolute text-borders top-2 right-3 hover:text-primary text-3xl transition-all cursor-pointer"
                    onClick={() => setShowModal(false)}
                  ></i>
                  <div className="">
                    {contentModal === "hour" && (
                      <div className="py-2 m-3 justify-between">
                        {" "}
                        <Calendar idPlace={1} customFn={() => {}} />{" "}
                      </div>
                    )}

                    {contentModal === "day" && (
                      <>
                        <div className="flex py-2 gap-5 m-3 justify-between">
                          <DtCalendar
                            onChange={setDate}
                            type="single"
                            placeholder="Filtrar por día"
                            local="en"
                            minDate={minDate}
                          />
                          <div className="w-full">
                              <p className="text-center m-5 text-soft-gray text-xl font-medium">
                                Seleccione día
                              </p>
                              <div className="mt-20">
                              <Button
                                icon="calendar-check"
                                text="Consultar disponibilidad"
                              />
                              </div>
                          </div>
                        </div>
                      </>
                    )}
                    {contentModal === "info" &&(
                      <p>Antonio, Buenas tardes</p>
                    )}
                    {contentModal === "range" && (
                      <>
                        <div className="flex gap-5 py-2 m-3 justify-between">
                          <DtCalendar
                            onChange={setDate}
                            type="range"
                            placeholder="Filtrar por día"
                            local="en"
                            minDate={minDate}
                          />
                          <div className="w-full">
                            <>
                              <p className="mb-3 text-soft-gray text-xl font-medium">
                                Seleccione el rango
                              </p>
                              <div className="w-full md:w-64 block sm:flex md:block gap-4 justify-center">
                                <div className="w-full">
                                  <GraySubtitle text="Fecha inicio:" />
                                  <Input
                                    type="datetime-local"
                                    name="date_start"
                                    icon="calendar-range"
                                  />
                                </div>
                                <div className="w-full mb-7">
                                  <GraySubtitle text="Fecha fin:" />
                                  <Input
                                    type="datetime-local"
                                    name="date_end"
                                    icon="calendar-range-fill"
                                  />
                                </div>
                              </div>
                              <Button
                                icon="calendar-check"
                                text="Consultar disponibilidad"
                              />
                            </>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Modal>
              <div className="flex justify-between font-medium items-center gap-3 ">
                <div className="flex justify-center items-center text-center gap-2">
                  <ButtonTable
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
                    icon="calendar-event"
                    onClick={() => {
                      setShowModal(true);
                      setContentModal("day");
                    }}
                  />
                  <ButtonTable
                    text="Filtrar por rango"
                    type="button"
                    icon="calendar-range"
                    onClick={() => {
                      setShowModal(true);
                      setContentModal("range");
                    }}
                  />
                </div>
                <div className="flex items-center gap-2 justify-center text-center">
                  <ButtonTable text="Reservar espacio" icon="calendar-event" />
                  {includesString(userSession.rols ?? [], [
                    "superadmin",
                    category,
                  ]) && (
                    <ButtonTable
                      text="Gestionar fechas"
                      icon="calendar-range"
                    />
                  )}
                </div>
              </div>
              <TableCalendar
              onClickAction={(reservation, action)=>{
                  setSelectedReservation(reservation)
                  setContentModal(action);
                  setShowModal(true)
              }}
                category={category}
                reserCategory={reserCategory}
              />
            </div>
          )}
        </>
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
  }
}
