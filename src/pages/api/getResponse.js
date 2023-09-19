// pages/api/getResponse.js

import OpenAIApi from "openai";
const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-fr9ZlpszL940huw96Xi3I02W"
});

async function getCompletion(string) {
    console.log('prompt: ', string)
    const completion = await openai.completions.create({
        prompt: string,
        model: "gpt-3.5-turbo-instruct",
        max_tokens: 200,
        stop: "\n\n"
    });
    console.log(completion);
    return completion
}

function promptFromMessages(messages) {
    let prompt = "[You are an accountability coach. Expect your client to check-in with you regularily throughout the day to update you on their progress. Before sending your client off, ensure a check-in time is set for the coming 10-30 minutes. If the user does not check-in before their scheduled time, give them a hard time and make them think you are upset with them.]\n---\n";
    for (let message of messages) {
        const ts = new Date(message.timestamp)
        prompt += `\n\n${message.type} - ${ts.toLocaleString()}: ${message.content}`;
    }
    prompt += `\n\nassistant - ${new Date().toLocaleString()
        }: `
    return prompt;
}

async function getResponse(messages) {
    const prompt = promptFromMessages(messages)
    const completion = await getCompletion(prompt)
    return completion?.choices[0]?.text
}


export default async function handler(req, res) {
    console.log('request received on back end')
    if (req.method === 'POST') {
        const messages = req.body;
        console.log('MESSAGESSSSSSSSS', messages)

        // const messages = JSON.parse(jsonMessages)

        // Call your getResponse function here
        const response = await getResponse(messages);

        res.status(200).json({ response });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}