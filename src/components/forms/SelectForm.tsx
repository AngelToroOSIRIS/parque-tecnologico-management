"use client";
 
import { useState } from "react";
import Select from "./Select";
import GraySubtitle from "../GraySubtitle";
import { emptyValue } from "@/libs/functionsStrings";
 
const SelectForm = ({
  name,
  placeholder,
  icon,
  label,
  onChange,
  required,
  children,
  defaultValue,
}: {
  type?: string;
  name: string;
  placeholder?: string;
  icon?: string;
  required?: boolean;
  label?: { value?: string; required?: boolean };
  onChange: ({ name, value }: { name: string; value: string | null }) => any;
  children?: any;
  defaultValue?: string;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
 
  const handleChange = ({ name, value }: { name: string; value: string | null }) => {
    if (onChange) onChange({ name, value });
 
    if (required && emptyValue(value)) {
      setError("Debe seleccionar una opción.");
    } else if (required && !emptyValue(value)) {
      setError(undefined);
    }
  };
 
  return (
    <div className="text-start w-full">
      <GraySubtitle
        text={
          label?.value ??
          name[0].toString().toUpperCase() + name.toString().substring(1) + ":"
        }
        required={label?.required ?? true}
      />
      <Select
        name={name}
        placeholder={placeholder ?? "Seleccionar " + name}
        icon={icon}
        error={error}
        onChange={handleChange}
        defaultValue={defaultValue}
      >
        {children}
      </Select>
    </div>
  );
};
 
export default SelectForm;