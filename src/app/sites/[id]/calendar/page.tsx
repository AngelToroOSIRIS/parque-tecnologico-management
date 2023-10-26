"use client";

import Header from "@/components/Header";
import TableCalendar from "@/components/pages/TableCalendar";
import { CategoryTextShort } from "@/types/d";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

interface Props {
  params: { category: CategoryTextShort };
}

const CalendarPage = ({ params }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
    {!loading && (
    <div>
      <Header />
        <p className="text-center text-primary mt-[20%] md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
          Agenda del sitio
        </p>
        <div className="w-[80%] m-5 p-8 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mx-auto bg-off-white rounded-xl">
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
