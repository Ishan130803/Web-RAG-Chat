"use client";

import { useChat } from "ai/react";
import { Messages } from "./Messages";
import { type Message as TMessage } from "ai/react";
import { ChatInput } from "./ChatInput";

const dummyJSONString = `[{"id":"0o2khJA","createdAt":"2024-10-12T08:05:28.670Z","role":"user","content":"hello"},{"id":"AW4UsPW","role":"assistant","content":"Hello! It seems like you're just saying hello. Since we didn't have any specific question or topic to discuss, I'll just acknowledge your greeting. How can I assist you today?","createdAt":"2024-10-12T08:05:31.438Z"}]`;

type ChatwrapperProps = {
  sessionId: string;
  initialMessages: TMessage[];
  namespaceId: string;
};

function Chatwrapper({
  sessionId,
  initialMessages,
  namespaceId,
}: ChatwrapperProps) {
  const { messages, handleInputChange, input, handleSubmit, setInput } =
    useChat({
      api: "/api/chat",
      body: {
        sessionId,
        namespaceId,
      },
      initialMessages: initialMessages,
    });
  console.log(messages);

  const dummy_parsed = JSON.parse(dummyJSONString) as TMessage[];
  return (
    <div className="relative w-full h-screen flex divide-y divide-accent flex-col justify-between mx-auto gap-2">
      <div className="overflow-auto flex justify-center h-full">
        <div className="w-4/5">
          <Messages messages={messages}></Messages>
        </div>
      </div>
      <div className="w-4/5 self-center">
        <ChatInput
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          input={input}
          setInput={setInput}
        ></ChatInput>
      </div>
    </div>
  );
}

export { Chatwrapper };
