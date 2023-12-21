"use client";

import { SelectItem } from "@nextui-org/react";
import Select from "../components/forms/Select";
import GraySubtitle from "../components/GraySubtitle";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { emptyValue } from "@/libs/functionsStrings";

const times = [
  { value: 1, description: "01:00 AM", fieldDb: "01:00:00.0000000" },
  { value: 2, description: "02:00 AM", fieldDb: "02:00:00.0000000" },
  { value: 3, description: "03:00 AM", fieldDb: "03:00:00.0000000" },
  { value: 4, description: "04:00 AM", fieldDb: "04:00:00.0000000" },
  { value: 5, description: "05:00 AM", fieldDb: "05:00:00.0000000" },
  { value: 6, description: "06:00 AM", fieldDb: "06:00:00.0000000" },
  { value: 7, description: "07:00 AM", fieldDb: "07:00:00.0000000" },
  { value: 8, description: "08:00 AM", fieldDb: "08:00:00.0000000" },
  { value: 9, description: "09:00 AM", fieldDb: "09:00:00.0000000" },
  { value: 10, description: "10:00 AM", fieldDb: "10:00:00.0000000" },
  { value: 11, description: "11:00 AM", fieldDb: "11:00:00.0000000" },
  { value: 12, description: "12:00 PM", fieldDb: "12:00:00.0000000" },
  { value: 13, description: "01:00 PM", fieldDb: "13:00:00.0000000" },
  { value: 14, description: "02:00 PM", fieldDb: "14:00:00.0000000" },
  { value: 15, description: "03:00 PM", fieldDb: "15:00:00.0000000" },
  { value: 16, description: "04:00 PM", fieldDb: "16:00:00.0000000" },
  { value: 17, description: "05:00 PM", fieldDb: "17:00:00.0000000" },
  { value: 18, description: "06:00 PM", fieldDb: "18:00:00.0000000" },
  { value: 19, description: "07:00 PM", fieldDb: "19:00:00.0000000" },
  { value: 20, description: "08:00 PM", fieldDb: "20:00:00.0000000" },
  { value: 21, description: "09:00 PM", fieldDb: "21:00:00.0000000" },
  { value: 22, description: "10:00 PM", fieldDb: "22:00:00.0000000" },
  { value: 23, description: "11:00 PM", fieldDb: "23:00:00.0000000" },
];

const SelectTime = ({
  defaultValues,
  onChange,
}: {
  defaultValues?: { time_start: string; time_end: string };
  onChange?: (value: {
    time_start: string;
    time_end: string;
    valid: boolean;
  }) => any;
}) => {
  const [loading, setLoading] = useState<boolean>(defaultValues ? true : false);
  const [selectedTimes, setSelectedTimes] = useState<{
    time_start: string;
    time_end: string;
    data_start: { value: number; description: string; fieldDb: string } | null;
    data_end: { value: number; description: string; fieldDb: string } | null;
    valid: boolean;
  }>({
    time_start: "",
    time_end: "",
    data_start: null,
    data_end: null,
    valid: false,
  });
  const [validTimeStart, setValidTimeStart] = useState<boolean>(false);

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | null;
  }) => {
    const foundSelectedTime = value
      ? times.find((time) => time.value === Number(value))
      : null;

    if (name === "time_start") {
      if (!foundSelectedTime) {
        if (selectedTimes.data_end) toast.error("Hora inicio no válida");

        setValidTimeStart(false);
        setSelectedTimes({
          ...selectedTimes,
          time_start: "",
          data_start: null,
          valid: false,
        });
        return;
      }

      setValidTimeStart(true);
      // VALIDATE WITH TIME END
      if (selectedTimes.data_end) {
        const currentTimeEnd = selectedTimes.data_end;

        const invalidValue =
          foundSelectedTime.value >= (currentTimeEnd?.value ?? 0);

        if (invalidValue) toast.error("Hora inicio no válida");

        setSelectedTimes({
          ...selectedTimes,
          time_start: foundSelectedTime.fieldDb,
          data_start: foundSelectedTime,
          valid: !invalidValue,
        });
      } else {
        setSelectedTimes({
          ...selectedTimes,
          time_start: foundSelectedTime.fieldDb,
          data_start: foundSelectedTime,
          valid: false,
        });
      }
    }

    if (name === "time_end") {
      if (!foundSelectedTime) {
        setSelectedTimes({
          ...selectedTimes,
          time_end: "",
          data_end: null,
          valid: false,
        });
        return;
      }

      const currentTimeStart = selectedTimes.data_start;

      const invalidValue =
        foundSelectedTime.value <= (currentTimeStart?.value ?? 0);

      if (invalidValue) toast.error("Hora fin no válida");

      setSelectedTimes({
        ...selectedTimes,
        time_end: foundSelectedTime.fieldDb,
        data_end: foundSelectedTime,
        valid: !invalidValue,
      });
    }
  };

  useEffect(() => {
    if (defaultValues) {
      if (
        emptyValue(defaultValues.time_start) ||
        emptyValue(defaultValues.time_end)
      )
        return;

      setSelectedTimes({
        time_start: defaultValues.time_start + ".0000000",
        time_end: defaultValues.time_end + ".0000000",
        data_start:
          times.find(
            (time) => time.fieldDb === defaultValues.time_start + ".0000000"
          ) ?? null,
        data_end:
          times.find(
            (time) => time.fieldDb === defaultValues.time_end + ".0000000"
          ) ?? null,
        valid: true,
      });
      setValidTimeStart(true);
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    if (onChange)
      onChange({
        time_start: selectedTimes.time_start,
        time_end: selectedTimes.time_end,
        valid: selectedTimes.valid,
      });
  }, [selectedTimes]);

  if (!loading) {
    return (
      <div className="w-full lg:w-[40%] flex gap-4 justify-center">
        <div className="w-full">
          <GraySubtitle required text="Hora inicio:" />
          <Select
            name="time_start"
            placeholder="00:00 --"
            icon="clock"
            onChange={handleChange}
            defaultValue={
              defaultValues
                ? String(selectedTimes.data_start?.value)
                : undefined
            }
          >
            {times.map((time) => (
              <SelectItem key={time.value} value={time.value}>
                {time.description}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-full">
          <GraySubtitle required text="Hora fin:" />
          <Select
            defaultValue={
              defaultValues
                ? String(selectedTimes.data_end?.value)
                : "undefined"
            }
            name="time_end"
            placeholder="00:00 --"
            icon="clock-fill"
            isDisabled={!validTimeStart}
            onChange={handleChange}
          >
            {times.map((time) => (
              <SelectItem key={time.value} value={time.value}>
                {time.description}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    );
  }

  return <></>;
};

export default SelectTime;
