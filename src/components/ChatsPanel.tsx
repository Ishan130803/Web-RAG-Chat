import { getUserChatMetaData } from "@/lib/db-utils";
import { ChatsBanner } from "./ChatsBanner";
import { History, Plus } from "lucide-react";
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
      <span className="text-2xl font-bold text-foreground flex gap-2 justify-center items-center my-4">
        Archive <History className="size-6"></History>
      </span>
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
