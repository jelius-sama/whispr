import { getRequestContext } from '@cloudflare/next-on-pages';
import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const createMiddlewareClient = (request: NextRequest) => {
    const { env } = getRequestContext();
    // Create an unmodified response
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        env.SUPABASE_URL,
        env.SUPABASE_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value }) => {
                            request.cookies.set(name, value);
                        });
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );

    return { supabase, response };
};