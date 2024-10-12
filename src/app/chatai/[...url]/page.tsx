import { redis } from "@/lib/redis";
import { Chatwrapper } from "@/components/Chatwrapper";
import { cookies } from "next/headers";
import { ragChat } from "@/lib/rag-chat";

type PageProps = {
  params: {
    url: string | string[] | undefined;
  };
};

function reconstructUrl(url: string[]) {
  const decodedComponents = url.map((value) => decodeURIComponent(value));
  return decodedComponents.join("/");
}

async function Page({ params }: PageProps) {
  const sessionCookie = cookies().get("sessionId")?.value;

  const constructedUrl = reconstructUrl(params.url as string[]);

  const isPresent = await redis.sismember("indexed-urls", constructedUrl);

  const sessionId = (constructedUrl + "--" + sessionCookie).replace(/\//g, "");

  const messages = await ragChat.history.getMessages({ amount: 10, sessionId });

  if (!isPresent) {
    await ragChat.context.add({
      type: "html",
      source: constructedUrl,
      config: {
        chunkOverlap: 50,
        chunkSize: 200,
      },
    });

    await redis.sadd("indexed-urls", constructedUrl);
  }

  return (
    <Chatwrapper sessionId={sessionId} initialMessages={messages}></Chatwrapper>
  );
}

export default Page;
