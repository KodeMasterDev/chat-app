import ChatDialog from '@/components/app/tickets/chat-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatMessage } from '@/types/chat';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ChatComponentProps {
    friendId: number | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ friendId }) => {
    const [messages, setMessages] = useState<ChatMessage[]>();
    useEffect(() => {
        if (!friendId) return;
        axios
            .get(`messages/${friendId}`)
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
            });
    }, [friendId]);
    return (
        <>
            <div className="min-h-1/6 border-b">
                {!friendId && (
                    <div className="flex h-full items-center justify-center p-4 text-sm text-gray-500">Select a user to start chatting</div>
                )}
            </div>
            <div className="flex h-4/6 flex-col gap-6 overflow-y-auto p-4">
                {!friendId ? (
                    <div className="flex h-full items-center justify-center p-4 text-sm text-gray-500">Select a user to start chatting</div>
                ) : (
                    <>
                        {messages ? (
                            messages.map((message: ChatMessage) => {
                                return (
                                    <ChatDialog
                                        key={message.id}
                                        isUser={message.sender_id === friendId}
                                        message={message.message}
                                        time={new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    />
                                );
                            })
                        ) : (
                            <div className="flex h-full items-center justify-center p-4 text-sm text-gray-500">Select a user to start chatting</div>
                        )}
                    </>
                )}
            </div>
            <div className="flex min-h-1/6 flex-col justify-between border-t px-4 py-4">
                <Textarea />
                <div className="flex justify-end">
                    <Button>Send</Button>
                </div>
            </div>
        </>
    );
};

export default ChatComponent;
