import { Tab } from "@headlessui/react";

export default function Tabs() {
  return (
    <>
      <Tab.Group>
        <Tab.List className="xl:w-[50%] mx-auto m-7 grid grid-cols-3 sm:grid-cols-3 xl:grid-cols-3  justify-center items-center gap-x-2 md::gap-y-10">
          <Tab className="h-12 border-2 rounded-xl  xl:text-lg text-base  md:h-12 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] bg-default-white my-2 font-semibold text-primary hover:bg-primary hover:text-default-white transition-all focus:bg-primary focus:text-default-white">
              Todos
          </Tab>
          <Tab className="h-12 border-2 rounded-xl xl:text-lg text-base  md:h-12 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  bg-default-white my-2 font-semibold text-primary hover:bg-primary hover:text-default-white transition-all focus:bg-primary focus:text-default-white">
              Disponibles
          </Tab>
          <Tab className=" h-12 border-2 rounded-xl xl:text-lg text-base  md:h-12 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  bg-default-white my-2 font-semibold text-primary hover:bg-primary hover:text-default-white transition-all focus:bg-primary focus:text-default-white">
              Reservados
          </Tab>
        </Tab.List>
        {/* <Tab.Panels>
          <Tab.Panel>Contenido 1</Tab.Panel>
          <Tab.Panel>Contenido 2</Tab.Panel>
          <Tab.Panel>Contenido 3</Tab.Panel>
        </Tab.Panels> */}
      </Tab.Group>
    </>
  );
}
