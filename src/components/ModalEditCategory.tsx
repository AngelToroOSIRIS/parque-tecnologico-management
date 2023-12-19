import React, { useState } from "react";
import SelectForm from "./forms/SelectForm";
import { SelectItem } from "@nextui-org/react";
import TextareaForm from "./forms/TextareaForm";
import InputForm from "./forms/InputForm";
import Button from "./Button";
import { CategoryComplete } from "@/types/d";
import toast from "react-hot-toast";
import fetchFn from "@/libs/fetchFn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useValidateForm from "@/hooks/useValidateForm";
import { useAppDispatch } from "@/redux/hook";
import { setCategories } from "@/redux/features/categoriesSlice";

const ModalEditCategory = ({
  category,
  onCloseModal,
}: {
  category: CategoryComplete | undefined;
  onCloseModal: () => any;
}) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const getCategories = async () => {
    const response = await fetchFn(
      process.env.NEXT_PUBLIC_API_BASEURL + "/categories",
      {
        externalUrl: true,
      }
    );

    if (response.code !== 200) {
      return toast.error("No se han podido cargar las categorías", {
        id: "error1",
      });
    }

    dispatch(setCategories(response.data));
  };

  const categoryInfo = useValidateForm(
    [
      {
        name: "titulo",
        type: "str",
        required: true,
        value: category?.id ? category?.titulo : undefined,
      },
      {
        name: "descripcion",
        type: "str",
        required: true,
        value: category?.id ? category?.descripcion : undefined,
      },
      {
        name: "estado",
        type: "str",
        value: category?.id ? category.estado : "0",
        required: true,
      },
    ],
    {
      loadData: true,
      status: "charged",
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryInfo.validData) {
      return toast.error("Por favor complete el formulario", { id: "empty" });
    }
    const toastLoading = toast.loading("Guardando información...", {
      id: "Save",
    });
    const response = await fetchFn("/updateCategory", {
      method: "PUT",
      body: {
        email: session?.user.emailHash,
        id_category: category?.id,
        descripcion: categoryInfo.getData.descripcion,
        titulo: categoryInfo.getData.titulo,
        estado: categoryInfo.getData.estado,
      },
    });
    if (response.code !== 200) {
      return toast.error("No se ha podido actualizar", { id: toastLoading });
    }
    toast.success("La categoría se ha actualizado exitosamente", {
      id: toastLoading,
    });
    onCloseModal();
    getCategories()
  };

  return (
    <>
      <h1 className="m-5 text-center text-2xl font-bold text-primary mx-auto justify-center items-center">
        Editar {category?.titulo}
      </h1>
      <div className="mx-auto rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="W-full m-2 rounded-lg px-12 gap-2"
        >
          <InputForm
            name="titulo"
            label={{ required: true, value: "Nombre:" }}
            placeholder="Nombre de la categoría"
            defaultValue={category?.titulo}
            onChange={categoryInfo.setField}
            validations={{
              required: "Este campo es obligatorio",
              maxLength: {
                value: 30,
                message: "Maxímo se pueden ingresar 30 caracteres",
              },
            }}
          />
          <SelectForm
            name="estado"
            defaultValue={category?.estado}
            required={true}
            onChange={categoryInfo.setField}
            label={{ required: true, value: "Estado:" }}
            placeholder="Seleccionar estado"
          >
            <SelectItem key={1} value="1">Activo</SelectItem>
            <SelectItem key={2} value="0">Inactivo</SelectItem>
          </SelectForm>
          <TextareaForm
            name="descripcion"
            defaultValue={category?.descripcion}
            placeholder="Descripción de la categoría"
            onChange={categoryInfo.setField}
            minRows={5}
            label={{
              required: true,
              value: "Descripción:",
            }}
            validations={{
              required: "La observación del sitio es obligatoria",
              minLength: {
                message: "Se requiere mínimo 15 caracteres en la observación",
                value: 15,
              },
              maxLength: {
                message: "Se admiten máximo 100 caracteres en la observación",
                value: 100,
              },
            }}
          />
          <div className="flex-center justify-between my-5 gap-6 px-10">
            <Button
              type="submit"
              text="Guardar"
              disabled={!categoryInfo.validData}
              onClick={() => {
                if (!categoryInfo) {
                  return toast.error("Por favor complete el formulario", {
                    id: "empty",
                  });
                } else {
                }
              }}
            />
            <Button text="Cancelar" onClick={onCloseModal} />
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalEditCategory;
