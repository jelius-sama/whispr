"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from "@/components/theme-toggle";
import React, { useEffect, useState } from 'react';
import { LogInIcon, MessageCircleIcon, SettingsIcon, UserCircle2Icon, UserPlus2Icon } from 'lucide-react';
import { SheetClose } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { userAtom } from '@/components/atoms';
import { useAtomValue } from 'jotai';
import { cssVars } from '@/app.config';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getSession, User } from '@/server/auth';

export default function NavItems() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        (async function () {
            try {
                const { user } = await getSession();
                setUser(user);
            } catch (error) {
                setUser(null);
            }
        })();
    }, []);

    return (
        <div className='flex flex-col gap-y-2'>
            <NavItem href='/' title='Chats' icon={<MessageCircleIcon />} />

            {user && (
                <NavItem href='/profile' title='Profile' icon={<UserCircle2Icon />} />
            )}

            {!user && (
                <React.Fragment>
                    <NavItem href='/sign-in' title='Sign in' icon={<LogInIcon />} />

                    <NavItem href='/sign-up' title='Sign up' icon={<UserPlus2Icon />} />
                </React.Fragment>
            )}

            <NavItem href='/settings' title='Settings' icon={<SettingsIcon />} />
        </div>
    );
}


export function UserProfile() {
    const user = useAtomValue(userAtom);

    return (
        <div className='flex flex-row gap-2'>
            <ThemeToggle borderRadius='full' />

            {/* To-Do: Add valid image link of the user */}
            <Button asChild className='w-10 h-10 rounded-full [&_svg]:size-6 bg-background hover:bg-background'>
                <Link href={user ? '/profile' : '/sign-in'}>
                    <Avatar className='w-10 h-10 bg-background' style={{ border: '1px solid hsl(240, 3.7%, 15.9%)' }}>
                        {user ? (
                            <>
                                <AvatarImage src={'https://github.com/shadcn.png'} width={cssVars.headerPx} height={cssVars.headerPx} alt={user.username} />
                                <AvatarFallback className='bg-background'><UserCircle2Icon className='text-foreground' /></AvatarFallback>
                            </>
                        ) : (
                            <AvatarFallback className='bg-background'><UserCircle2Icon className='text-foreground' /></AvatarFallback>
                        )}
                    </Avatar>
                </Link>
            </Button>
        </div>
    );
}

export function NavItem({ href, title, icon }: { href: string; title: string; icon: React.JSX.Element; }) {
    const path = usePathname();

    return (
        <SheetClose asChild>
            <Button variant={path === href ? 'secondary' : 'outline'} asChild className='w-full justify-start'>
                <Link href={href}>
                    {icon}
                    {title}
                </Link>
            </Button>
        </SheetClose>
    );
}