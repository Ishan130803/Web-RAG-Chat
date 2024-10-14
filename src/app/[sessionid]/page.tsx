"use client";
import { ArchiveModal } from "@/components/ArchiveModal";
import { HomeChatInput } from "@/components/HomeChatInput";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { Button } from "@nextui-org/react";
import { Bot, History } from "lucide-react";
import { useState } from "react";

type PageProps = {
  params: {
    sessionid: string;
  };
};

function Page({ params }: PageProps) {
  console.log(params);
  const [modal, setModal] = useState(false);
  const sessionId = params.sessionid;
  return (
    <>

      {modal && (
        <ArchiveModal
          items={[]}
          setModal={setModal}
          modal={modal}
        ></ArchiveModal>
      )}
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <Bot className="text-foreground bg-background  border-2 p-2 rounded-full size-20 my-6"></Bot>
        <p className="text-muted-foreground font-mono text-3xl text-center">
          Enter URL of the Website to chat with
        </p>
        <HomeChatInput className="w-full max-w-xl lg:max-w-6xl md:max-w-3xl transition-all duration-1000"></HomeChatInput>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setModal(!modal);
          }}
          className="text-xl my-4 rounded-full bg-foreground  text-background p-4 hover:bg-background hover:text-white transition-colors duration-500  "
        >
          Archive <History className="size-4"></History>
        </Button>
      </div>
    </>
  );
}

export default Page;
