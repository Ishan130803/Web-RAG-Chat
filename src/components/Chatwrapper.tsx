"use client";

import { useChat } from "ai/react";
import { Messages } from "./Messages";
import { type Message as TMessage } from "ai/react";
import { ChatInput } from "./ChatInput";

const dummyJSONString = `[{"id":"0o2khJA","createdAt":"2024-10-12T08:05:28.670Z","role":"user","content":"hello"},{"id":"AW4UsPW","role":"assistant","content":"Hello! It seems like you're just saying hello. Since we didn't have any specific question or topic to discuss, I'll just acknowledge your greeting. How can I assist you today?","createdAt":"2024-10-12T08:05:31.438Z"}]`;

type ChatwrapperProps = {
  sessionId: string;
  initialMessages: TMessage[];
};

function Chatwrapper({ sessionId, initialMessages }: ChatwrapperProps) {
  const { messages, handleInputChange, input, handleSubmit, setInput } =
    useChat({
      api: "/api/chat",
      body: {
        sessionId,
      },
      initialMessages: initialMessages,
    });
  const dummy_parsed = JSON.parse(dummyJSONString) as TMessage[];
  return (
    <div className="relative h-screen flex divide-y divide-zinc-700 flex-col justify-between w-4/5 mx-auto gap-2">
      <div className="flex-1 justify-between flex flex-col overflow-auto">
        <Messages messages={messages}></Messages>
      </div>
      <ChatInput
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
      ></ChatInput>
    </div>
  );
}

export { Chatwrapper };
