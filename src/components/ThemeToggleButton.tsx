"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { usedarkTheme } from "./providers/ThemeProvider";
import { cn } from "@/lib/utils";

type ThemeToggleButtonProps = {
  className: string;
};

function ThemeToggleButton({ className }: ThemeToggleButtonProps) {
  const { dark, setdark } = usedarkTheme();
  return (
    <>
      {dark ? (
        <div
          className={cn(
            "z-50 cursor-pointer size-fit bg-foreground text-background rounded-xl p-2",
            className
          )}
          onClick={() => setdark(!dark)}
        >
          <SunIcon></SunIcon>
        </div>
      ) : (
        <div
          onClick={() => setdark(!dark)}
          className={cn(
            "z-50 cursor-pointer size-fit bg-foreground text-background rounded-xl p-2",
            className
          )}
        >
          <MoonIcon></MoonIcon>
        </div>
      )}
    </>
  );
}

export { ThemeToggleButton };
