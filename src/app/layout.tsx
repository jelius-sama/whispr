import type { Metadata, ServerRuntime } from "next";
import "@/styles/globals.css";
import { ContextProviders } from "@/components/context-providers";
import Sidenav from "@/components/layout/sidenav";
import { Toaster } from "@/components/ui/sonner";
import appConfig from "@/app.config";
// import { createServerClient } from "@/server/supabase/create-client";
import { User } from "@/components/atoms";

export const metadata: Metadata = {
  title: {
    default: appConfig.title,
    template: `%s - ${appConfig.title}`,
  },
  description: appConfig.description,
  icons: appConfig.icons,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const supabase = createServerClient();
  // const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ContextProviders
          user={null as User | null}
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidenav />
          {children}
          <Toaster />
        </ContextProviders>
      </body>
    </html >
  );
}
