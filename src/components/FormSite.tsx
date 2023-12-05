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
import { Category, Enlace, SiteEdit, States } from "@/types/d";
import SectionImage from "@/components/forms/SectionImage";
import { TailSpin } from "react-loader-spinner";
import TextareaForm from "./forms/TextareaForm";
import { useRouter } from "next/navigation";
import InputMoney from "./InputMoney";
import DynamicForm from "./forms/DynamicForm";
import SelectTime from "./SelectTime";

const FormSite = ({ idSite }: { idSite?: number }) => {
  const [dataEdit, setdataEdit] = useState<SiteEdit>();
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const { data: session, status } = useSession();
  const {
    validData,
    getData: dataForm,
    setField,
  } = useValidateForm(
    [
      { name: "id_categoria", type: "int", required: true },
      { name: "id_estado_espacio", type: "int", required: true },
      { name: "id_identificador_enlace", type: "int", required: true },
      { name: "nombre", type: "str", required: true, value: dataEdit?.nombre },
      {
        name: "descripcion_corta",
        type: "str",
        required: true,
        value: dataEdit?.descripcion_corta,
      },
      {
        name: "descripcion",
        type: "str",
        required: true,
        value: dataEdit?.descripcion,
      },
      { name: "activo_coworking", type: "str", required: true },
      { name: "activo_interno", type: "str", required: true },
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
  const dataInfoSite = useValidateForm(
    [
      {
        name: "dimensiones",
        type: "str",
        required: true,
        value: dataEdit?.caracteristicas_espacio.dimensiones,
      },
      {
        name: "escritorios",
        type: "int",
        required: false,
        value: dataEdit?.caracteristicas_espacio.escritorios,
      },
      {
        name: "sillas",
        type: "int",
        required: false,
        value: dataEdit?.caracteristicas_espacio.sillas,
      },
      {
        name: "mesa_reunion",
        type: "int",
        required: false,
        value: dataEdit?.caracteristicas_espacio.mesa_reuniones,
      },
      {
        name: "televisores",
        type: "int",
        required: false,
        value: dataEdit?.caracteristicas_espacio.televisores,
      },
      {
        name: "computadores",
        type: "int",
        required: false,
        value: dataEdit?.caracteristicas_espacio.computadores,
      },
      {
        name: "tablero",
        type: "int",
        required: false,
        value: dataEdit?.caracteristicas_espacio.tablero,
      },
      {
        name: "video_beam",
        type: "int",
        required: false,
        value: dataEdit?.caracteristicas_espacio.video_beam,
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
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState([
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
  ]);
  const [siteId, setSiteId] = useState<number>(0);
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
  const [dataAdittional, setDataAdittional] = useState<{}>({});
  const [dataFilters, setDataFilters] = useState<{
    categorias: Category[];
    estadoEspacios: States[];
    identificadoresEnlace: Enlace[];
  }>({ categorias: [], estadoEspacios: [], identificadoresEnlace: [] });

  const router = useRouter();

  const getData = async () => {
    setLoadingData(true);
    if (idSite) {
      const data = await fetchFn(`/getPlace/${idSite}`);
      if (data.code !== 200) {
        return toast.error("No se ha podido obtener la info", { id: "2" });
      }
      setdataEdit(data.data);
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
    const toastLoading = toast.loading("Guardando información...", {
      id: "Save",
    });

    if (!idSite) {
      const res = await fetchFn(`/place?email=${session?.user.emailHash}`, {
        method: "POST",
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
            adicionales: Object.entries({}).map((property) => {
              return {
                nombre: property[0],
                descripcion: property[1],
              };
            }),
          },
          activo_coworking: "0",
          activo_interno: "0",
          id_estado_espacio: dataFilters.estadoEspacios.find(
            (estado) => estado.descripcion === "Inactivo"
          )?.id,
        },
      });

      setLoading(false);
      setSiteId(res.data.id);
      if (res.data.message) {
        return toast.error(res.data.message, { id: toastLoading });
      }

      if (res.code !== 200) {
        return toast.error("No se ha podido guardar", { id: toastLoading });
      }

      setContent("images");
      return toast.dismiss(toastLoading);
    }
  };

  const updateSite = async () => {
    if (!validData) {
      return toast.error("Por favor complete el formulario", { id: "empty" });
    }
    setLoading(true);
    const toastLoading = toast.loading("Guardando información...", {
      id: "Save",
    });
    const res = await fetchFn(
      `/updatePlace?email=${session?.user.emailHash}&id_espacio=${idSite}`,
      {
        method: "PUT",
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
            adicionales: Object.entries({}).map((property) => {
              return {
                nombre: property[0],
                descripcion: property[1],
              };
            }),
          },
          activo_coworking: "0",
          activo_interno: "0",
          id_estado_espacio: dataFilters.estadoEspacios.find(
            (estado) => estado.descripcion === "Inactivo"
          )?.id,
        },
      }
    );
    setLoading(false);
    setSiteId(res.data.id);
    if (res.data.message) {
      return toast.error(res.data.message, { id: toastLoading });
    }

    if (res.code !== 200) {
      return toast.error("No se ha podido guardar los datos", {
        id: toastLoading,
      });
    }

    setContent("images");
    return toast.success("Datos actualizados correctamente!", {
      id: toastLoading,
    });
  };

  console.log(dataInfoSite );
  console.log(dataDays);
  console.log(dataAdittional);
  console.log(dataForm);

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
              {idSite ? "Editar" : "Añadir"} sitio
            </h1>
            <div className="items-center justify-center gap-10 lg:flex py-1">
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
            <div className="items-center justify-center gap-10 lg:flex py-1">
              <SelectForm
                name="id_categoria"
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
            <div className="items-center w-full justify-center gap-10 lg:flex py-1">
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
                        "La descripción corta debe contener minimo 15 caracteres.",
                    },
                    maxLength: {
                      value: 250,
                      message:
                        "La descripción corta debe contener máximo 250 caracteres.",
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
                      value: "Medidas:",
                    }}
                    validations={{
                      required: "Este campo es obligatorio",
                      maxLength: {
                        message: "Maximos caracteres 15",
                        value: 15,
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
                  defaultValue={dataEdit?.caracteristicas_espacio.escritorios}
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
                  defaultValue={dataEdit?.caracteristicas_espacio.sillas}
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
                  defaultValue={
                    dataEdit?.caracteristicas_espacio.mesa_reuniones
                  }
                  className="mt-1 mb-[10px] outline-none select-none "
                  label={{
                    required: false,
                    value: "Mesas:",
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
                  defaultValue={dataEdit?.caracteristicas_espacio.televisores}
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
                  defaultValue={dataEdit?.caracteristicas_espacio.computadores}
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
                  defaultValue={dataEdit?.caracteristicas_espacio.tablero}
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
                  defaultValue={dataEdit?.caracteristicas_espacio.video_beam}
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
                <DynamicForm onChangeValue={(data) => console.log(data)} />
              </div>
            </div>

            {/* <p className="text-default-500 text-center text-small">
              Selected: {selected.join(", ")}
            </p> */}
            <div className="flex mx-auto w-full md:w-[520px] m-10 gap-2 justify-center items-center">
              <div className="flex-center gap-3">
                <p> Visible coworking: </p>
                <Switch
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
                onClick={() => {
                  if (!validData) {
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
            <p>Páginas 1/3</p>
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
                Disponibilidad del sitio
              </h1>
              <h2 className="text-center text-2xl text-primary font-medium mt-4 mb-7">
                Precios
              </h2>
              <div className="lg:flex justify-center items-center m-5 lg:px-10 mb-7 gap-20">
                <InputMoney
                  name="hora"
                  label="Precio por hora:"
                  required={true}
                  onChange={dataPaid.setField}
                />
                <InputMoney
                  name="dia"
                  label="Precio por día:"
                  onChange={dataPaid.setField}
                />
                <InputMoney
                  name="mes"
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
                />
              </div>
              <div className="w-full mb-20">
                <h2 className="text-center text-2xl text-primary font-medium mt-4 mb-10">
                  Disponibilidad por dias
                </h2>
                <div className="lg:flex items-center justify-center m-7">
                  <CheckboxGroup
                    isRequired={true}
                    value={selected}
                    orientation="horizontal"
                    onValueChange={setSelected}
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
                    value={selected}
                    orientation="horizontal"
                    onValueChange={setSelected}
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
                <Button
                  type="submit"
                  text="Continuar"
                  onClick={() => {
                    if (idSite) {
                      updateSite();
                    }
                  }}
                />
              </div>
              <p>Páginas 2/3</p>
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
