export interface Message {
    sender: string;
    content: string;
    type: 'user' | 'assistant';
    timestamp: Date;
}

