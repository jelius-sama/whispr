"use client";

import React from 'react';
import { UserCircle2 } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cssVars } from '@/app.config';
import { useSearchParams } from 'next/navigation';
import { dummyDatas } from '@/components/layout/chat';


export default function ChatNav() {
    const searchParams = useSearchParams();

    return (
        <ScrollArea className='w-full pr-[10px]' style={{ height: `calc(100vh - ${cssVars.headerPx + (8 * 2) + 16}px)` }}>
            {dummyDatas.map((data, index) => (
                <Button key={index} asChild variant={searchParams.get('chat') === data.id ? "secondary" : "outline"} className="justify-start [&_svg]:size-8 w-full h-auto my-2">
                    <Link href={`/?chat=${data.id}`}>
                        <div className="flex flex-row w-full items-center justify-start gap-x-2">
                            <UserCircle2 />
                            <span>
                                <p className="font-bold text-lg">{data.username}</p>
                                <p className="text-muted-foreground">See you tommorow</p>
                            </span>
                        </div>
                    </Link>
                </Button>
            ))}
        </ScrollArea>
    );
}
