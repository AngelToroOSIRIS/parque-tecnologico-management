"use client";

import { emptyValue, validateString } from "@/libs/functionsStrings";
import { useEffect, useState } from "react";

const useValidateForm = (
  requiredFields: {
    name: string;
    value?: string | number;
    type: "str" | "int";
    required: boolean;
  }[],
  defaultValues: {
    loadData: boolean;
    status: "charged" | "loading";
  } = {
    loadData: false,
    status: "charged",
  }
) => {
  const [validData, setValidData] = useState<boolean>(defaultValues.loadData);
  const [data, setData] = useState<any>(null);
  const setField = ({
    name,
    value,
  }: {
    name: string;
    value: string | null;
  }) => {
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

  const createInitialState = () => {
    if (defaultValues.status === "loading") return;
    const objInitialState: any = {};

    for (let field of requiredFields) {
      objInitialState[field.name] = !emptyValue(field.value)
        ? field.value
        : field.type === "str"
        ? ""
        : 0;
    }
    setData(objInitialState);
    setValidData(defaultValues.loadData);
  };

  useEffect(() => {
    if (!data) return createInitialState();

    const totalInvalidFields = [];
    for (let field of requiredFields) {
      if (field.required) {
        if (emptyValue(data[field.name], field.type)) {
          console.log(data);
          console.log(data[field.name], field.type,field.name);
          console.log(field);
          console.log(emptyValue(data[field.name], field.type));
          totalInvalidFields.push(true);
        }
      }
    }

    setValidData(totalInvalidFields.length < 1);
  }, [requiredFields, data]);

  useEffect(() => {
   console.log(data)
  }, [data]);
  return {
    setField,
    getData: data,
    validData,
  };
};

export default useValidateForm;
