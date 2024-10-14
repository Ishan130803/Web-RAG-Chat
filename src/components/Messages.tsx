"use client";
import { type Message as TMessage } from "ai/react";
import { Message } from "./Message";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

type MessagesProps = {
  messages: TMessage[];
};

function Messages({ messages }: MessagesProps) {
  const lastMessageRef = useRef(null as any);
  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (messages.length) {
      scrollToBottom();
    }
  }, [messages]);


  return (
    <div className="w-full h-full mx-auto flex flex-col gap-2 ">
      {messages.length ? (
        messages.map((mes, i) =>
          i == messages.length - 1 ? (
            <Message
              key={i}
              content={mes.content}
              isUserMessage={mes.role === "user"}
              ref={lastMessageRef}
            />
          ) : (
            <Message
              key={i}
              content={mes.content}
              isUserMessage={mes.role === "user"}
            />
          )
        )
      ) : (
        <div className="w-full h-full flex-1 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="size-8 text-blue-500" />
          <h3 className="font-semibold text-2xl text-foreground">You're all Set!</h3>
          <p className="text-zinc-500 text-sm">
            Ask Your first question to get started
          </p>
        </div>
      )}
    </div>
  );
}

export { Messages };
