"use client";

import { emptyValue, validateString } from "@/libs/functionsStrings";
import { useEffect, useState } from "react";

const useValidateForm = (
  requiredFields: {
    name: string;

    value?: string | number;

    type: "str" | "int";

    required: boolean;
  }[]
) => {
  const [validData, setValidData] = useState<boolean>(false);

  const [data, setData] = useState<any>(null);

  const setField = ({ name, value }: { name: string; value: string }) => {
    const detailsField = requiredFields.find((field) => field.name === name);

    if (!detailsField) return;

    const validatedValue = validateString(value, detailsField.type);

    setData({
      ...data,

      [name]: validatedValue
        ? validatedValue
        : detailsField.type === "str"
        ? ""
        : 0,
    });
  };

  useEffect(() => {
    if (!data) {
      const objInitialState: any = {};

      for (let field of requiredFields) {
        objInitialState[field.name] = !emptyValue(field.value)
          ? field.value
          : field.type === "str"
          ? ""
          : 0;
      }

      setData(objInitialState);

      return;
    }

    const totalInvalidFields = [];

    for (let field of requiredFields) {
      if (field.required) {
        if (emptyValue(data[field.name], field.type)) {
          totalInvalidFields.push(true);
        }
      }
    }

    setValidData(totalInvalidFields.length < 1);
  }, [data]);

  return {
    setField,

    getData: data,

    validData,
  };
};

export default useValidateForm;
