import { cn } from '@/lib/utils';
import { User } from '@/types';

interface TicketCardProps extends React.HTMLProps<HTMLDivElement> {
    friend: User;
    friendId: number | null;
    onClick: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ friend, friendId, onClick }) => {
    return (
        <div
            key={friend.id}
            className={cn('flex cursor-pointer items-center justify-between rounded-lg border bg-white p-4 shadow-sm', {
                'bg-neutral-900': friendId === friend.id,
            })}
            onClick={onClick}
        >
            <div className="flex items-center">
                <div className="ml-4">
                    <p
                        className={cn('text-sm font-medium text-gray-900', {
                            'text-white': friendId === friend.id,
                        })}
                    >
                        {friend.id + ' - ' + friend.name}
                    </p>
                    <p
                        className={cn('text-sm text-gray-500', {
                            'text-white': friendId === friend.id,
                        })}
                    >
                        {friend.email}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
