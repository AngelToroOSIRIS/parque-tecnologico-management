import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Example() {
  return (
    <div>
      <Menu as="div" className="absolute w-10 inline-block text-left">
        <div>
          <Menu.Button className=" absolute inline-flex w-full justify-center rounded-lg px-4 py-2 text-sm font-medium text-white">
          <i className="bi bi-gear-fill ml-[650px] -mt-1 pb-1 m-auto hover:bg-borders-light hover:bg-opacity-70 rounded-full text-base h-7 w-10 text-primary transition-all"></i>
            <ChevronDownIcon
              className="ml-5 -mt-3 hidden bg-hover hover:bg-borders-light hover:bg-opacity-70 rounded-full h-7 w-7 text-primary transition-all"
              aria-hidden="true"
              />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-[370px] -top-4 mt-3 z-50 w-36 rounded-lg bg-gray-box shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-default-white transition-all" : "text-custom-black"
                    } group flex w-full font-medium items-center rounded-md px-2 py-3 text-base`}
                  >
                    {active ? (
                      <EditActiveIcon
                        className="mr-2 h-5 w-5 "
                        aria-hidden="true"
                      />
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Editar
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary  text-default-white font-bold transition-all" : "text-custom-black"
                    } group flex w-full font-medium items-center rounded-md px-2 py-3 text-base`}
                  >
                    {active ? (
                      <DeleteActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Imagenes
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary  text-default-white font-bold transition-all" : "text-custom-black"
                    } group flex w-full font-medium items-center rounded-md px-2 py-3 text-base`}
                  >
                    {active ? (
                      <ArchiveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArchiveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Inhabilitar
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary  text-default-white font-bold transition-all" : "text-custom-black"
                    } group flex w-full font-medium items-center rounded-md px-2 py-3 text-base`}
                  >
                    {active ? (
                      <MoveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <MoveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Reservar
                  </button>
                )}
              </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary  text-default-white font-bold transition-all" : "text-custom-black"
                    } group flex w-full font-medium items-center rounded-md px-2 py-3 text-base`}
                  >
                    {active ? (
                      <DuplicateActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <DuplicateInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Ver página
                  </button>
                )}
              </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function EditInactiveIcon(props: any) {
  return (
    <i className="bi bi-pencil-fill text-primary mx-2"></i>
  );
}

function EditActiveIcon(props: any) {
  return (
    <i className="bi bi-pencil-fill text-default-white mx-2"></i>
  );
}

function ArchiveInactiveIcon(props: any) {
  return (
    <i className="bi bi-ban text-primary mx-2"></i>
  );
}

function ArchiveActiveIcon(props: any) {
  return (
    <i className="bi bi-ban text-default-white mx-2"></i>
  );
}

function MoveInactiveIcon(props: any) {
  return (
    <i className="bi bi-calendar-check-fill text-primary mx-2"></i>
  );
}

function MoveActiveIcon(props: any) {
  return (
    <i className="bi bi-calendar-check-fill text-default-white mx-2"></i>
  );
}

function DeleteInactiveIcon(props: any) {
  return (
    <i className="bi bi-trash3-fill text-primary mx-2"></i>
  );
}

function DeleteActiveIcon(props: any) {
  return (
    <i className="bi bi-trash3-fill text-default-white mx-2"></i>

  );
}

function DuplicateInactiveIcon(props: any) {
    return (
        <i className="bi bi-eye-fill text-primary mx-2"></i>
    );
  }
  
  function DuplicateActiveIcon(props: any) {
    return (
        <i className="bi bi-eye-fill text-default-white mx-2"></i>
    );
  }