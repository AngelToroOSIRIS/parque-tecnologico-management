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

  const updateData = () => {
    const objInitialState: any = {};
    for (let field of requiredFields) {
      objInitialState[field.name] = !emptyValue(data[field.name])
        ? data[field.name]
        : !emptyValue(field.value)
        ? field.value
        : field.type === "str"
        ? ""
        : 0;
    }

    setData(objInitialState);
    setValidData(defaultValues.loadData);
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
    console.log(defaultValues)
    if (defaultValues.status === "charged") {
      if (!data) return createInitialState();
    }
  }, [defaultValues.status]);

  useEffect(() => {
    if (!data) return;
    if (Object.keys(data).length !== requiredFields.length) {
      return updateData();
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
