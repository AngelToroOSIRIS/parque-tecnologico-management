"use client";

import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";
import { useRouter } from "next/navigation";
import { Menu } from "@headlessui/react";

const Header = () => {
  const router = useRouter();
  return (
    <header className="top-0 left-0 right-0 px-[7%] w-full h-[65px] text-start shadow-md bg-gray-box border-b border-borders-light z-40 select-none">
      <nav className="mx-auto flex items-center justify-between container-class gap-3">
        <section className="h-[65px] flex justify-between">
          {/* <Image
            src="/images/ecijg60.png"
            width={105}
            height={60}
            alt="Logo header"
            className="cursor-pointer fixed hidden xl:block"
            priority={true}
          /> */}
        </section>
          <ul className="lg:flex grid grid-cols-6 items-center justify-center font-medium md:flex-row">
            <li>
              <button
                onClick={() => router.push("/")}
                className="flex m-2 p-1 items-center justify-center font-semibold h-[40px] w-full rounded-lg hover:text-primary hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#990000"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <p className="ml-2 hidden lg:block">Inicio</p>
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/classrooms")}
                className="flex m-2 p-1 items-center justify-center font-semibold h-[40px] w-full rounded-lg hover:text-[#6800B4] hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#6800B4"
                  className="w-6 h-6 justify-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                  />
                </svg>
                <p className="ml-2 hidden lg:block">Salones de Clase</p>
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/sports")}
                className="flex m-2 p-1 justify-center items-center font-semibold h-[40px] w-full rounded-lg hover:text-[#D24C00] hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
                <i className="bi bi-dribbble text-xl text-[#D24C00]"></i>
                
                <p className="ml-2 hidden lg:block">Espacios Deportivos</p>
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/auditoriums")}
                className="flex m-2 p-1 items-center justify-center font-semibold h-[40px] w-full rounded-lg hover:text-[#229400] hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
                <i className="bi bi-people-fill text-xl text-[#D6C900]"></i>
                <p className="ml-2 hidden lg:block">Auditorios</p>
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/meeting")}
                className="flex m-2 p-1 items-center justify-center font-semibold h-[40px] w-full rounded-lg hover:text-[#0008B2] hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#0008B2"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>
                <p className="ml-2 hidden lg:block">Salas de reunión</p>
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/laboratories")}
                className="flex m-2 p-1 items-center justify-center font-semibold h-[40px] w-full rounded-lg hover:text-[#229400] hover:bg-borders-light hover:bg-opacity-60 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
              >
                <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/229400/thin-test-tube.png" alt="thin-test-tube"/>
                <p className="ml-2 hidden lg:block">Laboratorios</p>
              </button>
            </li>
          </ul>
        <Menu />
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
