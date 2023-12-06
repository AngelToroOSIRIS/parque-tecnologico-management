"use client";

import { NextUIProvider } from "@nextui-org/react";
import { store } from "../redux/store";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <NextUIProvider>{children}</NextUIProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
