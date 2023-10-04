import { Switch, cn } from "@nextui-org/react";
import React from "react";

const SwitchComponent = () => {
  return (
    <Switch
      aria-label="Automatic updates"
      color="success"
      defaultSelected
      classNames={{
        thumb: cn(
          "group-data-[hover=true]:bg-default-white",
          //selected
          "group-data-[selected=true]:bg-default-white ",
          // pressed
          "group-data-[pressed=true]:w-7",
          "group-data-[selected]:group-data-[pressed]:ml-5 bg-default-white"
        ),
      }}
    ></Switch>
  );
};

export default SwitchComponent;
