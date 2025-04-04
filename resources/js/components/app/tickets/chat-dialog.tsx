import { cn } from '@/lib/utils';

interface ChatDialogProps {
    isUser: boolean;
    message: string;
    time: string;
}

const ChatDialog: React.FC<ChatDialogProps> = ({ isUser, message, time }) => {
    return (
        <div
            className={cn(
                'flex max-w-[75%] flex-col gap-1 rounded-md p-3 text-sm',
                isUser ? 'bg-primary ml-auto pr-4 text-white' : 'mr-auto bg-gray-100 pl-4',
            )}
        >
            <p>{message}</p>
            <span className="mr-auto text-[10px]">{time}</span>
        </div>
    );
};

export default ChatDialog;
