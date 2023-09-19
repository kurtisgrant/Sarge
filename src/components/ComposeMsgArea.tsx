import { useState } from "react"

export default function ComposeMsgArea({ sendMessage }: { sendMessage: (message: string) => void }) {
    const [message, setMessage] = useState("");

    const handleSendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        if (message.trim() !== "") {
            sendMessage(message);
            setMessage("");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage(event as any);
        }
    };

    return (
        <form onSubmit={handleSendMessage} className="flex gap-4 bg-[hsl(280,100%,40%)] p-2 justify-center rounded-b-xl">
            <textarea
                className="rounded-md p-1 w-full bg-grey-300"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                type="submit"
                className="rounded-full bg-white/20 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/30 self-end"
            >
                Send
            </button>
        </form>
    );
}
