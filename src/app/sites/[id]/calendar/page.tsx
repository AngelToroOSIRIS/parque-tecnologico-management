"use client";

import ButtonTable from "@/components/ButtonTable";
import Header from "@/components/Header";
import TableCalendar from "@/components/pages/TableCalendar";
import { includesString } from "@/libs/functionsStrings";
import { CategoryTextShort } from "@/types/d";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

interface Props {
  params: { category: CategoryTextShort };
}

const CalendarPage = ({ params }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, status } = useSession();
  const userSession = data?.user ?? {
    name: "default",
    email: "useremail",
  };
  return (
    <>
    {!loading && (
    <div>
      <Header />
        <p className="text-center text-primary mt-[20%] md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
          Agenda del sitio 
        </p>
        <div className="w-[80%] m-5 p-8 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mx-auto bg-off-white rounded-xl">
        <div className="flex justify-between font-medium items-center gap-3 ">
          <div className="flex justify-center items-center text-center gap-2">
            <ButtonTable
              text="Filtrar por Hora"
              icon="calendar-event"
              // onClick={() => {
              //   setShowModal(true);
              //   setContentModal("hour");
              // }}
            />
            <ButtonTable
              text="Filtrar por dia"
              icon="calendar-range"
              // onClick={() => {
              //   setShowModal(true);
              //   setContentModal("day");
              // }}
            />
            <ButtonTable
              text="Filtrar por rango"
              icon="calendar-event"
              // onClick={() => {
              //   setShowModal(true);
              //   setContentModal("range");
              // }}
            />
          </div>
          <div className="flex items-center gap-2 justify-center text-center">
            <ButtonTable text="Reservar espacio" icon="calendar-event" />
            {includesString(userSession.rols ?? [], [
              "superadmin",
              params.category,
            ]) && <ButtonTable text="Gestionar fechas" icon="calendar-range" />}
          </div>
        </div>
            <TableCalendar params={params}/>
        </div>
    </div>
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

export default CalendarPage;
