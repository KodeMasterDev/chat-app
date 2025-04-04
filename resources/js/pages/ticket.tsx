import ChatComponent from '@/components/app/chat/chat-component';
import TicketCard from '@/components/app/chat/ticket-card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Ticket({ friends }: { friends: User[] }) {
    const [friendId, setFriendId] = React.useState<number | null>(null);

    const handleSelectFriend = (id: number) => {
        setFriendId(id);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <section className="grid flex-grow grid-cols-6">
                <div className="col-span-1 h-full border-r bg-white"></div>
                <div className="col-span-2 flex flex-col gap-2 overflow-y-scroll border-r bg-white p-2">
                    {friends.map((friend: User) => (
                        <TicketCard key={friend.id} friend={friend} friendId={friendId} onClick={() => handleSelectFriend(friend.id)} />
                    ))}
                </div>
                <div className="col-span-3 flex flex-col justify-center border-r bg-white">
                    <ChatComponent friendId={friendId} />
                </div>
            </section>
        </AppLayout>
    );
}
