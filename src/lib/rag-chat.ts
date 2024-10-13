import { RAGChat, upstash } from "@upstash/rag-chat";
import { redis } from "./redis";
import { Message } from "ai";
import fs from "fs"

export const ragChat = new RAGChat({
  model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
  redis: redis,
});

export async function IndexUrlToRedisVectorDB(
  sessionId: string,
  constructedUrl: string
) {
  try {
    const isPresent = await redis.sismember("indexed-urls", constructedUrl);
    const messages = (await ragChat.history.getMessages({
      amount: 10,
      sessionId,
    })) as Message[];
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
    return { status: 200, messages: messages };
  } catch {
    return { status: 500, messages: [] as Message[] };
  }
}

export async function fetchAndSave(fileSource: string, url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    fs.writeFileSync(fileSource, html);
    console.log(`File successfully saved to ${fileSource}`);
  } catch (error) {
    console.error("Error fetching the website", error);
  }
}

export async function fetchAndGet(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    console.log(`File Successfully Extracted`);
    return html as string
  } catch (error) {
    console.error("Error fetching the website", error);
    return ""
  }
}
