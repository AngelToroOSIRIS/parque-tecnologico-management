"use client";

import { Switch as SwitchHDLS } from "@headlessui/react";
import { useEffect, useState } from "react";

const Switch = ({
  defaultEnabled = false,

  onChange,
}: {
  defaultEnabled?: boolean;

  onChange: (value:boolean) => any;
}) => {
  const [enabled, setEnabled] = useState<boolean>(defaultEnabled);

  useEffect(() => {
    onChange(enabled);
  }, [enabled]);

  return (
    <SwitchHDLS
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? "bg-primary" : "bg-borders-light"}

          relative inline-flex mx-auto h-[30px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-borders-light transition-colors duration-100 ease-in-out outline-none`}
    >
      <span className="sr-only">Use setting</span>

      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-5" : "translate-x-0"}

            pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-default-white shadow-lg transition duration-100 ease-in-out`}
      />
    </SwitchHDLS>
  );
};

export default Switch;
