import { getRequestContext } from "@cloudflare/next-on-pages";
import { createBrowserClient as browserClient, createServerClient as serverClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createServerClient = () => {
  const cookieStore = cookies();
  const { env } = getRequestContext();

  return serverClient(
    env.SUPABASE_URL,
    env.SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

export const createBrowserClient = () =>
  browserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
