import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req:NextRequest) => {
  const {messages, sessionId, namespaceId} = await req.json()

  const lastMessage = messages[messages.length - 1].content

  const response = await ragChat.chat(lastMessage, {streaming : true,namespace:namespaceId, sessionId : sessionId})

  return aiUseChatAdapter(response)
}