"use client";

import { cn } from "@/lib/utils";
import { Button, Textarea } from "@nextui-org/react";
import { type useChat } from "ai/react";
import { Send } from "lucide-react";

type ChatInputProps = {
  input: string;
  handleInputChange: ReturnType<typeof useChat>["handleInputChange"];
  handleSubmit: ReturnType<typeof useChat>["handleSubmit"];
  setInput: ReturnType<typeof useChat>["setInput"];
  className?: string;
};

function ChatInput({
  handleInputChange,
  handleSubmit,
  input,
  setInput,
  className = "",
}: ChatInputProps) {
  return (
    // <div className="z-10 bg-zinc-900 absolute bottom-0 left-0 w-full">
    //   <div className="m-2 flex flex-row gap-3 md:mx-4 justify-center ">
    <div className={cn("flex gap-2 p-3", className)}>
      <form onSubmit={handleSubmit} className="contents">
        <Textarea
          placeholder="Enter Your Query....."
          className="text-accent-foreground font-sans bg-secondary rounded-3xl ring-[1px] focus-within:ring focus:ring focus-visible:ring "
          minRows={1}
          maxRows={10}
          autoFocus
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
              setInput("");
            }
          }}
        ></Textarea>
        <Button
          className=" flex-grow-0 rounded-full bg-secondary"
          type="submit"
        >
          <Send></Send>
        </Button>
      </form>
    </div>
  );
}

export { ChatInput };
