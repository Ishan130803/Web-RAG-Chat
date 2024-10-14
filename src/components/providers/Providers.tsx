"use client";

import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import { DarkThemeContextProvider } from "./ThemeProvider";

function Providers({ children }: PropsWithChildren) {
  return (
    <DarkThemeContextProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </DarkThemeContextProvider>
  );
}

export { Providers };
