"use client";

import { useState } from "react";
import InputForm from "../forms/InputForm";
import ButtonTable from "../ButtonTable";
import Button from "../Button";
import { useRouter } from "next/navigation";
import TextareaForm from "../forms/TextareaForm";
import Modal from "../Modal";

const Dates = () => {
  const [adittion, setAdittion] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();
  return (
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
              ¿Seguro que quiere elimnar horario?
            </p>
          </div>
          <div className="flex items-center gap-7 pb-3 justify-center text-center">
            <div className="mt-5">
              <button
                onClick={() => {}}
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
      <div className="w-[75%] mx-auto margin-header flex justify-between">
        <div className="w-[150px]">
          <ButtonTable
            text="Volver"
            icon="arrow-left"
            onClick={() => {
              router.back();
            }}
          />
        </div>
        <h2 className="text-center text-primary font-bold justify-center text-2xl items-center mx-auto">
          Fechas disponibles del sitio
        </h2>
        <div className="w-[150px]"></div>
      </div>
      <button
        className="flex gap-3 mt-7 mx-auto text-primary font-bold text-xl bg-hover rounded-2xl px-4"
        onClick={() => {
          !adittion ? setAdittion(true) : setAdittion(false);
        }}
      >
        <i className={`bi bi-chevron-compact-${!adittion ? "down" : "up"}`}></i>
        <p>{!adittion ? "Añadir fecha" : "Cerrar formulario"}</p>
        <i className={`bi bi-chevron-compact-${!adittion ? "down" : "up"}`}></i>
      </button>
      {adittion && (
        <>
          <div className="w-full max-w-[40%] mx-auto mt-5 p-5 normal-shadow rounded-xl bg-default-white">
            <div className="flex-center gap-10">
              <InputForm name="Fecha Inicio" type="date" onChange={() => {}} />
              <InputForm name="Fecha Fin" type="date" onChange={() => {}} />
            </div>
            <div className="mt-5">
              <TextareaForm name="Observation" onChange={() => {}} />
            </div>
            <div className="w-[35%] mx-auto p-2">
              <Button text="Guardar" onClick={() => {}} />
            </div>
          </div>
        </>
      )}
      <section className="w-[75%] mt-6 overflow-x mb-10 mx-auto normal-shadow p-3 rounded-xl bg-default-white">
        <div className="w-full mx-auto p-5 rounded-lg">
          <article className="flex h-10 rounded-lg p-2 items-center justify-between select-none bg-borders-light text-borders text-md font-semibold">
            <div className="w-[20%]">FECHA INICIO</div>
            <div className="w-[20%]">FECHA FIN</div>
            <div className="w-[50%]">OBSERVACIONES</div>
            <div className="w-[10%]">OPCIONES</div>
          </article>
          <article className="my-5 flex w-auto justify-between items-center">
            <div className="w-[20%]">08:00 AM</div>
            <div className="w-[20%]">18:00 AM</div>
            <div className="w-[50%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              nemo sint vitae velit voluptatem exercitationem fuga earum, ipsa,
              repellendus vero dolor rerum culpa sequi expedita ad quam porro
              itaque totam?
            </div>
            <div className="w-[10%]">
              <i
                onClick={() => setShowModal(true)}
                title="Eliminar horario"
                className="bi bi-x-circle text-2xl px-10 text-default-400 hover:text-primary transition-all"
              ></i>
            </div>
            750718
          </article>
          <article className="my-5 flex w-auto justify-between items-center">
            <div className="w-[20%]">08:00 AM</div>
            <div className="w-[20%]">14:00 AM</div>
            <div className="w-[50%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              nemo sint vitae velit voluptatem exercitationem fuga earum, ipsa,
              repellendus vero dolor rerum culpa sequi expedita ad quam porro
              itaque totam?
            </div>
            <div className="w-[10%]">
              <i
                onClick={() => setShowModal(true)}
                title="Eliminar horario"
                className="bi bi-x-circle text-2xl px-10 text-default-400 hover:text-primary transition-all"
              ></i>
            </div>
          </article>
          <article className="my-5 flex w-auto justify-between items-center">
            <div className="w-[20%]">02:00 AM</div>
            <div className="w-[20%]">05:00 AM</div>
            <div className="w-[50%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              nemo sint vitae velit voluptatem exercitationem fuga earum, ipsa,
              repellendus vero dolor rerum culpa sequi expedita ad quam porro
              itaque totam?
            </div>
            <div className="w-[10%]">
              <i
                onClick={() => setShowModal(true)}
                title="Eliminar horario"
                className="bi bi-x-circle text-2xl px-10 text-default-400 hover:text-primary transition-all"
              ></i>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Dates;
