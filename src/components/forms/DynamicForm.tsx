import { validateString } from "@/libs/functionsStrings";
import React, { useEffect, useState } from "react";
import { ObjectInput } from "react-object-input";
import InputForm from "./InputForm";

const DynamicForm = ({
  onChangeValue,
  defaultValues,
}: {
  defaultValues: { nombre: string; descripcion: string }[];
  onChangeValue: ([]: {
    nombre: string;
    descripcion: string;
  }[]) => any;
}) => {
  const [value, setValue] = useState<Record<string, string>>({});

  useEffect(() => {
    if (defaultValues.length > 0) {
      const defaultObj = {};
      for (let item of defaultValues) {
        //@ts-ignore
        defaultObj[item.nombre as any] = item.descripcion;
      }
      setValue(defaultObj);
    }
  }, []);

  useEffect(() => {
    const mappedValues = Object.entries(value);
    onChangeValue(
      mappedValues.map((property) => {
        return {
          nombre: validateString(String(property[0])),
          descripcion: validateString(String(property[1])),
        };
      })
    );
  }, [value]);

  return (
    <ObjectInput
      obj={value}
      onChange={setValue}
      renderItem={(key, value, updateKey, updateValue, deleteProperty) => (
        // render an editor row for an item, using the provided callbacks
        // to propagate changes
        <div className="flex gap-5">
          <InputForm
            name="nombre"
            placeholder="Nombre"
            onChange={({ value }) => updateKey(value ?? "")}
            value={key}
            validations={{
              required: "Nombre requerido",
            }}
            onlyInput
          />
          <InputForm
            name="descripcion"
            placeholder="Descripción"
            onChange={({ value }) => updateValue(value ?? "")}
            value={value || ""}
            validations={{
              required: "Descripción requerida",
            }}
            onlyInput
          />
          <i
            onClick={deleteProperty}
            className="bi bi-x-circle text-xl mt-3 hover:text-primary transition-all"
          ></i>
        </div>
      )}
      renderAdd={(addItem) => (
        <div className="flex-center transition-all">
          <button
            className="bg-[#ffffff] rounded-full border-2 border-borders-light hover:border-primary hover:text-primary p-2 transition-all"
            type="button"
            onClick={addItem}
          >
            Añadir característica
          </button>
        </div>
      )}
    />
  );
};

export default DynamicForm;
