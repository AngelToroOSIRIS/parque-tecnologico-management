"use client";

import { SelectItem } from "@nextui-org/react";
import Button from "./Button";
import InputForm from "./forms/InputForm";
import SelectForm from "./forms/SelectForm";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Modal from "./Modal";
import fetchFn from "@/libs/fetchFn";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { NotificationInfo } from "@/types/d";
import useValidateForm from "@/hooks/useValidateForm";

const NotifyComponent = () => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationInfo>({
    areas: [],
    notificaciones: [],
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<string>("");
  const [selectedUser, setselectedUser] = useState<string>("");
  const [selectedArea, setselectedArea] = useState<number>(0);

  const dataNewNotificationUser = useValidateForm([
    {
      name: "email",
      type: "str",
      required: true,
    },
    {
      name: "area",
      type: "int",
      required: true,
    },
  ]);

  const getData = async () => {
    const response = await fetchFn("/notificacion/getNotifications");
    if (response.code !== 200) {
      return toast.error("No se han podido obtener los datos", {
        id: "1",
      });
    }
    setLoading(false);
    setNotifications(response.data);
  };

  const addUser = async () => {
    const responseAdd = await fetchFn("/notificacion/createNotification", {
      method: "POST",
      body: {
        area: dataNewNotificationUser.getData.area,
        email: dataNewNotificationUser.getData.email,
      },
    });
    if (responseAdd.code !== 200) {
      return toast.error("No se ha podido crear el usuario", { id: "4" });
    }
    toast.success("Usuario creado correctamente", { id: "5" });
    setShowModal(false);
    getData();
  };

  const deleteUser = async () => {
    const res = await fetchFn(
      `/notificacion/deleteNotification/${selectedArea}`,
      { method: "DELETE" }
    );
    if (res.code !== 200) {
      return toast.error("No se ha podido eliminar el usuario", { id: "2" });
    }
    toast.success("Usuario eliminado correctamente", { id: "3" });
    setShowModal(false);
    getData();
  };

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status]);

  return (
    <>
      <main className="margin-header">
        {!loading && (
          <>
            <div>
              <p className="text-center text-primary margin-header md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
                Administrar notificaciones de usuario
              </p>
              <>
                <section className="w-[85%] md:w-[80%] mt-6 overflow-x mb-10 mx-auto normal-shadow p-3 rounded-xl bg-default-white">
                  <p className="text-center text-primary m-4 font-semibold text-2xl">
                    Añadir usuario a notificar
                  </p>
                  <p className="mb-2 ml-4 text-primary text-start text-sm select-none">
                    Campos obligatorios (
                    <i className="bi bi-asterisk text-xs"></i>)
                  </p>
                  <div className="w-full flex-row md:flex mx-auto p-3 rounded-lg  gap-10">
                    <InputForm
                      name="email"
                      className="mt-2"
                      placeholder="Ingresar correo"
                      type="email"
                      validations={{
                        required: "El correo es un campo obligatorio",
                        validateEmail: true,
                      }}
                      label={{ required: true, value: "Correo del usuario:" }}
                      onChange={dataNewNotificationUser.setField}
                    />
                    <SelectForm
                      name="area"
                      onChange={dataNewNotificationUser.setField}
                      placeholder="Seleccionar área"
                      label={{ required: true, value: "Seleccionar área:" }}
                    >
                      {notifications?.areas.map((notification) => (
                        <SelectItem key={notification.id}>
                          {notification.descripcion}
                        </SelectItem>
                      ))}
                    </SelectForm>
                  </div>
                  <div className="max-w-[200px] mx-auto m-2 flex-center">
                    <Button
                      text="Guardar"
                      disabled={!dataNewNotificationUser.validData}
                      onClick={() => {
                        setContentModal("add");
                        setShowModal(true);
                      }}
                    />
                  </div>
                </section>
              </>

              {notifications?.notificaciones.length >= 1 && (
                <section className="w-[85%] md:w-[80%] mt-6 overflow-x mb-10 mx-auto normal-shadow p-3 rounded-xl bg-default-white">
                  <div className="w-full mx-auto p-5 rounded-lg">
                    <>
                      <article className="flex h-10 rounded-lg p-2 items-center justify-between select-none bg-borders-light text-borders text-md font-semibold">
                        <div className="w-[50%]">USUARIO</div>
                        <div className="w-[30%]">ÁREA</div>
                        <div className="w-[20%] text-center">ELIMINAR</div>
                      </article>

                      {notifications?.notificaciones.map((notification) => (
                        <article
                          key={notification.id}
                          className="my-5 flex w-auto justify-between items-center"
                        >
                          <div className="w-[50%]">{notification.email}</div>
                          <div className="w-[30%]">{notification.area}</div>
                          <div className="w-[20%] text-center">
                            <button
                              onClick={() => {
                                setContentModal("delete");
                                setShowModal(true);
                                setselectedUser(notification.email);
                                setselectedArea(notification.id);
                              }}
                              className="text-borders text-xl outline-none hover:text-primary transition-all"
                            >
                              <i className="bi bi-trash3 text-xl"></i>
                            </button>
                          </div>
                        </article>
                      ))}
                    </>
                  </div>
                </section>
              )}
            </div>
            {notifications?.notificaciones.length === 0 && (
              <div className="text-center text-default-300 select-none">
                <i className="bi bi-x-circle text-7xl"></i>
                <p className="text-4xl mt-[1%]">
                  No se han encontrado usuarios
                </p>
              </div>
            )}
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
      </main>
      <Modal
        setIsOpen={setShowModal}
        classContainer="w-[95%] max-w-[500px]"
        isOpen={showModal}
      >
        {contentModal === "add" && (
          <>
            <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
              Validación de datos
            </h1>
            <div>
              <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                ¿Seguro que quiere crear el usuario <br />{" "}
                <b>{dataNewNotificationUser.getData.email}</b> en el área{" "}
                <b>
                  {
                    notifications.areas.find(
                      (i) => i.id === dataNewNotificationUser.getData.area
                    )?.descripcion
                  }
                </b>
                ?
              </p>
            </div>
            <div className="flex items-center gap-7 pb-3 justify-center text-center">
              <div className="mt-5">
                <button
                  onClick={addUser}
                  type="button"
                  className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                >
                  Crear usuario
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
        )}
        {contentModal === "delete" && (
          <>
            <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
              Eliminar usuario
            </h1>
            <div>
              <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                ¿Seguro que quiere eliminar el usuario <b>{selectedUser}</b>?
              </p>
            </div>
            <div className="flex items-center gap-7 pb-3 justify-center text-center">
              <div className="mt-5">
                <button
                  onClick={deleteUser}
                  type="button"
                  className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                >
                  Eliminar usuario
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
        )}
      </Modal>
    </>
  );
};

export default NotifyComponent;
