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

const CalendarSitePage = ({ idPlace }: { idPlace: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
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

  const getData = async () => {
    const response = await fetchFn(
      `/reservationsByPlace?email=${userSession.emailHash}&id_place=${idPlace}`
    );
    if (response.code !== 200) {
      return toast.error("No se ha podido obtener la información.", {
        id: "1",
      });
    }
    setReservationSite(response.data);
    // setLoading(true)
  };

  useEffect(() => {
    if (status === "authenticated") {
      getData();
      // setLoading(false)
    }
  }, [status]);
  return (
    <>
      <div>
        <p className="text-center text-primary mt-[20%] md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
          Reservaciones
        </p>
        {!loading && (
          <div className="w-[95%] m-5 p-8 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mx-auto bg-off-white rounded-xl">
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
                <div className="">
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
                />
              </div>
              <div className="flex items-center gap-2 justify-center text-center">
                <ButtonTable text="Reservar espacio" icon="calendar-event" />
                {/* {includesString(userSession.rols ?? [], [
                  "superadmin",
                  category,
                ]) && (
                    )} */}
                <ButtonTable text="Gestionar fechas" icon="calendar-range" />
              </div>
            </div>
            <TableCalendarSite reservationSite={reservationSite} />
          </div>
        )}
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
