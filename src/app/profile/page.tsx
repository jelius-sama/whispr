import { Button } from "@/components/ui/button";
import MarginedContent from "@/components/ui/margined-content";
import testServerFunction from "@/server/function/test";
import { createServerClient } from "@/server/supabase/edge";
import getUserOrRedirect from "@/utils/get-user";
import { Metadata, ServerRuntime } from "next";

export const runtime: ServerRuntime = 'edge';

export const metadata: Metadata = {
    title: "Profile"
};

export default async function ProfilePage() {
    const { user } = await getUserOrRedirect({ redirectTo: 'sign-in' });
    const greeting = await testServerFunction({ props: { firstName: "Kazuma", honarific: "kun" } });

    return (
        <MarginedContent>
            <p>Profile Page</p>
            <p>{greeting}</p>

            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>

            <p>Username: {user.user_metadata.full_name}</p>
            <p>Created at: {user.created_at}</p>


            <form
                action={async () => {
                    "use server";
                    const supabase = createServerClient();
                    await supabase.auth.signOut();
                }}
            >
                <Button type="submit">Logout</Button>
            </form>
        </MarginedContent>
    );
}
