"use client"

import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";

function Providers({ children }: PropsWithChildren) {
  
  return <NextUIProvider>{children}</NextUIProvider>
}

export { Providers };