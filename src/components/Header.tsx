"use client";

import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import ContentLoader from "react-content-loader";
import { includesString } from "@/libs/functionsStrings";
import Link from "next/link";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import fetchFn from "@/libs/fetchFn";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCategories } from "@/redux/features/categoriesSlice";

const Header = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, status } = useSession();
  const user = data?.user ?? {
    name: "default",
    email: "useremail",
  };
  const linkClass =
    "p-1 items-center w-full justify-center font-semibold h-[40px] rounded-lg hover:text-primary hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0";
  const categories = useAppSelector((state) => state.categoriesReducer);
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
  useEffect(() => {
    if (categories.data.length < 1) getCategories();
  }, [categories]);

  return (
    <header className="fixed top-0 left-0 right-0 px-[7%] w-full h-[65px] text-start normal-shadow bg-gray-box border-b border-borders-light z-40 select-none">
      <Modal
        isOpen={showModal}
        setIsOpen={setShowModal}
        classContainer="max-w-[450px]"
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

        <section className="h-[65px] w-full flex-center ">
          <ul className="flex items-center justify-center gap-4 font-medium md:flex-row">
            {!user.interno && (
              <Link href="/" className={linkClass + " flex"}>
                <i className="bi bi-house-door text-2xl text-primary md:text-xl"></i>
                <p className="ml-2 hidden md:block">Inicio</p>
              </Link>
            )}

            {user.interno && (
              <Link href="/sites" className={linkClass + " flex"}>
                <i className="bi bi-house-door text-2xl text-primary md:text-xl"></i>
                <p className="ml-2 hidden md:block">Inicio</p>
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
              <>
                {categories.data.length > 0 && (
                  <Menu
                    as="div"
                    className={linkClass}
                  >
                    <Menu.Button as="li" className={"flex-center h-full px-2 w-full"}>
                      <i className="bi bi-layers text-2xl md:text-xl text-primary"></i>{" "}
                      <p className="ml-2 hidden cursor-pointer md:flex">
                        Categorías
                      </p>
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
                          {categories.data.map(
                            ({ titulo, estado, identificador, id }) => {
                              if (estado === "1") {
                                return (
                                  <div key={id}>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          className={`${
                                            active &&
                                            "text-primary font-bold border-primary bg-hover"
                                          } group flex w-full items-center rounded-2xl p-2 border-r-4 border-gray-box transition-all text-gray font-medium opacity-80 hover:opacity-100`}
                                          onClick={() =>
                                            router.push(
                                              `/categories/${identificador}`
                                            )
                                          }
                                        >
                                          <i className="mr-1 block bi bi-caret-right-fill"></i>
                                          {titulo}
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                );
                              }
                            }
                          )}
                          <div>
                            {!user.interno &&
                              status === "authenticated" &&
                              includesString(user.rols ?? [], [
                                "superadmin",
                              ]) && (
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
                )}
                {!user.interno &&
                  status === "authenticated" &&
                  includesString(user.rols ?? [], ["superadmin", "users"]) && (
                    <>
                      <Link href="/users" className={linkClass + " flex"}>
                        <i className="bi bi-people text-primary text-2xl md:text-xl"></i>
                        <p className="ml-2 hidden md:block">Usuarios</p>
                      </Link>
                      <Link href="/notification" className={linkClass + " flex"}>
                        <i className="bi bi-bell text-primary text-2xl md:text-xl"></i>
                        <p className="ml-2 hidden md:block">Notificaciones</p>
                      </Link>
                    </>
                  )}
              </>
            )}
          </ul>
        </section>

        <section className="flex w-[130px] h-[40px] md:w-[260px] bg-borders-light bg-opacity-90 rounded-lg px-2">
          <div className="hidden w-full flex-col items-start justify-center md:flex">
            {status === "loading" && (
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
            )}

            {status === "authenticated" && (
              <p className="text-sm mx-auto text-center text-default-700 font-semibold">
                {user.name?.split(" ")[0]}
              </p>
            )}
          </div>

          <div className="flex-center w-full lg:w-auto">
            <i
              onClick={() => setShowModal(true)}
              className="bi bi-box-arrow-right text-xl hover:text-primary m-2 transition-all cursor-pointer"
            ></i>
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Header;
