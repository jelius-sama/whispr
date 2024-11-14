import { User } from "@/components/atoms";
import { createServerClient } from "@/server/supabase/create-client";
import { UserMetadata } from "@/types";
import { redirect, RedirectType } from "next/navigation";

export default async function getUserOrRedirect({ redirectTo }: { redirectTo: 'home' | 'sign-in'; }): Promise<{ user: User; } | never> {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (redirectTo === 'home' && user) return redirect('/', RedirectType.replace);
    if (redirectTo === 'sign-in' && !user) return redirect('/', RedirectType.replace);

    if (!user) throw new Error("User not found but could not redirect.");

    return {
        user: {
            ...user,
            user_metadata: user.user_metadata as UserMetadata,
        },
    };
}