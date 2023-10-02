import React from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  SortDescriptor,
} from "@nextui-org/react";
import { ChevronDownIcon } from "@/components/table/ChevronDownIcon";
import { statusOptions } from "./table/data";
import { capitalize } from "./table/utils";

export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Estado"]));
  //@ts-ignores

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

   const state = statusOptions.map.name;
 console.log(statusOptions)
 if (state === "Todos") {
  console.log("Todos")
 }
  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex mx-2">
        <Button
          endContent={<ChevronDownIcon className="text-small" />}
          variant="bordered"
          className="capitalize"
          disableAnimation={true}
          >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        className="bg-custom-black text-default-white flex rounded-lg justify-between"
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        //@ts-ignore
        onSelectionChange={setSelectedKeys}
        
      >
        {statusOptions.map((status) => (
          <DropdownItem key={status.uid} className="capitalize">
            {capitalize(status.name)}
          </DropdownItem>
        ))}
            {/* <DropdownItem key="Todos">
              <p>Todos</p>
            </DropdownItem>
            <DropdownItem key="Disponibles">Disponibles</DropdownItem>
            <DropdownItem key="Reservados">Reservados</DropdownItem>
            <DropdownItem key="Mantenimiento">Mantenimiento</DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
}
