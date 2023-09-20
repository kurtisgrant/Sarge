import { Message } from "~/types";

export default function Messages({ messages, deleteMessage }: { messages: Message[], deleteMessage: (index: string) => void }) {
    return (
        <div className="flex flex-col p-2 h-[50vh] overflow-auto">
            {messages?.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.type === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                    <div className={`flex flex-col w-4/5`}>
                        <div className={`rounded-xl px-5 py-3 ${message.type === 'assistant' ? 'self-start bg-gray-300 rounded-bl-none' : 'self-end bg-blue-300 rounded-br-none'}`}>
                            <p className={`${message.type === 'assistant' ? 'self-start' : 'self-end'}`}>
                                {message.content}
                            </p>
                            <button onClick={() => message.id && deleteMessage(message.id)} className="self-end opacity-20 hover:opacity-60">x</button>
                        </div>
                        <p className={`italic px-2 ${message.type === 'assistant' ? 'text-left' : 'text-right'}`}>
                            {message.sender} {message.timestamp?.toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}