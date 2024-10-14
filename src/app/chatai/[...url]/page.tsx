import { redis } from "@/lib/redis";
import { Chatwrapper } from "@/components/Chatwrapper";
import { cookies } from "next/headers";
import { fetchAndGet, fetchAndSave, ragChat } from "@/lib/rag-chat";
import { permanentRedirect, redirect } from "next/navigation";
import { createIndexAndGetChatId } from "@/lib/db-utils";

function reconstructUrl(url: string[]) {
  const decodedComponents = url.map((value) => decodeURIComponent(value));
  return decodedComponents.join("/");
}

type PageProps = {
  params: { url: string | string[] | undefined };
};

async function Page({ params }: PageProps) {
  console.log(params);
  const sessionCookie = cookies().get("sessionId")?.value!;

  const constructedUrl = reconstructUrl(params.url as string[]);

  const {chatId, namespaceId} = await createIndexAndGetChatId(sessionCookie, constructedUrl)

  await new Promise((res, rej) => setTimeout(res, 2000));

  permanentRedirect(`/${sessionCookie}/${chatId}`);
}

export default Page;
