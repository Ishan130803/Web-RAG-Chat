import { Chatwrapper } from "@/components/Chatwrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";

type pageProps = {
  params: {
    sessionid: string;
    chatid: string;
  };
};

async function page({ params }: pageProps) {
  const sessionId = params.sessionid + "--" + params.chatid;
  const namespaceId: string = (await redis.hget(
    "chat_has_namespace",
    params.chatid
  ))!;

  const messages = await ragChat.history.getMessages({
    sessionId: sessionId,
    amount: 100,
  });

  console.log("namespaceId Fetched");
  return (
    <Chatwrapper
      initialMessages={messages}
      sessionId={sessionId}
      namespaceId={namespaceId}
    ></Chatwrapper>
  );
}

export default page;
