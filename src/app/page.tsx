import Chat from "@/components/layout/chat";
import ChatNav from "@/components/layout/chat-nav";
import MarginedContent from "@/components/ui/margined-content";
import { getSession } from "@/server/auth";
import { Metadata, ServerRuntime } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home"
};

export const runtime: ServerRuntime = 'edge';

export default async function HomePage({ searchParams }: { searchParams: { chat?: string; }; }) {
  const { user } = await getSession();

  if (!user) redirect('/sign-in');

  return (
    <MarginedContent>
      <section className="w-full h-full flex flex-row gap-x-6 fixed">
        <nav className="w-full max-w-80">
          <ChatNav />
        </nav>

        <section className="flex-1 rounded-md bg-primary-foreground">
          {searchParams.chat ? (
            <Chat chatID={searchParams.chat} />
          ) : (
            <div className="w-full h-full place-content-center">
              <p className="text-center font-bold text-xl">Start chatting</p>
            </div>
          )}
        </section>
      </section>
    </MarginedContent>
  );
}
