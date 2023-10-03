import React from "react";

import {Listbox, ListboxItem} from "@nextui-org/react";
import {ListboxWrapper} from "@nextui-org/react";

export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  return (
    <div className="flex flex-col gap-2">
      <ListboxWrapper>
        <Listbox 
          aria-label="Multiple selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <ListboxItem key="text">Text</ListboxItem>
          <ListboxItem key="number">Number</ListboxItem>
          <ListboxItem key="date">Date</ListboxItem>
          <ListboxItem key="single_date">Single Date</ListboxItem>
          <ListboxItem key="iteration">Iteration</ListboxItem>
        </Listbox>
      </ListboxWrapper>
      <p className="text-small text-default-500">Selected value: {selectedValue}</p>
    </div>
  );
}