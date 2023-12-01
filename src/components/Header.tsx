"use client";

import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { categoriesObj } from "@/libs/staticData";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import ContentLoader from "react-content-loader";
import { includesString } from "@/libs/functionsStrings";
import Link from "next/link";
import Modal from "./Modal";
import { useState } from "react";

const Header = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, status } = useSession();
  const user = data?.user ?? {
    name: "default",
    email: "useremail",
  };
  return (
    <header className="fixed top-0 left-0 right-0 px-[7%] w-full h-[65px] text-start shadow-md bg-gray-box border-b border-borders-light z-40 select-none">
      <nav className="mx-auto flex items-center justify-between container-class gap-3">
        <section className="flex h-[65px] w-[130px] md:w-[230px]">
          <div>
            <Image
              src="/images/ecijg60.png"
              width={105}
              height={60}
              alt="Logo header"
              className="cursor-pointer fixed"
              priority={true}
            />
          </div>
        </section>
        <section className="h-[65px] w-full items-center flex justify-center">
          <ul className="flex items-center justify-center font-medium md:flex-row">
            {!user.interno && (
              <Link
                href="/"
                className="flex p-1 items-center w-[40px] lg:w-[100px] justify-center font-semibold h-[40px] rounded-lg hover:text-primary hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
                <i className="bi bi-house-door text-primary text-xl"></i>
                <p className="ml-2 hidden lg:block">Inicio</p>
              </Link>
            )}

            {user.interno && (
              <Link
                href="/sites"
                className="flex p-1 items-center w-[40px] lg:w-[100px] justify-center font-semibold h-[40px] rounded-lg hover:text-primary hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
                <i className="bi bi-house-door text-primary text-xl"></i>
                <p className="ml-2 hidden lg:block">Inicio</p>
              </Link>
            )}

            {!user.interno && status === "loading" && (
              <ContentLoader
                uniqueKey="category-info-header"
                speed={0.5}
                width={160}
                height={30}
                title="Cargando datos..."
                backgroundColor="#cccccc"
                foregroundColor="#ecebeb"
              >
                <rect x="5" y="7" rx="3" ry="3" width="140" height="20" />
              </ContentLoader>
            )}
            {!user.interno && status === "authenticated" && (
              <div className="flex items-center justify-center">
                <Menu
                  as="div"
                  className="sm:relative mx-2 p-2 items-center w-full lg:w-[150px] justify-center font-semibold h-[40px] rounded-lg hover:text-primary hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                >
                  <Menu.Button as="li" className={"flex px-2 w-full"}>
                    <i className="bi bi-layers text-lg text-primary"></i>{" "}
                    <p className="ml-2 hidden lg:flex">Categorías</p>
                  </Menu.Button>

                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute mt-2 w-56 origin-top-right divide-y divide-borders-light rounded-2xl bg-off-white normal-shadow z-40 outline-none">
                      <>
                        {categoriesObj.map(({ name, route }, i) => (
                          <div className="px-1 py-1" key={i}>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active &&
                                    "text-primary font-bold border-primary bg-hover"
                                  } group flex w-full items-center rounded-2xl p-2 border-r-4 border-gray-box transition-all text-gray font-medium opacity-80 hover:opacity-100`}
                                  onClick={() =>
                                    router.push(`/categories/${route}`)
                                  }
                                >
                                  <i className="mr-1 block bi bi-caret-right-fill"></i>
                                  {name}
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        ))}
                        <div>
                          {!user.interno && status === "authenticated" && includesString(user.rols ?? [], ["superadmin"]) && (
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active &&
                                    "text-primary font-bold border-primary bg-hover"
                                  } group flex w-full items-center rounded-2xl p-2 border-r-4 border-gray-box transition-all text-gray font-medium opacity-80 hover:opacity-100`}
                                  onClick={() => router.push(`/categories`)}
                                >
                                  <i className="mr-2 ml-1 block bi bi-pencil-fill"></i>
                                  Editar categorías
                                </button>
                              )}
                            </Menu.Item>
                          )}
                        </div>
                      </>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {!user.interno &&
                  status === "authenticated" &&
                  includesString(user.rols ?? [], ["superadmin", "users"]) && (
                    <Link
                      href="/users"
                      className="flex p-2 items-center justify-center font-semibold h-[40px] w-full rounded-lg hover:text-primary hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
                    >
                      <i className="bi bi-people text-primary text-xl"></i>
                      <p className="ml-2 hidden lg:block">Usuarios</p>
                    </Link>
                  )}
              </div>
            )}
          </ul>
        </section>
        <section className="flex w-[130px] md:w-[260px]">
          {!user.interno && (
            <div className="hidden w-full flex-col items-start transition-all justify-center lg:flex bg-borders-light bg-opacity-90 rounded-lg rounded-r-none ml-3 my-2 px-2">
              {!user.interno && status === "loading" && (
                <>
                  <ContentLoader
                    uniqueKey="user-info-header"
                    speed={0.5}
                    width={120}
                    height={45}
                    title="Cargando usuario..."
                    backgroundColor="#cccccc"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="0" y="8" rx="5" ry="3" width="110" height="28" />
                  </ContentLoader>
                </>
              )}

              {status === "authenticated" && (
                <>
                  <p className="text-xs mx-auto text-center border-b-2 w-[85%] border-borders-light hover:border-primary hover:font-semibold transition-all">
                    {user.name}
                  </p>
                </>
              )}
            </div>
          )}
          {!user.interno && (
            <div className="flex flex-col items-start justify-center bg-borders-light bg-opacity-90 rounded-lg lg:rounded-lg lg:rounded-l-none my-2">
              <Modal
                isOpen={showModal}
                setIsOpen={setShowModal}
                classContainer="w-[95%] max-w-[500px]"
              >
                <>
                  <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
                    Cerrar sesión
                  </h1>
                  <div>
                    <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                      ¿Seguro que quiere cerrar sesión?
                    </p>
                  </div>
                  <div className="flex items-center gap-7 pb-3 justify-center text-center">
                    <div className="mt-5">
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                        }}
                        type="button"
                        className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                      >
                        Cerrar sesión
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
              <i
                onClick={() => setShowModal(true)}
                className="bi bi-box-arrow-right text-xl hover:text-primary m-2 transition-all"
              ></i>
            </div>
          )}
          {user.interno && (
            <div className="flex flex-col items-start justify-center bg-borders-light bg-opacity-90 rounded-lg my-2">
              <i
                onClick={() => setShowModal(true)}
                className="bi bi-box-arrow-right text-xl hover:text-primary m-2 transition-all"
              ></i>
            </div>
          )}
        </section>
      </nav>
    </header>
  );
};

export default Header;
