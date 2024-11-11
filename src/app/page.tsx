import Chat from "@/components/layout/chat";
import ChatNav from "@/components/layout/chat-nav";
import MarginedContent from "@/components/ui/margined-content";
import { getSession } from "@/server/auth";
import { Metadata, ServerRuntime } from "next";

export const metadata: Metadata = {
  title: "Home"
};

export const runtime: ServerRuntime = 'edge';

export default async function HomePage() {
  const { user } = await getSession();

  return (
    <MarginedContent>
      <section className="w-full h-full flex flex-row gap-x-6 fixed">
        <nav className="w-full max-w-80">
          <ChatNav />
        </nav>

        <section className="flex-1 rounded-md bg-primary-foreground">
          <Chat />
        </section>
      </section>
    </MarginedContent>
  );
}
