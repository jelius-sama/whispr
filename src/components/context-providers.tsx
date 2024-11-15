"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { useAtom } from "jotai";
import { User, userAtom } from "@/components/atoms";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { UserMetadata } from "@/types";
import { createBrowserClient } from "@/server/supabase/client";

export interface ContextProvidersProps extends ThemeProviderProps {
}

export function ContextProviders({ children, ...props }: ContextProvidersProps) {
    const [userState, setUserState] = useAtom(userAtom);
    const supabase = createBrowserClient();
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        (async () => {
            setUser((await supabase.auth.getUser()).data.user as User | null);
        })();
    }, [supabase.auth]);

    React.useEffect(() => {
        if (!user) {
            setUserState({ user: null });
            return;
        }

        setUserState({
            user: {
                ...user,
                user_metadata: user.user_metadata as UserMetadata,
            },
        });
    }, [user, setUserState]);

    return (
        <NextThemesProvider {...props}>
            {userState.user === undefined ? (
                <section className="w-screen h-screen flex flex-col items-center gap-y-4 justify-center">
                    <Image src={'/assets/favicon.ico'} alt="icon" height={100} width={100} className="size-16 animate-deep-pulse" />
                    <Spinner size={'large'} />
                </section>
            ) : <>{children}</>}
        </NextThemesProvider>
    );
}
