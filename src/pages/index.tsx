import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Message } from "~/types"
import Messages from "~/components/Messages"
import ComposeMsgArea from "~/components/ComposeMsgArea";

export default function Home() {
  const { data: sessionData } = useSession();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'John',
      content: 'I am looking for a routine that can help me build muscle mass. I have been working out for a while but not seeing significant results. Can you suggest a routine that can help me achieve my goals? I am open to trying different types of workouts.',
      type: 'user',
      timestamp: new Date()
    },
    {
      sender: 'ai',
      content: 'Absolutely, John. I would recommend incorporating compound exercises into your routine. These exercises target multiple muscle groups at once and can help you build muscle mass. You could try exercises like squats, deadlifts, and bench presses. Remember, consistency is key in seeing results.',
      type: 'ai',
      timestamp: new Date()
    },
  ]);

  const submitUserMessage = (message: string) => {
    setMessages(prevMessages => [
      ...prevMessages,
      {
        sender: sessionData?.user?.name || 'User',
        content: message,
        type: 'user',
        timestamp: new Date()
      }
    ]);
  };


  return (
    <>
      <Head>
        <title>Sarge</title>
        <meta name="description" content="An accountability coach chatbot driven by AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Sarge<span className="text-[hsl(280,100%,70%)]">.ai</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-full h-1/2 bg-gray-100 rounded-xl">
                <Messages messages={messages} />
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

