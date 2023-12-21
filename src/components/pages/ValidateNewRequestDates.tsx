"use client";

import { formatDate } from "@/libs/functionsStrings";
import Button from "../Button";
import { DateChangeRequest } from "@/types/d";
import { Fragment, useState } from "react";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { ScrollShadow } from "@nextui-org/react";

const ValidateNewRequestDates = ({
  newDates,
  onSubmitAction,
  idPlace,
}: {
  newDates: DateChangeRequest[];
  idPlace: number;
  onSubmitAction?: (valid: boolean) => any;
}) => {
  const inicialState = newDates.map((date) => {
    return {
      id_reservacion_espacio: date.id_reservacion_espacio,
      valid: null,
    };
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [validateDates, setValidateDates] = useState<
    {
      id_reservacion_espacio: number;
      valid: boolean | null;
    }[]
  >(inicialState);

  const postData = async () => {
    setLoading(true);
    setValidateDates(inicialState);

    const responseDates = [];
    const invalidValues = [];

    const toastLoading = toast.loading("Verificando disponibilidad...");

    for (let newDate of newDates) {
      const response = await fetchFn("/spaceAvailability", {
        method: "POST",
        body: {
          id_espacio: idPlace,
          fecha_inicio: newDate.fecha_inicio,
          fecha_fin: newDate.fecha_fin,
        },
      });

      if (response.code !== 200) {
        invalidValues.push(newDate.id_reservacion_espacio);
        responseDates.push({
          id_reservacion_espacio: newDate.id_reservacion_espacio,
          valid: false,
        });
      } else {
        responseDates.push({
          id_reservacion_espacio: newDate.id_reservacion_espacio,
          valid: true,
        });
      }
    }

    setValidateDates(responseDates);
    setLoading(false);
    if (onSubmitAction) onSubmitAction(invalidValues.length === 0);
    if (invalidValues.length > 0) {
      toast.error("Fecha sin disponibilidad", {
        id: toastLoading,
      });
    } else {
      toast.dismiss(toastLoading);
    }
  };

  return (
    <>
      <ScrollShadow className="font-medium gap-3 max-h-[500px]">
        {newDates.map((date) => {
          const validDate = validateDates.find(
            (i) => i.id_reservacion_espacio === date.id_reservacion_espacio
          );

          return (
            <Fragment key={date.id_reservacion_espacio}>
              <div></div>
              <p>
                <strong># Reservacion del espacio: </strong>
                {date.id_reservacion_espacio}
              </p>
              <div
                className={`flex justify-between mb-5 relative px-4 py-4 border-2 ${
                  validDate?.valid === null
                    ? "border-borders-light"
                    : validDate?.valid === false
                    ? "border-red"
                    : "border-green"
                } rounded-2xl`}
              >
                <div className="items-start">
                  <p className="mb-3 font-semibold text-lg">
                    Fecha actual reserva
                  </p>
                  <p>
                    <strong> Fecha inicio: </strong>
                    {formatDate(date.reservacion_espacio.fecha_inicio, true)}
                  </p>
                  <p>
                    <strong> Fecha Fin:</strong>{" "}
                    {formatDate(date.reservacion_espacio.fecha_fin, true)}
                  </p>
                </div>
                <div>
                  <p className="mb-3 text-primary font-semibold text-lg">
                    Fecha petición de cambio
                  </p>
                  <p>
                    <strong>Fecha inicio: </strong>
                    {formatDate(date.fecha_inicio, true)}
                  </p>
                  <p>
                    <strong>Fecha fin: </strong>
                    {formatDate(date.fecha_fin, true)}
                  </p>
                </div>
              </div>
            </Fragment>
          );
        })}
      </ScrollShadow>
    </>
  );
};

export default ValidateNewRequestDates;
