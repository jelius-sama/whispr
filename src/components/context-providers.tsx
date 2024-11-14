"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { useAtom } from "jotai";
import { User, userAtom } from "@/components/atoms";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { UserMetadata } from "@/types";

export interface ContextProvidersProps extends ThemeProviderProps {
    user: User | null;
}

export function ContextProviders({ children, user, ...props }: ContextProvidersProps) {
    const [userState, setUserState] = useAtom(userAtom);

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
    }, [user]);

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
