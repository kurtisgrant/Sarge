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

    return (
        <form onSubmit={handleSendMessage} className="flex gap-4 bg-purple-900 p-2 justify-center rounded-b-xl">
            <textarea
                className="rounded-md p-1 w-full bg-grey-300"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                type="submit"
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 self-end"
            >
                Send
            </button>
        </form>
    );
}
