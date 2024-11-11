import React from 'react';
import { UserCircle2 } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cssVars } from '@/app.config';

export default function ChatNav() {
    return (
        <ScrollArea className='w-full pr-[10px]' style={{ height: `calc(100vh - ${cssVars.headerPx + (8 * 2) + 16}px)` }}>
            {Array.from({ length: 50 }).map((_, index) => (
                <Button key={index} asChild variant="secondary" className="justify-start [&_svg]:size-8 w-full h-auto my-2">
                    <Link href={"#"}>
                        <div className="flex flex-row w-full items-center justify-start gap-x-2">
                            <UserCircle2 />
                            <span>
                                <p className="font-bold text-lg">Kazuma Sato</p>
                                <p className="text-muted-foreground">See you tommorow</p>
                            </span>
                        </div>
                    </Link>
                </Button>
            ))}
        </ScrollArea>
    );
}
