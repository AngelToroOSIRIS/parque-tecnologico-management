"use client";

import React, { useEffect, useState } from "react";
import InputForm from "../forms/InputForm";
import ButtonTable from "../ButtonTable";
import Button from "../Button";
import { useRouter } from "next/navigation";
import TextareaForm from "../forms/TextareaForm";
import Modal from "../Modal";
import useValidateForm from "@/hooks/useValidateForm";
import toast from "react-hot-toast";
import fetchFn from "@/libs/fetchFn";
import { useSession } from "next-auth/react";
import { Availability } from "@/types/d";
import { DtPicker } from "../react-calendar-datetime-picker/dist";
import { formatDate } from "@/libs/functionsStrings";
import { TailSpin } from "react-loader-spinner";

const Dates = ({ idSite }: { idSite: string }) => {
  const [adittion, setAdittion] = useState<boolean>(false);
  const [dataAvail, setDataAvail] = useState<Availability[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const userSession = session?.user ?? {
    name: "default",
    email: "useremail",
    rols: [],
  };
  const router = useRouter();

  const dataDates = useValidateForm([
    { name: "start_date", type: "str", required: true },
    { name: "end_date", type: "str", required: true },
    { name: "observations", type: "str", required: true },
  ]);

  const getData = async () => {
    const res = await fetchFn(
      `/availabilityPlaces?email=${session?.user.emailHash}&id_place=${idSite}`,
      {}
    );
    if (res.code !== 200) {
      return toast.error("No se ha podido obtener la información", { id: "1" });
    }
    setDataAvail(res.data);
    setLoading(false);
  };

  const deleteDates = async () => {
    const deleteResponse = await fetchFn(
      `/deleteAvailabilityPlace?email=${session?.user.emailHash}&id_availability_place=${selectedId}`,
      {
        method: "DELETE",
      }
    );
    if (deleteResponse.code !== 200) {
      return toast.error("Ha ocurrido un error", { id: "4" });
    }
    const toastLoading = toast.loading("Eliminando información...", {
      id: "Save",
    });
    setShowModal(false);
    getData();
    return toast.success("Se ha eliminado correctamente", {
      id: toastLoading,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dataDates.validData) {
      return toast.error("Por favor complete el formulario", { id: "empty" });
    }

    const response = await fetchFn(
      `/createAvailabilityPlace?email=${session?.user.emailHash}`,
      {
        method: "POST",
        body: {
          ...dataDates.getData,
          id_place: idSite,
        },
      }
    );
    if (response.code !== 200) {
      return toast.error("Ha ocurrido un error", { id: "1" });
    }
    const toastLoading = toast.loading("Guardando información...", {
      id: "Save",
    });
    setAdittion(false)
    getData();
    return toast.success("Se ha guardado correctamente", {
      id: toastLoading,
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status]);

  return (
    <>
      {!loading && (
        <>
          <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            classContainer=" max-w-[450px]"
          >
            <>
              <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
                Eliminar horarío
              </h1>
              <div>
                <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                  ¿Seguro que quiere eliminar horario?
                </p>
              </div>
              <div className="flex items-center gap-7 pb-3 justify-center text-center">
                <div className="mt-5">
                  <button
                    onClick={deleteDates}
                    type="button"
                    className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                  >
                    Eliminar horario
                  </button>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex font-base hover:font-bold outline-none border-none transition-all justify-center rounded-lg px-4 text-lg"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </>
          </Modal>
          <h2 className="margin-header text-center text-primary font-bold justify-center text-2xl items-center mx-auto">
            Fechas disponibles del sitio
          </h2>
          <div className="w-[75%] mx-auto flex justify-between">
            <div className="w-[150px]">
              <ButtonTable
                text="Volver"
                icon="arrow-left"
                onClick={() => {
                  router.back();
                }}
              />
            </div>
          </div>
          <button
            className="flex gap-3 mt-7 mx-auto text-primary font-bold text-xl bg-hover rounded-2xl px-4"
            onClick={() => {
              !adittion ? setAdittion(true) : setAdittion(false);
            }}
          >
            <i
              className={`bi bi-chevron-compact-${!adittion ? "down" : "up"}`}
            ></i>
            <p>{!adittion ? "Añadir fecha" : "Cerrar formulario"}</p>
            <i
              className={`bi bi-chevron-compact-${!adittion ? "down" : "up"}`}
            ></i>
          </button>
          {adittion && (
            <>
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-[42%] mx-auto mt-5 p-7 normal-shadow rounded-xl bg-default-white"
              >
                <div className="flex-center gap-10 m-2">
                  <InputForm
                    name="start_date"
                    label={{ value: "Fecha Inicio", required: true }}
                    type="date"
                    onChange={dataDates.setField}
                  />
                  <InputForm
                    name="end_date"
                    type="date"
                    label={{ value: "Fecha fin", required: true }}
                    onChange={dataDates.setField}
                  />
                </div>
                <div className="mt-5 m-2">
                  <TextareaForm
                    name="observations"
                    validations={{
                      maxLength: {
                        value: 200,
                        message: "Se reciben máximo 200 caracteres",
                      },
                      minLength: {
                        value: 15,
                        message: "Se requieren mínimo 15 caracteres",
                      },
                    }}
                    placeholder="Ingresar observación"
                    label={{ value: "Observaciones", required: true }}
                    onChange={dataDates.setField}
                  />
                </div>
                <div className="w-[35%] mx-auto p-2">
                  <Button
                    type="submit"
                    text="Guardar"
                    disabled={!dataDates.validData}
                    onClick={() => {}}
                  />
                </div>
              </form>
            </>
          )}
          <section className="w-[75%] mt-6 overflow-x mb-10 mx-auto normal-shadow p-3 rounded-xl bg-default-white">
            <div className="w-full mx-auto p-5 rounded-lg">
              {dataAvail.length >= 1 && (
                <>
                  <article className="flex h-10 rounded-lg p-2 items-center justify-between select-none bg-borders-light text-borders text-md font-semibold">
                    <div className="w-[20%]">FECHA INICIO</div>
                    <div className="w-[20%]">FECHA FIN</div>
                    <div className="w-[50%]">OBSERVACIONES</div>
                    <div className="w-[10%]">ELIMINAR</div>
                  </article>
                  {dataAvail.map((date) => (
                    <article
                      className="my-5 flex w-auto justify-between items-center"
                      key={date.id}
                    >
                      <div className="w-[20%] px-2">
                        {formatDate(date.fecha_inicio, true)}
                      </div>
                      <div className="w-[20%] px-2">
                        {formatDate(date.fecha_inicio, true)}
                      </div>
                      <div className="w-[50%]">{date.observaciones}</div>
                      <div className="w-[10%]">
                        <i
                          onClick={() => {
                            setShowModal(true);
                            setSelectedId(date.id);
                          }}
                          title="Eliminar horario"
                          className="bi bi-x-circle text-2xl px-10 text-default-400 hover:text-primary transition-all cursor-pointer"
                        ></i>
                      </div>
                    </article>
                  ))}
                </>
              )}

              {dataAvail.length === 0 && (
                <div className="text-center text-default-300 select-none">
                  <i className="bi bi-x-circle text-7xl"></i>
                  <p className="text-4xl mt-[1%]">
                    No se han encontrado registros
                  </p>
                </div>
              )}
            </div>
          </section>
        </>
      )}
      {loading && (
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

export default Dates;
