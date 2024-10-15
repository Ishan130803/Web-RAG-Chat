import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "../lib/utils";
import { Providers } from "@/components/providers/Providers";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AIWebChat",
  description:
    "A minimalist web app to chat with your websites with the help of RAG. A Smat chatbot for websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="favicon.ico"
        />
      </head>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          `antialiased min-h-screen`
        )}
      >
        <Providers>
          <ThemeToggleButton className="fixed right-0 top-0 m-2"></ThemeToggleButton>

          <main className="h-screen w-screen text-foreground bg-secondary overflow-y-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
