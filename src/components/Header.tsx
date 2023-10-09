"use client";

import SignOutButton from "@/components/SignOutButton";
import { useRouter } from "next/navigation";
import { Menu } from "@headlessui/react";
import { categoriesObj } from "@/libs/staticData";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 px-[7%] w-full h-[65px] text-start shadow-md bg-gray-box border-b border-borders-light z-40 select-none">
      <nav className="mx-auto flex items-center justify-between container-class gap-3">
        <section className="h-[65px] flex justify-between">
          <div className="w-[120px]">
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
        <section className="h-[65px] flex justify-start">
          <ul className="lg:flex grid grid-cols-4 items-center justify-center font-medium md:flex-row">
            <li>
              <button onClick={() => router.push(`/`)} className="flex m-2 p-1 items-center justify-center font-semibold h-[40px] w-full rounded-lg hover:text-primary hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                <i className="bi bi-house-fill text-primary text-xl"></i>
                <p className="ml-2 hidden lg:block">Inicio</p>
              </button>
            </li>
            <li>
              <button onClick={() => router.push(`/financial`)} className="flex m-2 p-1 items-center font-semibold h-[40px] w-full rounded-lg hover:text-primary hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                <i className="bi bi-currency-dollar text-[#CCA400] text-xl"></i>
                <p className="ml-2 hidden lg:block">Financiera</p>
              </button>
            </li>
            <Menu
              as="div"
              className="flex m-3 p-1 items-center cursor-pointer justify-center font-semibold h-[40px] w-full rounded-lg hover:text-primary"
            >
              <Menu.Button
                as="li"
                className="flex m-2 p-1 items-center justify-center font-semibold h-[40px] w-full rounded-lg hover:text-primary hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
                <i className="bi bi-stack mr-2 text-2xl sm:text-base text-primary"></i>{" "}
                <p className="hidden sm:block">Categorías</p>
              </Menu.Button>
              <Menu.Items className="absolute mt-64 w-56 divide-y divide-borders-light rounded-2xl bg-off-white normal-shadow z-40 outline-none">
                {categoriesObj.map(
                  ({ name, route, icon, color, disabled }, i) => {
                    if (!disabled) {
                      return (
                        <div className="px-1  py-1" key={i}>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active && `font-bold bg-hover `
                                } group flex w-full  items-center rounded-2xl p-2 border-r-4 border-gray-box transition-all text-gray font-medium opacity-80 hover:opacity-100`}
                                style={{color:  active ? color: ""}}
                                onClick={() => router.push(`/${route}`)}
                              >
                                <i
                                  className={
                                    `mr-2 hidden text-lg sm:block bi bi-` +
                                    icon
                                  }
                                  style={{color}}
                                ></i>
                                {name}
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      );
                    }
                  }
                )}
              </Menu.Items>
            </Menu>
          </ul>
        </section>
        {/* Botón de cerrar sesión */}
        <section className="h-[65px] flex justify-start">
          <SignOutButton />
        </section>
      </nav>
      {/* Mostrar nombre del usuario */}
      {/* <div className="justify-end flex mr-[3%] ml-[3%]">
				<p className="hidden lg:block">
					<b>{status === "authenticated" && user.name}</b>
				</p>
			</div>  */}
    </header>
  );
};

export default Header;
