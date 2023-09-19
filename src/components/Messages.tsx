import { Message } from "~/types";

export default function Messages({ messages }: { messages: Message[] }) {
    return (
        <div className="flex flex-col p-2">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                    <div className={`flex flex-col w-4/5`}>
                        <div className={`rounded-xl px-5 py-3 ${message.type === 'ai' ? 'self-start bg-gray-300 rounded-bl-none' : 'self-end bg-blue-300 rounded-br-none'}`}>
                            <p className={`${message.type === 'ai' ? 'self-start' : 'self-end'}`}>
                                {message.content}
                            </p>
                        </div>
                        <p className={`italic px-2 ${message.type === 'ai' ? 'text-left' : 'text-right'}`}>
                            {message.sender}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}