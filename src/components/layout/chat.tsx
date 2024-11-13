import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { SendHorizonalIcon, UserCircle2Icon } from 'lucide-react';
import { cssVars } from '@/app.config';
import { DateUtils } from '@/utils/DateUtils';

export const dummyDatas = [
    {
        id: 'RH2AiByaRvBqzxac43oq1a5yZn1QH1KLJrxRd8yNbWs',
        username: 'Kazuma Sato'
    },
    {
        id: 'O5BpFtIOQr3PnsVTlTznQ94x3xsZ1/NC46JefEbT2ns',
        username: 'Kana Arima'
    },
    {
        id: 'hBvOCvUdyBIglabvBruB1I13rEQ41aDqbzczScpv4q0',
        username: 'Turbo granny'
    },
    {
        id: 'wYwtSLTxr9ve2qXaIkwMh6leKcPZsU9XMck5hQQN6aE',
        username: 'Okarun'
    },
    {
        id: 'WM7AZ6y4OjYu9HDGxK0ovzMtgf0eAVQSSygCnRRTlCs',
        username: 'Ayase Momo'
    },
];

const self: React.CSSProperties = { alignItems: 'self-end' };
const other: React.CSSProperties = { alignItems: 'self-start' };

export default function Chat({ isGroupChat = false, chatID }: { isGroupChat?: boolean; chatID: string; }) {
    const chat = dummyDatas.find(chats => chats.id === chatID);

    return chat ? (
        <React.Fragment>
            <div className='w-full flex flex-row gap-x-2 h-10 bg-primary-foreground rounded-md items-center pl-4'>
                <Button variant={'ghost'}>
                    <UserCircle2Icon />
                    <p className='font-bold'>{chat.username}</p>
                </Button>
            </div>
            <div className='w-full px-4 relative' style={{ height: `calc(100vh - ${cssVars.headerPx + (8 * 2) + 16 + 40}px)` }}>

                <ScrollArea className='w-full h-full p-4' style={{ height: `calc(100vh - ${cssVars.headerPx + (24 * 2) + 20 + 40}px)` }}>
                    {Array.from({ length: 50 }).map((_, index) => (
                        <div key={index} className='flex flex-col mb-4 w-full' style={Math.round(Math.random()) === 0 ? self : other}>
                            {isGroupChat && (
                                <span id='metadata' className='flex flex-row mb-1 gap-x-1 items-center'>
                                    <p className='text-sm text-muted-foreground'>@Kazuma Sato</p>
                                </span>
                            )}
                            <span id='msg' className='flex flex-col bg-secondary w-fit rounded-md px-[10px] py-[5px]'>
                                <p>Hello!</p>
                                <p className='text-muted-foreground text-xs'>{DateUtils.toLocalDateTimeString(new Date())}</p>
                            </span>
                        </div>
                    ))}
                </ScrollArea>

                <div className='absolute bottom-4 w-[calc(100%_-_((8px_*_2)_*_2))]'>
                    <span className='w-full flex flex-row gap-x-2'>
                        <textarea
                            placeholder='Type your message...'
                            className='w-full resize-none h-10 max-h-20 rounded-sm items-center place-content-center px-2 text-start'
                        />
                        <Button variant={'secondary'}>
                            <SendHorizonalIcon />
                        </Button>
                    </span>
                </div>
            </div>
        </React.Fragment>
    ) : (
        <React.Fragment>
            <div className="w-full h-full place-content-center">
                <p className="text-center font-bold text-xl">Chat not found.</p>
            </div>
        </React.Fragment>
    );
}
