import { cn } from "@/lib/utils";
import {
  Context,
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

type IdarkThemeContext = {
  dark: boolean;
  setdark: Dispatch<SetStateAction<boolean>>;
};

/**
 * ## darkThemeContext
 */
const darkThemeContext: Context<IdarkThemeContext> =
  createContext<IdarkThemeContext>(null as any);

darkThemeContext.displayName = "darkThemeContext";

type IdarkThemeContextProviderProps = PropsWithChildren;

/**
 * ## darkTheme context provider component
 *
 */
export const DarkThemeContextProvider: React.FC<
  IdarkThemeContextProviderProps
> = (props) => {
  const [dark, setdark] = useState<boolean>(true);

  return (
    <darkThemeContext.Provider
      value={{
        dark,
        setdark,
      }}
    >
      <div
        className={cn("contents", {
          "dark": dark,
          "": !dark,
        })}
      >
        {props.children}
      </div>
    </darkThemeContext.Provider>
  );
};

export const usedarkTheme = (): IdarkThemeContext =>
  useContext(darkThemeContext);
