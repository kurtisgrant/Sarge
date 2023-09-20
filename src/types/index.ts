export interface Message {
    id?: string;
    sender: string;
    content: string;
    type: 'user' | 'assistant';
    timestamp?: Date;
}
