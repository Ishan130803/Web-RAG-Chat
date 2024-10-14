"use client";

import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type NewInputButtonProps = {
  userId: string;
  className?: string;
};

function NewInputButton({ className, userId }: NewInputButtonProps) {
  const router = useRouter()
  return (
    <Button className="bg-foreground rounded-full text-background hover:bg-background hover:text-foreground transition-colors duration-500 my-4 py-2 text-xl" onClick={()=>router.push(`/${userId}`)}>
      New Chat <Plus className="inline size-4"></Plus>
    </Button>
  );
}

export { NewInputButton };
