import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Message } from "~/types"
import Messages from "~/components/Messages"
import ComposeMsgArea from "~/components/ComposeMsgArea";
import { api } from "~/utils/api";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const { data: sessionData } = useSession();
  const { data: messages, refetch } = api.endpoints.getMessages.useQuery();

  const addMessageMutation = api.endpoints.addMessage.useMutation();
  const deleteMessageMutation = api.endpoints.deleteMessage.useMutation();

  const submitUserMessage = async (message: string) => {
    const newMessage: Message = {
      sender: sessionData?.user?.name || 'User',
      content: message,
      type: 'user'
    };
    await addMessageMutation.mutateAsync(newMessage);
    refetch();

    // Send the user message to the server and get the response
    const response = await fetch('/api/getResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...(messages || []), newMessage])
    });

    const reply = await response.json();

    const newResponse: Message = {
      sender: 'Builder Bot',
      content: reply.response,
      type: 'assistant'
    }
    await addMessageMutation.mutateAsync(newResponse);
    refetch();
  };

  const deleteMessage = (index: string) => {
    deleteMessageMutation.mutateAsync({ index }).then(() => refetch());
  };

  return (
    <>
      <Head>
        <title>getbuilding</title>
        <meta name="description" content="An accountability coach chatbot driven by AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-around bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container h-full flex flex-col items-center justify-around gap-5 px-4 py-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mt-0 mb-auto">
            getbuilding<span className="text-[hsl(280,100%,70%)]">.ai</span>
          </h1>
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex flex-col items-center justify-center gap-4 w-full">
              <div className="w-full h-3/4 bg-gray-100 rounded-xl">
                <Messages messages={messages as Message[]} deleteMessage={deleteMessage} />
                <ComposeMsgArea sendMessage={submitUserMessage} />
              </div>

              <div className="flex items-center justify-center">
                <p className="text-center text-l text-white mr-4">
                  {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
                </p>
                <button
                  className="rounded-full bg-white/10 px-10 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={sessionData ? () => void signOut() : () => void signIn()}
                >
                  {sessionData ? "Sign out" : "Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}


