import { ChatsPanel } from "@/components/ChatsPanel";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { PropsWithChildren } from "react";

type LayoutProps = {
  params: {
    sessionid: string;
  };
} & PropsWithChildren;

function Layout({ params, children }: LayoutProps) {
  console.log("Layout", params);
  return (
    <>

      <div className="flex w-full h-full">
        <ChatsPanel userId={params.sessionid}></ChatsPanel>
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}

export default Layout;
