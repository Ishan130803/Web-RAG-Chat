"use client"

import { IndexUrlToRedisVectorDB } from "@/lib/rag-chat";
import { Message } from "ai";
import { useEffect, useState } from "react";

type useVectorDBProps = {
  sessionId : string,
  url : string,
};

function useVectorDB({ sessionId, url }: useVectorDBProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [status, setStatus] = useState("loading") 

  useEffect(() => {
    IndexUrlToRedisVectorDB(sessionId,url).then((data)=>{
      if (data.status === 200) {
        setStatus("success")
        setMessages(data.messages)
      } else {
        setStatus("error")
        setMessages(data.messages)
      }
    })
  }, [])

  

  return {status, messages};
}

export { useVectorDB };