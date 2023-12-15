"use client";

import { useState, useEffect } from "react";
import { Checkbox, CheckboxGroup, SelectItem } from "@nextui-org/react";
import Switch from "@/components/Switch";
import InputForm from "./forms/InputForm";
import SelectForm from "./forms/SelectForm";
import useValidateForm from "@/hooks/useValidateForm";
import Button from "./Button";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { CategoryComplete, Enlace, Site, States } from "@/types/d";
import SectionImage from "@/components/forms/SectionImage";
import { TailSpin } from "react-loader-spinner";
import TextareaForm from "./forms/TextareaForm";
import { useRouter } from "next/navigation";
import InputMoney from "./InputMoney";
import DynamicForm from "./forms/DynamicForm";
import SelectTime from "./SelectTime";

const FormSite = ({ idSite }: { idSite?: number }) => {
  const [dataEdit, setdataEdit] = useState<Site>();
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const { data: session, status } = useSession();
  const {
    validData,
    getData: dataForm,
    setField,
  } = useValidateForm(
    [
      {
        name: "id_categoria",
        type: "int",
        required: true,
        value: idSite ? dataEdit?.id_categoria : undefined,
      },
      {
        name: "id_estado_espacio",
        type: "int",
        required: true,
        value: idSite ? dataEdit?.id_estado_espacio : undefined,
      },
      {
        name: "id_identificador_enlace",
        type: "int",
        required: false,
        value: idSite ? dataEdit?.id_identificador_enlace : undefined,
      },
      { name: "nombre", type: "str", required: true, value: dataEdit?.nombre },
      {
        name: "descripcion_corta",
        type: "str",
        required: true,
        value: idSite ? dataEdit?.descripcion_corta : undefined,
      },
      {
        name: "descripcion",
        type: "str",
        required: true,
        value: idSite ? dataEdit?.descripcion : undefined,
      },
      {
        name: "activo_coworking",
        type: "str",
        required: true,
        value: idSite ? dataEdit?.activo_coworking : "0",
      },
      {
        name: "activo_interno",
        type: "str",
        required: true,
        value: idSite ? dataEdit?.activo_interno : "0",
      },
    ],
    {
      loadData: idSite ? true : false,
      status: loadingData ? "loading" : "charged",
    }
  );
  const dataInfoSite = useValidateForm(
    [
      {
        name: "dimensiones",
        type: "str",
        required: true,
        value: idSite
          ? dataEdit?.caracteristicas_espacio.dimensiones
          : undefined,
      },
      {
        name: "escritorios",
        type: "int",
        required: false,
        value: idSite
          ? dataEdit?.caracteristicas_espacio.escritorios
          : undefined,
      },
      {
        name: "sillas",
        type: "int",
        required: false,
        value: idSite ? dataEdit?.caracteristicas_espacio.sillas : undefined,
      },
      {
        name: "mesa_reunion",
        type: "int",
        required: false,
        value: idSite
          ? dataEdit?.caracteristicas_espacio.mesa_reuniones
          : undefined,
      },
      {
        name: "televisores",
        type: "int",
        required: false,
        value: idSite
          ? dataEdit?.caracteristicas_espacio.televisores
          : undefined,
      },
      {
        name: "computadores",
        type: "int",
        required: false,
        value: idSite
          ? dataEdit?.caracteristicas_espacio.computadores
          : undefined,
      },
      {
        name: "tablero",
        type: "int",
        required: false,
        value: idSite ? dataEdit?.caracteristicas_espacio.tablero : undefined,
      },
      {
        name: "video_beam",
        type: "int",
        required: false,
        value: idSite
          ? dataEdit?.caracteristicas_espacio.video_beam
          : undefined,
      },
    ],
    {
      loadData: idSite ? true : false,
      status: loadingData ? "loading" : "charged",
    }
  );
  const dataPaid = useValidateForm(
    [
      {
        name: "hora",
        type: "int",
        required: true,
        value: dataEdit?.tarifas_espacio.hora,
      },
      {
        name: "dia",
        type: "int",
        required: false,
        value: dataEdit?.tarifas_espacio.dia,
      },
      {
        name: "mes",
        type: "int",
        required: false,
        value: dataEdit?.tarifas_espacio.mes,
      },
    ],
    {
      loadData: idSite ? true : false,
      status: loadingData ? "loading" : "charged",
    }
  );
  const dataDays = useValidateForm(
    [
      {
        name: "lunes",
        type: "str",
        required: true,
        value: dataEdit?.dias_disponibilidad_espacio.lunes ?? "1",
      },
      {
        name: "martes",
        type: "str",
        required: true,
        value: dataEdit?.dias_disponibilidad_espacio.martes ?? "1",
      },
      {
        name: "miercoles",
        type: "str",
        required: true,
        value: dataEdit?.dias_disponibilidad_espacio.miercoles ?? "1",
      },
      {
        name: "jueves",
        type: "str",
        required: true,
        value: dataEdit?.dias_disponibilidad_espacio.jueves ?? "1",
      },
      {
        name: "viernes",
        type: "str",
        required: true,
        value: dataEdit?.dias_disponibilidad_espacio.viernes ?? "1",
      },
      {
        name: "sabado",
        type: "str",
        required: true,
        value: dataEdit?.dias_disponibilidad_espacio.sabado ?? "0",
      },
      {
        name: "domingo",
        type: "str",
        required: true,
        value: dataEdit?.dias_disponibilidad_espacio.domingo ?? "0",
      },
      {
        name: "festivos",
        type: "str",
        required: true,
        value: dataEdit?.dias_disponibilidad_espacio.festivos ?? "0",
      },
    ],
    {
      loadData: idSite ? true : false,
      status: loadingData ? "loading" : "charged",
    }
  );

  const [content, setContent] = useState<"sites" | "reservation" | "images">(
    "sites"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [additionalsInfo, setAdditionalsInfo] = useState<
    { nombre: string; descripcion: string }[]
  >([]);

  const [siteId, setSiteId] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
  ]);
  const [additionalInfo, setAdditionalInfo] = useState<{
    activo_coworking: boolean;
    activo_interno: boolean;
    id_estado_espacio: string;
  }>({ id_estado_espacio: "", activo_coworking: false, activo_interno: false });
  const [infoHorary, setInfoHorary] = useState<{
    time_start: string;
    time_end: string;
    valid: boolean;
  }>({ time_start: "", time_end: "", valid: false });
  const [dataFilters, setDataFilters] = useState<{
    categorias: CategoryComplete[];
    estadoEspacios: States[];
    identificadoresEnlace: Enlace[];
  }>({ categorias: [], estadoEspacios: [], identificadoresEnlace: [] });

  const router = useRouter();

  const getData = async () => {
    setLoadingData(true);
    if (idSite) {
      const data = await fetchFn(`/getPlace/${idSite}`);
      if (data.code !== 200) {
        return toast.error("No se ha podido obtener la información", {
          id: "2",
        });
      }
      const responseData: Site = data.data;

      const days = [];
      for (let item in responseData.dias_disponibilidad_espacio) {
        //@ts-ignore
        if (responseData.dias_disponibilidad_espacio[item] === "1") {
          days.push(item);
        }
      }

      if (responseData.caracteristicas_espacio.adicionales) {
        const properties = [];

        for (let item of responseData.caracteristicas_espacio.adicionales.split(
          "\\n"
        )) {
          properties.push({
            nombre: item.split(":")[0],
            descripcion: item.split(":")[1],
          });
        }
        setAdditionalsInfo(properties);
      }

      setSelectedDays(days);
      setdataEdit(responseData);
    }

    const response = await fetchFn(
      `/characteristicsPlace?email=${session?.user.emailHash}`
    );
    if (response.code !== 200) {
      return toast.error("No se han podido obtener los filtros", { id: "1" });
    }
    setDataFilters(response.data);
    setLoadingData(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validData) {
      return toast.error("Por favor complete el formulario", { id: "empty" });
    }
    setLoading(true);

    console.log({
      ...dataForm,
      tarifas_espacio: dataPaid.getData,
      dias_disponibilidad: {
        ...dataDays.getData,
        hora_inicio: infoHorary.time_start,
        hora_fin: infoHorary.time_end,
      },
      caracteristicas_espacio: {
        ...dataInfoSite.getData,
        adicionales: additionalsInfo,
      },
      activo_coworking: idSite ? dataForm.activo_coworking : "0",
      activo_interno: idSite ? dataForm.activo_interno : "0",
      id_estado_espacio: idSite ? dataForm.id_estado_espacio : dataFilters.estadoEspacios.find(
        (estado) => estado.descripcion === "Inactivo"
      )?.id ,
    })

    const res = await fetchFn(
      idSite
        ? `/updatePlace?email=${session?.user.emailHash}&id_espacio=${idSite}`
        : `/place?email=${session?.user.emailHash}`,
      {
        method: idSite ? "PUT" : "POST",
        body: {
          ...dataForm,
          tarifas_espacio: dataPaid.getData,
          dias_disponibilidad: {
            ...dataDays.getData,
            hora_inicio: infoHorary.time_start,
            hora_fin: infoHorary.time_end,
          },
          caracteristicas_espacio: {
            ...dataInfoSite.getData,
            adicionales: additionalsInfo,
          },
          activo_coworking: idSite ? dataForm.activo_coworking : "0",
          activo_interno: idSite ? dataForm.activo_interno : "0",
          id_estado_espacio: idSite ? dataForm.id_estado_espacio : dataFilters.estadoEspacios.find(
            (estado) => estado.descripcion === "Inactivo"
          )?.id ,
        },
      }
    );

    setLoading(false);
    setSiteId(res.data.id);
    if (res.data.message) {
      return toast.error(res.data.message, { id: "1" });
    }

    if (res.code !== 200) {
      return toast.error("No se ha podido guardar", { id: "2" });
    }

    if (!idSite) {
      setContent("images");
    }
    router.back()
    return toast.success("Se ha guardado la información", {
      id: "Save",
    });
  };

  useEffect(() => {
    if (status === "authenticated") getData();
    if (session?.user.rols || session?.user.interno) {
      if (session?.user.interno) {
        return router.push("/sites");
      }
    }
  }, [status]);

  const classCheck = "m-2 p-2 rounded-xl border-2 border-borders-light";
  return (
    <>
      {!loadingData && content === "sites" && (
        <div className="w-[80%] bg-gray-box min-w-unit-8 normal-shadow rounded-lg mb-44 mx-auto p-1">
          <form
            className="bg-[#ffffff] min-w-unit-8 justify-center items-center rounded-lg p-10 m-2"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl text-center font-semibold mb-5 text-primary">
              {idSite ? "Editar" : "Añadir"} sitio {dataEdit?.nombre ?? ""}
            </h1>
            <div className="items-center justify-center px-14 gap-10 lg:flex py-1">
              <InputForm
                onChange={setField}
                type="text"
                name="nombre"
                defaultValue={dataEdit?.nombre}
                label={{
                  required: true,
                  value: "Nombre:",
                }}
                validations={{
                  required: "Se requiere un nombre",
                  maxLength: {
                    value: 50,
                    message: "El nombre debe contener máximo 50 caracteres.",
                  },
                }}
              />
              <SelectForm
                name="id_identificador_enlace"
                defaultValue={
                  dataEdit?.id_identificador_enlace
                    ? String(dataEdit?.id_identificador_enlace)
                    : undefined
                }
                placeholder="Seleccionar Identificador de enlace"
                label={{
                  required: false,
                  value: "Identificador de enlace:",
                }}
                onChange={setField}
              >
                {dataFilters.identificadoresEnlace.map((enlace) => (
                  <SelectItem key={enlace.id} value={enlace.id}>
                    {enlace.llave}
                  </SelectItem>
                ))}
              </SelectForm>
            </div>
            <div className="items-center justify-center px-14 gap-10 lg:flex py-1">
              <SelectForm
                name="id_categoria"
                defaultValue={
                  dataEdit?.id_categoria
                    ? String(dataEdit?.id_categoria)
                    : undefined
                }
                placeholder="Seleccionar categoria"
                label={{
                  value: "Categoria:",
                }}
                onChange={setField}
              >
                {dataFilters.categorias.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.titulo}
                  </SelectItem>
                ))}
              </SelectForm>
              <SelectForm
                name="id_estado_espacio"
                defaultValue={
                  dataEdit?.id_estado_espacio
                    ? String(dataEdit?.id_estado_espacio)
                    : undefined
                }
                placeholder="Seleccionar el estado"
                label={{
                  required: true,
                  value: "Estado:",
                }}
                onChange={({ name, value }) => {
                  setField({ name, value });
                  setAdditionalInfo({ ...additionalInfo, [name]: value });
                }}
              >
                {dataFilters.estadoEspacios.map((estado) => (
                  <SelectItem key={estado.id} value={estado.id}>
                    {estado.descripcion}
                  </SelectItem>
                ))}
              </SelectForm>
            </div>
            <div className="items-center px-14 justify-center gap-10 lg:flex py-1">
              <div className="lg:w-[50%]">
                <TextareaForm
                  classContainer="w-[50%]"
                  name="descripcion_corta"
                  defaultValue={dataEdit?.descripcion_corta}
                  placeholder="Ingresar descripción corta completa"
                  minRows={3}
                  label={{
                    required: true,
                    value: "Descripción corta:",
                  }}
                  validations={{
                    required: "Se requiere descripción corta",
                    minLength: {
                      value: 15,
                      message:
                        "La descripción corta debe contener mínimo 15 caracteres.",
                    },
                    maxLength: {
                      value: 200,
                      message:
                        "La descripción corta debe contener máximo 200 caracteres.",
                    },
                  }}
                  onChange={setField}
                />
                <div className="flex mt-6">
                  <InputForm
                    onChange={dataInfoSite.setField}
                    type="text"
                    defaultValue={dataEdit?.caracteristicas_espacio.dimensiones}
                    placeholder="000x000"
                    description="* metros"
                    className="mt-1 mb-[10px] outline-none select-none "
                    name="dimensiones"
                    label={{
                      required: true,
                      value: "Dimensiones:",
                    }}
                    validations={{
                      required: "Este campo es obligatorio",
                      maxLength: {
                        message: "Maximos caracteres 50",
                        value: 50,
                      },
                    }}
                  />
                </div>
              </div>
              <div className="lg:w-[50%] flex-center gap-5">
                <TextareaForm
                  classContainer="w-[50%]"
                  name="descripcion"
                  defaultValue={dataEdit?.descripcion}
                  onChange={setField}
                  placeholder="Ingresar descripción completa"
                  minRows={8}
                  label={{
                    required: true,
                    value: "Descripción:",
                  }}
                  validations={{
                    required: "Se requiere descripción",
                    minLength: {
                      value: 15,
                      message:
                        "La descripción debe contener minimo 20 caracteres.",
                    },
                    maxLength: {
                      value: 32000,
                      message:
                        "La descripción debe contener máximo 32000 caracteres.",
                    },
                  }}
                />
              </div>
            </div>
            <h1 className="text-center text-2xl lg:text-3xl text-primary font-medium mt-4 mb-10">
              Características
            </h1>
            <div className="w-full lg:px-14 text-justify items-center">
              <div className="w-full gap-5 grid-cols-1 lg:flex">
                <InputForm
                  onChange={dataInfoSite.setField}
                  name="escritorios"
                  type="number"
                  defaultValue={String(
                    dataEdit?.caracteristicas_espacio.escritorios
                  )}
                  placeholder="Cantidad"
                  className="mt-1 mb-[10px] outline-none select-none "
                  label={{
                    required: false,
                    value: "Escritorios:",
                  }}
                  validations={{
                    onlyNumbers: true,
                  }}
                />
                <InputForm
                  onChange={dataInfoSite.setField}
                  name="sillas"
                  type="number"
                  defaultValue={String(
                    dataEdit?.caracteristicas_espacio.sillas
                  )}
                  placeholder="Cantidad"
                  className="mt-1 mb-[10px] outline-none select-none "
                  label={{
                    required: false,
                    value: "Sillas: ",
                  }}
                  validations={{
                    onlyNumbers: true,
                  }}
                />
                <InputForm
                  onChange={() => {
                    dataInfoSite.setField;
                  }}
                  name="mesa_reunion"
                  type="number"
                  placeholder="Cantidad"
                  defaultValue={String(
                    dataEdit?.caracteristicas_espacio.mesa_reuniones
                  )}
                  className="mt-1 mb-[10px] outline-none select-none "
                  label={{
                    required: false,
                    value: "Mesas de reuniones:",
                  }}
                  validations={{
                    onlyNumbers: true,
                  }}
                />
                <InputForm
                  onChange={dataInfoSite.setField}
                  name="televisores"
                  type="number"
                  placeholder="Cantidad"
                  defaultValue={String(
                    dataEdit?.caracteristicas_espacio.televisores
                  )}
                  className="mt-1 mb-[10px] outline-none select-none "
                  label={{
                    required: false,
                    value: "Televisores:",
                  }}
                  validations={{
                    onlyNumbers: false,
                  }}
                />
              </div>
              <div className="w-full gap-5 lg:flex lg:my-8">
                <InputForm
                  onChange={dataInfoSite.setField}
                  name="computadores"
                  type="number"
                  defaultValue={String(
                    dataEdit?.caracteristicas_espacio.computadores
                  )}
                  placeholder="Cantidad"
                  className="mt-1 mb-[10px] outline-none select-none "
                  label={{
                    required: false,
                    value: "Computadores:",
                  }}
                  validations={{
                    onlyNumbers: true,
                  }}
                />
                <InputForm
                  onChange={dataInfoSite.setField}
                  name="tablero"
                  type="number"
                  defaultValue={String(
                    dataEdit?.caracteristicas_espacio.tablero
                  )}
                  placeholder="Cantidad"
                  className="mt-1 mb-[10px] outline-none select-none "
                  label={{
                    required: false,
                    value: "Tableros:",
                  }}
                  validations={{
                    onlyNumbers: true,
                  }}
                />
                <InputForm
                  onChange={dataInfoSite.setField}
                  name="video_beam"
                  type="number"
                  defaultValue={String(
                    dataEdit?.caracteristicas_espacio.video_beam
                  )}
                  placeholder="Cantidad"
                  className="mt-1 mb-[10px] outline-none select-none "
                  label={{
                    required: false,
                    value: "Video Beams:",
                  }}
                  validations={{
                    onlyNumbers: true,
                  }}
                />
              </div>
              <h3 className="text-primary text-center text-lg font-medium m-2">
                Caracteristicas adicionales:
              </h3>
              <div className="p-2 lg:w-[40%] mx-auto rounded-xl">
                <DynamicForm
                  defaultValues={additionalsInfo}
                  onChangeValue={(data) => setAdditionalsInfo(data)}
                />
              </div>
            </div>

            <div className="flex mx-auto w-full md:w-[520px] m-10 gap-2 justify-center items-center">
              <div className="flex-center gap-3">
                <p> Visible coworking: </p>
                <Switch
                  defaultEnabled={
                    idSite
                      ? dataEdit?.activo_coworking === "1"
                        ? true
                        : false
                      : undefined
                  }
                  onChange={(value) => {
                    setAdditionalInfo({
                      ...additionalInfo,
                      activo_coworking: value,
                    }),
                      setField({
                        name: "activo_coworking",
                        value: value ? "1" : "0",
                      });
                  }}
                />
                <p>Visible internos: </p>
                <Switch
                  defaultEnabled={
                    idSite
                      ? dataEdit?.activo_interno === "1"
                        ? true
                        : false
                      : undefined
                  }
                  onChange={(value) => {
                    setAdditionalInfo({
                      ...additionalInfo,
                      activo_interno: value,
                    }),
                      setField({
                        name: "activo_interno",
                        value: value ? "1" : "0",
                      });
                  }}
                />
              </div>
            </div>
            <div className="flex items-center mx-auto w-full md:w-[520px] justify-center mt-8 gap-5">
              <Button
                type="button"
                disabled={!validData || !dataInfoSite.validData}
                onClick={() => {
                  if (!validData || !dataInfoSite.validData) {
                    return toast.error("Por favor complete el formulario", {
                      id: "empty",
                    });
                  } else {
                    setContent("reservation");
                  }
                }}
                text="Continuar"
              />
            </div>
            <p>{`Páginas 1/${idSite ? "2" : "3"}`}</p>
          </form>
        </div>
      )}
      {content === "images" && (
        <SectionImage siteId={siteId} additionalInfo={additionalInfo} />
      )}
      {!loadingData && content === "reservation" && (
        <>
          <div className="w-[80%] bg-gray-box min-w-unit-8 normal-shadow rounded-lg mb-44 mx-auto p-1">
            <form
              className="bg-[#ffffff] min-w-unit-8 justify-center items-center rounded-lg p-10 m-2"
              onSubmit={handleSubmit}
            >
              <h1 className="text-center text-3xl text-primary font-medium mt-4 mb-10">
                Disponibilidad del sitio {dataEdit?.nombre}
              </h1>
              <h2 className="text-center text-2xl text-primary font-medium mt-4 mb-7">
                Precios
              </h2>
              <div className="lg:flex justify-center items-center m-5 lg:px-10 mb-7 gap-20">
                <InputMoney
                  name="hora"
                  defaultValue={dataEdit?.tarifas_espacio.hora}
                  label="Precio por hora:"
                  required={true}
                  onChange={dataPaid.setField}
                />
                <InputMoney
                  name="dia"
                  defaultValue={dataEdit?.tarifas_espacio.dia}
                  label="Precio por día:"
                  onChange={dataPaid.setField}
                />
                <InputMoney
                  name="mes"
                  defaultValue={dataEdit?.tarifas_espacio.mes}
                  label="Precio por mes:"
                  onChange={dataPaid.setField}
                />
              </div>
              <h2 className="text-center text-2xl text-primary font-medium mt-4 mb-7">
                Hora disponible espacio
              </h2>
              <div className="flex-center">
                <SelectTime
                  onChange={({ time_end, time_start, valid }) => {
                    setInfoHorary({ time_end, time_start, valid });
                  }}
                  defaultValues={
                    idSite
                      ? {
                          time_start:
                            dataEdit?.dias_disponibilidad_espacio.hora_inicio ??
                            "",
                          time_end:
                            dataEdit?.dias_disponibilidad_espacio.hora_fin ??
                            "",
                        }
                      : undefined
                  }
                />
              </div>
              <div className="w-full mb-20">
                <h2 className="text-center text-2xl text-primary font-medium mt-4 mb-10">
                  Disponibilidad por dias
                </h2>
                <div className="lg:flex items-center justify-center m-7">
                  <CheckboxGroup
                    isRequired={true}
                    value={selectedDays}
                    orientation="horizontal"
                    onValueChange={setSelectedDays}
                    className="text-center"
                  >
                    {[
                      {
                        value: "lunes",
                        description: "Lunes",
                      },
                      {
                        value: "martes",
                        description: "Martes",
                      },
                      {
                        value: "miercoles",
                        description: "Miercoles",
                      },
                      {
                        value: "jueves",
                        description: "Jueves",
                      },
                      {
                        value: "viernes",
                        description: "Viernes",
                      },
                    ].map((day, i) => (
                      <Checkbox
                        key={i}
                        size="lg"
                        onValueChange={(valueCheck) =>
                          dataDays.setField({
                            name: day.value,
                            value: valueCheck ? "1" : "0",
                          })
                        }
                        value={day.value}
                        className={classCheck}
                      >
                        {day.description}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </div>

                <div className="lg:flex items-center justify-center">
                  <CheckboxGroup
                    isRequired={true}
                    value={selectedDays}
                    orientation="horizontal"
                    onValueChange={setSelectedDays}
                    className="text-center"
                  >
                    {[
                      {
                        value: "sabado",
                        description: "Sabado",
                      },
                      {
                        value: "domingo",
                        description: "Domingo",
                      },
                      {
                        value: "festivos",
                        description: "Festivos",
                      },
                    ].map((day, i) => (
                      <Checkbox
                        key={i}
                        size="lg"
                        onValueChange={(valueCheck) =>
                          dataDays.setField({
                            name: day.value,
                            value: valueCheck ? "1" : "0",
                          })
                        }
                        value={day.value}
                        className={classCheck}
                      >
                        {day.description}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </div>
              </div>
              <div className="flex items-center mx-auto w-full md:w-[520px] justify-center mt-8 gap-5">
                <Button type="submit" text="Guardar" />
                {idSite && (
                  <Button
                    type="button"
                    onClick={() => {
                      setContent("sites");
                    }}
                    text="Atrás"
                  />
                )}
              </div>
              <p>{`Páginas 2/${idSite ? "2" : "3"}`}</p>
            </form>
          </div>
        </>
      )}
      {loadingData && (
        <TailSpin
          height="100"
          width="100"
          color="#990000"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{
            margin: "20px 0",
            justifyContent: "center",
          }}
        />
      )}
    </>
  );
};

export default FormSite;
