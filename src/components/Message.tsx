import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { forwardRef } from "react";

type MessageProps = {
  content: string;
  isUserMessage: boolean;
};

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ content, isUserMessage }: MessageProps, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-6 w-full max-h-full flex items-center gap-6 rounded-3xl", {
          "bg-card": !isUserMessage,
          "bg-transparent": isUserMessage,
        })}
      >
        {/* <div
        className={cn(
          "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
          {
            "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage,
          }
        )}
      > */}
        <div
          className={cn(
            "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
            {
              //@ts-ignore
              "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage,
            }
          )}
        >
          {isUserMessage ? (
            <User className="size-5" />
          ) : (
            <Bot className="size-5 text-white" />
          )}
        </div>

        <p className="text-sm font-mono font-semibold py-2.5 text-gray-900 dark:text-white">
          {content}
        </p>
      </div>
    );
  }
);

export { Message };
