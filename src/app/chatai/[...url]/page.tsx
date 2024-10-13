import { redis } from "@/lib/redis";
import { Chatwrapper } from "@/components/Chatwrapper";
import { cookies } from "next/headers";
import { fetchAndGet, fetchAndSave, ragChat } from "@/lib/rag-chat";

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

  const messages = await ragChat.history.getMessages({
    sessionId: sessionId,
    amount: 100,
  });

  if (!isPresent) {
    try {
      await fetchAndSave("/tmp/temp.htm",constructedUrl)
      await ragChat.context.add({
        type: "html",
        options: {
          namespace: sessionId,
        },
        fileSource: "/tmp/temp.htm",
        processor: {
          name: "unstructured",
          options: { apiKey: process.env.UNSTRUCTURED_IO_KEY },
        },
        htmlConfig: {
          maxConcurrency: 2,
        },
      });

      await redis.sadd("indexed-urls", constructedUrl);
      console.log("Here");
    } catch {
      console.log("Failed to Fetch")
    }
  }

  return (
    <div className="w-full h-full">
      <Chatwrapper
        sessionId={sessionId}
        initialMessages={messages}
      ></Chatwrapper>
    </div>
  );
}

export default Page;
