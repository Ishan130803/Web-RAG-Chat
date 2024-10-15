import { Button } from "@nextui-org/react";
import { ArrowRightIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

function Page() {
  const userId = cookies().get("sessionId")?.value!;
  return (
    <div className="w-full h-full font-mono">
      <div className="flex flex-col h-screen w-full items-center justify-center border-b-2 border-border">
        <span className=" text-7xl font-bold self-center">
          This is <span className="text-chart-1">AIWebChat</span>
        </span>
        <span className="self-center text-4xl my-4">
          Chat with Your Websites
        </span>
        <Link href={`/${userId}`} className="contents">
          <Button className="bg-foreground text-background rounded-full self-center my-4 p-4 text-2xl hover:bg-background transition-colors duration-500 hover:text-foreground">
            Login <ArrowRightIcon></ArrowRightIcon>
          </Button>
        </Link>
      </div>
      <div className="w-full min-h-screen h-full p-10 flex flex-col">
        <div className="text-center text-chart-2 text-5xl my-10 row-span-1 col-span-full h-fit ">
          Getting Started
        </div>
        <div className="grid lg:grid-cols-2 w-full h-full">
          <div className=" m-2 p-4 rounded-xl bg-background text-foreground">
            <ul className="list-decimal list-item ml-7">
              <li>Find the Website you want to chat with and copy its url</li>
              <li>Go to addressbar</li>
              <li>
                {`Type `}
                <span className="font-semibold text-chart-1">{`https://www.aiwebchat.vercel.app/chatai/<url>`}</span>
              </li>
              <li>
                Our powerful AI powered by QStash will capture context from
                Website
              </li>
              <li>Chat with the Website!</li>
            </ul>
          </div>
          <div className=" m-2 p-4 rounded-xl bg-background text-foreground">
            <ul className="list-decimal list-item ml-7">
              <li>Find the Website you want to chat with and copy its url</li>
              <li>
                Click on{" "}
                <Link
                  href={`/${userId}`}
                  className="font-bold text-chart-1 underline"
                >
                  Login
                </Link>{" "}
                button you see above
              </li>
              <li>
                You will be greeted with a large input bar in the middle paste
                url there and click on send icon
              </li>
              <li>
                Our powerful AI powered by QStash will capture context from
                Website
              </li>
              <li>Chat with the Website!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
