"use client";
 
import { useState } from "react";
import Input from "../components/forms/Input";
import GraySubtitle from "../components/GraySubtitle";
import {
  emptyValue,
  validateString,
  verifyLetters,
} from "@/libs/functionsStrings";
 
interface Validations {
  required?: string;
  validateEmail?: boolean;
  onlyNumbers?: boolean;
  onlyLetters?: boolean;
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
}
 
const InputForm = ({
  type = "text",
  name,
  defaultValue,
  icon,
  className,
  placeholder,
  onlyInput,
  label,
  validations,
  onChange,
}: {
  type?: string;
  name: string;
  icon?: string;
  className?: string;
  placeholder?: string;
  onlyInput?: boolean;
  defaultValue?: string;
  label?: { value?: string; required?: boolean };
  validations?: Validations;
  onChange: any;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
 
  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | null;
  }) => {
    // WITHOUT VALIDATIONS
    if (Object.keys(validations ?? {}).length === 0) {
      return onChange({ name, value });
    }
 
    const nullReturn = {
      name,
      value: null,
    };
 
    const returnValue = () => {
      if (validations?.onlyNumbers) {
        const valueNumber = validateString(value, "int");
 
        if (!valueNumber) {
          setError("El valor debe ser numérico.");
          return nullReturn;
        }
        return { name, value: valueNumber };
      }
      if (validations?.onlyLetters) {
        const valueVerified = verifyLetters(value ?? "");
 
        if (!valueVerified) {
          setError("El valor solo debe contener letras.");
          return nullReturn;
        }
        return { name, value: valueVerified };
      }
 
      return { name, value };
    };
 
    setError(undefined);
 
    // VALIDATE REQUIRED
    if (validations?.required && emptyValue(value)) {
      setError(
        validations.minLength
          ? validations.minLength.message
          : validations?.required
      );
      onChange(nullReturn);
      return;
    } else if (!validations?.required && emptyValue(value)) {
      setError(undefined);
      onChange(nullReturn);
      return;
    }
 
    // VALIDATE LENGTHS
    if (!emptyValue(value) && !validations?.validateEmail) {
      // WITHOUT LENGTHS
      if (!validations?.minLength && !validations?.maxLength) {
        setError(undefined);
        onChange(returnValue());
        return;
      }
 
      // VALIDATE MIN LENGTH
      if (validations?.minLength && !validations?.maxLength) {
        if (value && value.length < validations?.minLength.value) {
          setError(validations?.minLength.message);
          onChange(nullReturn);
          return;
        } else {
          setError(undefined);
          onChange(returnValue());
          return;
        }
      }
 
      // VALIDATE MAX LENGTH
      if (!validations?.minLength && validations?.maxLength) {
        if (value && value.length > validations?.maxLength.value) {
          setError(validations?.maxLength.message);
          onChange(nullReturn);
          return;
        } else {
          setError(undefined);
          onChange(returnValue());
          return;
        }
      }
 
      // VALIDATE MINMAX LENGTH
      if (validations?.minLength && validations?.maxLength) {
        if (
          value &&
          value.length <= validations?.maxLength.value &&
          value &&
          value.length >= validations?.minLength.value
        ) {
          setError(undefined);
          onChange(returnValue());
          return;
        }
 
        if (value && value.length > validations?.maxLength.value) {
          setError(validations?.maxLength.message);
          onChange(nullReturn);
          return;
        }
 
        if (value && value.length < validations?.minLength.value) {
          setError(validations?.minLength.message);
          onChange(nullReturn);
          return;
        }
      }
    }
 
    // VALIDATE EMAIL
    if (validations?.validateEmail) {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value ?? "")) {
        setError("El email no es válido.");
        onChange(nullReturn);
        return;
      } else {
        setError(undefined);
        onChange(returnValue());
        return;
      }
    }
  };
 
  if (onlyInput) {
    return (
      <Input
        type={validations?.onlyNumbers ? "number" : validations?.validateEmail ? "email" : type}
        name={name}
        icon={icon}
        className={className}
        defaultValue={defaultValue}
        placeholder={placeholder ?? "Ingresar " + name}
        error={error}
        onChange={handleChange}
      />
    );
  }
 
  return (
    <div className="text-start w-full">
      <GraySubtitle
        text={
          label?.value ??
          name[0].toString().toUpperCase() + name.toString().substring(1) + ":"
        }
        required={label?.required ?? true}
      />
      <Input
        type={validations?.onlyNumbers ? "number" : validations?.validateEmail ? "email" : type}
        name={name}
        icon={icon}
        className={className}
        defaultValue={defaultValue}
        placeholder={placeholder ?? "Ingresar " + name}
        error={error}
        onChange={handleChange}
      />
    </div>
  );
};
 
export default InputForm;