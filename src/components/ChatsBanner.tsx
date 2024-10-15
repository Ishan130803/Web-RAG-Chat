"use client";

import { deleteUserChat } from "@/lib/db-utils";
import { cn } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { revalidatePath } from "next/cache";
import { usePathname, useRouter } from "next/navigation";

type ChatsBannerProps = {
  chatId: string;
  chatName: string;
  userId: string;
};

function ChatsBanner({ chatId, chatName, userId }: ChatsBannerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const lastElement = pathname.split("/").pop();
  let active = false;
  if (lastElement == chatId) {
    active = true;
  }
  async function deleteHandler(e: any) {
    e.stopPropagation();
    await deleteUserChat(userId, chatId);
    router.refresh()
    router.push(`/${userId}`);
  }
  return (
    <div
      className={cn(
        "relative px-4 select-none cursor-pointer py-1  rounded-xl text-foreground hover:text-background hover:bg-foreground transition-all duration-500 font-mono flex items-center group",
        {
          "bg-transparent": !active,
          "bg-foreground text-background py-4": active,
        }
      )}
      onClick={() => router.push(`/${userId}/${chatId}`)}
    >
      <span className="w-full overflow-ellipsis overflow-hidden line-clamp-1">
        {chatName}
      </span>
      <div
        className="trash-wrapper hidden group-hover:block hover:bg-muted-foreground rounded-lg -my-1 p-1"
        onClick={deleteHandler}
      >
        <Trash2Icon className="size-5"></Trash2Icon>
      </div>
      <div className=" left-[105%] z-50 p-2 rounded-xl max-w-96 text-wrap hidden opacity-0 absolute group-hover:block group-hover:opacity-100 transition-opacity delay-500 text-background bg-foreground">
          {chatName}
      </div>
    </div>
  );
}

export { ChatsBanner };
