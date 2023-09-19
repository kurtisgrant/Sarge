import { Message } from "~/types";

export default function Messages({ messages }: { messages: Message[] }) {
    return (
        <div className="flex flex-col p-2 h-80 overflow-auto">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${message.type === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                    <div className={`flex flex-col w-4/5`}>
                        <div className={`rounded-xl px-5 py-3 ${message.type === 'assistant' ? 'self-start bg-gray-300 rounded-bl-none' : 'self-end bg-blue-300 rounded-br-none'}`}>
                            <p className={`${message.type === 'assistant' ? 'self-start' : 'self-end'}`}>
                                {message.content}
                            </p>
                        </div>
                        <p className={`italic px-2 ${message.type === 'assistant' ? 'text-left' : 'text-right'}`}>
                            {message.sender} {message.timestamp.toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}