import { createServerClient } from '@/server/supabase/edge';
import { ServerRuntime } from 'next';
import { NextResponse } from 'next/server';

export const runtime: ServerRuntime = 'edge';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const supabase = createServerClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin);
}