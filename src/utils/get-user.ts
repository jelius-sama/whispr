import { UserMetadata } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { redirect, RedirectType } from "next/navigation";

export default async function getUser(supabase: SupabaseClient<any, "public", any>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/sign-in', RedirectType.replace);

    return { user: user, user_metadata: (user.user_metadata as UserMetadata) };
}