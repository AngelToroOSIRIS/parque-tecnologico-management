import { Input } from "@nextui-org/react";
import React from "react";

const InputForm: React.FC<{
  list?: string;
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string | number;
  value?: string;
  onChange?: any;
  disabled?: boolean;
  label?: string;
}> = ({
  list,
  className,
  type = "text",
  name,
  id,
  placeholder,
  defaultValue,
  value,
  onChange,
  disabled,
  label,
  ...props
}) => {
  return (
    <Input
      classNames={{label: "font-semibold text-primary"}}
      list={list}
      id={id}
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...props}
    />
  );
};

export default Input;
