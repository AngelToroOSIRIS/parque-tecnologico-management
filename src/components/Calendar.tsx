"use client";
 
import { useState } from "react";
import { DtCalendar } from "./react-calendar-datetime-picker/dist";
import Button from "./Button";
import Input from "../components/forms/Input";
import GraySubtitle from "../components/GraySubtitle";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import moment from "moment";
import { ReservationDateDetails } from "@/types/d";
 
const Calendar = ({
  idPlace,
  classContainer,
  onSelectDates,
  customFn,
}: {
  idPlace: number;
  classContainer?: string;
  onSelectDates?: ({}: ReservationDateDetails) => void;
  customFn?: ({}: { time_start: string; time_end: string }) => any;
}) => {
  const minDate = {
    year: moment().year(),
    month: moment().month() + 1,
    day: moment().date() + 1,
  };
  const maxDate = {
    year: moment().year(),
    month: 12,
    day: 31,
  };
 
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);
  const [times, setTimes] = useState<{
    time_start: string;
    time_end: string;
  }>({ time_start: "05:00", time_end: "06:00" });
 
  const checkDisponibility = async () => {
    if (!date) return toast.error("Seleccione una fecha");
 
    const monthSelected = String(date?.month);
    const daySelected = String(date?.day);
    const stringDate = `${date?.year}-${
      monthSelected.length < 2 ? "0" + monthSelected : monthSelected
    }-${daySelected.length < 2 ? "0" + daySelected : daySelected}`;
    const dateTimeStart = `${stringDate}T${times.time_start}:00.000`;
    const dateTimeEnd = `${stringDate}T${times.time_end}:00.000`;
 
    if (customFn) {
      return customFn({
        time_start: dateTimeStart,
        time_end: dateTimeEnd,
      });
    }
 
    if (onSelectDates) {
      onSelectDates({
        dateTimeStart: "",
        dateTimeEnd: "",
        totalTime: "",
        value: 0,
        valid: false,
      });
    }
    const toastLoading = toast.loading("Verificando disponibilidad...");
    setLoading(true);
    const response = await fetchFn("/spaceAvailability", {
      method: "POST",
      body: {
        id_espacio: idPlace,
        fecha_inicio: dateTimeStart,
        fecha_fin: dateTimeEnd,
      },
    });
    setLoading(false);
 
    if (response.code === 500) {
      return toast.error("No se ha podido verificar", { id: toastLoading });
    }
    if (response.code !== 200) {
      return toast.error("No se ha encontrado disponibilidad", {
        id: toastLoading,
      });
    }
 
    toast.dismiss(toastLoading);
    if (onSelectDates) {
      onSelectDates({
        id: Date.now(),
        dateTimeStart,
        dateTimeEnd,
        totalTime: response.data.time,
        value: response.data.value,
        valid: true,
      });
    }
  };
 
  return (
    <section
      className={
        "flex flex-col md:flex-row gap-6 max-w-[635px] " + classContainer
      }
    >
      <DtCalendar
        onChange={setDate}
        type="single"
        local="en"
        minDate={minDate}
        maxDate={maxDate}
        showWeekend
        calenderModalClass="mx-auto"
      />
      <div className="w-full">
        {date && (
          <>
            <p className="mb-3 text-soft-gray text-xl font-medium">
              Seleccione la hora
            </p>
            <div className="w-full md:w-40 block sm:flex md:block gap-4 justify-center">
              <div className="w-full">
                <GraySubtitle text="Hora inicio:" />
                <Input
                  type="time"
                  name="time_start"
                  icon="clock"
                  onChange={({ name, value }) =>
                    setTimes({ ...times, [name]: value })
                  }
                  defaultValue="05:00"
                />
              </div>
              <div className="w-full mb-7">
                <GraySubtitle text="Hora fin:" />
                <Input
                  type="time"
                  name="time_end"
                  icon="clock-fill"
                  onChange={({ name, value }) =>
                    setTimes({ ...times, [name]: value })
                  }
                  defaultValue="06:00"
                />
              </div>
            </div>
            <Button
              icon="calendar-check"
              text="Consultar disponibilidad"
              onClick={checkDisponibility}
              disabled={loading}
            />
          </>
        )}
 
        {!date && (
          <div className="mb-3 md:mb-0 md:mt-6 text-center">
            <p className="mb-3 text-soft-gray text-xl font-medium">
              Seleccione una fecha
            </p>
            <i className="bi bi-calendar2-event text-soft-gray text-5xl"></i>
          </div>
        )}
      </div>
    </section>
  );
};
 
export default Calendar;