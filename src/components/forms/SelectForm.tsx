"use client";

import Select from "./Select";
import GraySubtitle from "../Subtitle";

const SelectForm = ({
  name,
  placeholder,
  icon,
  label,
  onChange,
  children,
  defaultValue,
}: {
  type?: string;
  name: string;
  placeholder?: string;
  icon?: string;
  label?: { value?: string; required?: boolean };
  onChange: any;
  children?: any;
  defaultValue?: string;
}) => {
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
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {children}
      </Select>
    </div>
  );
};

export default SelectForm;
