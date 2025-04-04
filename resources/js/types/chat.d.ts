export interface ChatMessage {
    id: number;
    sender_id: number;
    receiver_id: number;
    sender: User;
    receiver: User;
    message: string;
    created_at: string;
}
