import { getUserChatMetaData } from "@/lib/db-utils";
import { ChatsBanner } from "./ChatsBanner";
import { Bot, History, Plus } from "lucide-react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { NewInputButton } from "./NewInputButton";
type ChatsPanelProps = {
  userId: string;
};

type IChatMetaData = {
  chatId: string;
  chatHeading: string;
};

async function ChatsPanel({ userId }: ChatsPanelProps) {
  console.log(userId);
  const chatMetaData = Object.values(
    (await getUserChatMetaData(userId)) ?? {}
  ) as IChatMetaData[];
  console.log(chatMetaData);
  return (
    <div className="font-mono max-w-64 w-full bg-border flex flex-col gap-2 px-4">
      <div className="flex justify-center w-full">
        <Link href={'/'} className="contents">
          <Bot className="text-foreground bg-background  border-2 p-2 rounded-full size-14 my-6 shrink-0 hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-500"></Bot>
        </Link>

        <span className="w-full text-2xl font-bold text-foreground flex gap-2 justify-center items-center my-4">
          Archive <History className="size-6"></History>
        </span>
      </div>
      <NewInputButton userId={userId}></NewInputButton>
      {chatMetaData.map((value, index) => {
        return (
          <ChatsBanner
            chatId={value.chatId}
            chatName={value.chatHeading}
            userId={userId}
            key={index}
          ></ChatsBanner>
        );
      })}
    </div>
  );
}

export { ChatsPanel };
