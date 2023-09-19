import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Message } from "~/types"
import Messages from "~/components/Messages"
import ComposeMsgArea from "~/components/ComposeMsgArea";

export default function Home() {
  const { data: sessionData } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);

  const submitUserMessage = async (message: string) => {
    const newMessage: Message = {
      sender: sessionData?.user?.name || 'User',
      content: message,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prevMessages => [
      ...prevMessages,
      newMessage
    ]);

    // Send the user message to the server and get the response
    const response = await fetch('/api/getResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, newMessage])
    });

    const reply = await response.json();
    console.log('reply: ', reply)

    setMessages(prevMessages => [
      ...prevMessages,
      {
        sender: 'Sarge',
        content: reply.response,
        type: 'assistant',
        timestamp: new Date()
      }
    ]);
  };

  const deleteMessage = (index: number) => {
    setMessages(prevMessages => prevMessages.filter((_, i) => i !== index));
  };

  return (
    <>
      <Head>
        <title>Sarge</title>
        <meta name="description" content="An accountability coach chatbot driven by AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Sarge<span className="text-[hsl(280,100%,70%)]">.ai</span>
          </h1>
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              <div className="w-full h-1/2 bg-gray-100 rounded-xl">
                <Messages messages={messages} deleteMessage={deleteMessage} />
                <ComposeMsgArea sendMessage={submitUserMessage} />
              </div>

              <p className="text-center text-2xl text-white">
                {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
              </p>
              <button
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                onClick={sessionData ? () => void signOut() : () => void signIn()}
              >
                {sessionData ? "Sign out" : "Sign in"}
              </button>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}


