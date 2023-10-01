import { Message } from "~/types";

export default function Messages({ messages, deleteMessage }: { messages: Message[], deleteMessage: (index: string) => void }) {
    return (
        <div className="flex flex-col p-3 h-[64vh] gap-1 overflow-auto">
            {messages?.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.type === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                    <div className={`flex flex-col w-4/5 relative`}>
                        <div className={`rounded-xl text-sm px-5 py-2 ${message.type === 'assistant' ? 'self-start bg-gray-300 rounded-bl-none' : 'self-end bg-blue-300 rounded-br-none'}`}>
                            <p className={`${message.type === 'assistant' ? 'self-start' : 'self-end'}`}>
                                {message.content}
                            </p>
                        </div>
                        <button onClick={() => message.id && deleteMessage(message.id)} className="absolute top-0 right-0 m-2 opacity-20 hover:opacity-60">x</button>
                        <p className={`italic text-xs px-1 ${message.type === 'assistant' ? 'text-left' : 'text-right'}`}>
                            {message.sender} {message.timestamp?.toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}