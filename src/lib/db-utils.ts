"use server"
import { redis } from "./redis";
import { fetchAndSave, ragChat } from "./rag-chat";

export async function createUser(userId: string) {
  await redis.hsetnx("users", userId, {
    userId: userId,
    username: "username",
  });
}

export async function createChat(chatId: string, chatHeading : string = "New Chat") {
  await redis.hsetnx("chats", chatId, {
    chatId: chatId,
    chatHeading,
  });
}

export async function createUserChatLink(userId: string, chatId: string, chatHeading:string = "New Chat") {
  await createUser(userId);
  await createChat(chatId, chatHeading);
  await redis.rpush(`user_has_chats-${userId}`, chatId);
}

export async function createNamespaceUrl(namespace: string, url: string) {
  await redis.hset("url_has_namespace", { [url]: namespace });
}

export async function createChatNamespaceLink(
  chatId: string,
  namespaceId: string
) {
  await redis.hset("chat_has_namespace", { [chatId]: namespaceId });
}

export async function getUserChatMetaData(userId: string) {
  try {
    if (!redis.hexists("users", userId)) {
      throw new Error(`UserId ${userId} not present`);
    }

    const chatIds = await redis.lrange(`user_has_chats-${userId}`, 0, -1) ?? [];
    const chatMetaData = (chatIds.length && await redis.hmget("chats", ...chatIds)) ?? {};
    return chatMetaData;
  } catch (error) {
    console.error(error);
  }
}

export async function createIndexAndGetChatId(userId: string, url: string) {
  let namespaceId: string;

  if (await redis.hexists("url_has_namespace", url)) {
    namespaceId = (await redis.hget("url_has_namespace", url))!;
  } else {
    namespaceId = crypto.randomUUID();
    await fetchAndSave(process.cwd() + "/tmp/temp.htm", url);
    await ragChat.context.add({
      type: "html",
      fileSource: process.cwd() + "/tmp/temp.htm",
      options: {
        namespace: namespaceId,
      },
      processor: {
        name: "unstructured",
        options: { apiKey: process.env.UNSTRUCTURED_IO_KEY },
      },
      htmlConfig: {
        maxConcurrency: 2,
      },
    });
    await createNamespaceUrl(namespaceId, url);
  }
  const chatId = crypto.randomUUID();
  await createChatNamespaceLink(chatId, namespaceId);
  await createUserChatLink(userId, chatId, url);
  return { namespaceId, chatId };
}


export async function deleteChat(chatId:string) {
  console.log("error here 1")
  await redis.hdel("chats", chatId)
  console.log("error here 2")
  await redis.hdel("chat_has_namespace", chatId)
}

export async function deleteUserChat(userId:string, chatId:string) {
  await deleteChat(chatId)
  console.log("error here 3")
  await redis.lrem(`user_has_chats-${userId}`,1,chatId)
  console.log("error here 4")
  
}