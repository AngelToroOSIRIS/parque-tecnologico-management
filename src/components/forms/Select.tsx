import React from "react";
import { Select as SelectNextUi } from "@nextui-org/react";
import Icon from "./Icon";

interface Props {
  name?: string;
  icon?: string;
  placeholder: string;
  isDisabled?: boolean;
  disallowEmptySelection?: boolean;
  defaultValue?: string;
  defaultValues?: string[];
  selectionMode?: "multiple" | "single";
  className?: string;
  disabledKeys?: string[];
  error?: string;
  onChange?: ({ name, value }: { name: string; value: string | null }) => any;
  children?: any;
}

const Select = ({
  name,
  icon,
  placeholder,
  disallowEmptySelection,
  className,
  disabledKeys,
  error,
  isDisabled,
  defaultValue,
  defaultValues,
  selectionMode,
  onChange,
  children,
}: Props) => {
  return (
    <SelectNextUi
      aria-label={name}
      radius="full"
      size="sm"
      startContent={
        icon && <Icon icon={icon} className={error && "text-red"} />
      }
      placeholder={placeholder}
      errorMessage={error ?? null}
      isInvalid={error ? true : false}
      classNames={{
        errorMessage: "text-sm font-medium",
        value: "text-base",
        trigger: "bg-[#ffffff]",
      }}
      disabledKeys={disabledKeys}
      isDisabled={isDisabled}
      className={"mt-1 mb-[10px] outline-none select-none " + className}
      variant="faded"
      selectionMode={selectionMode}
	  disallowEmptySelection={disallowEmptySelection}
      onChange={(e) => {
        if (onChange) {
          const value = String(e.target.value).trim();
          onChange({
            name: String(e.target.name).trim(),
            value: value !== "" ? value : null,
          });
        }
      }}
      name={name}
      defaultSelectedKeys={
        defaultValues ? defaultValues: defaultValue ? [defaultValue] : undefined
      }
    >
      {children}
    </SelectNextUi>
  );
};

export default Select;
