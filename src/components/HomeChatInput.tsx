"use client";

import { cn } from "@/lib/utils";
import { Button, Textarea } from "@nextui-org/react";
import { Send } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type HomeChatInputProps = {
  className: string;
};

type FormInputs = {
  url: string;
};

function HomeChatInput({ className = "" }: HomeChatInputProps) {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormInputs>();
  function submitHandler(e: FormInputs) {
    // e.preventDefault()
    const url = e.url;
    console.log(e);
    console.log(url);
    router.push(`/chatai/${url}`);
  }
  return (
    // <div className="z-10 bg-zinc-900 absolute bottom-0 left-0 w-full">
    //   <div className="m-2 flex flex-row gap-3 md:mx-4 justify-center ">
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={cn("p-3 flex gap-2 bg-transparent", className)}
    >
      <Textarea
        placeholder="Enter Website URL....."
        className="text-accent-foreground font-mono bg-secondary rounded-xl ring-[1px] focus-within:ring focus:ring focus-visible:ring "
        minRows={1}
        maxRows={1}
        autoFocus
        type="text"
        {...register("url")}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(submitHandler)();
          }
        }}
      ></Textarea>
      <Button
        className=" flex-grow-0 rounded-full bg-foreground text-background flex items-center justify-center w-4"
        type="submit"
      >
        <Send></Send>
      </Button>
    </form>
  );
}

export { HomeChatInput };
