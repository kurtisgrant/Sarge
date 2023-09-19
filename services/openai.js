// import OpenAIApi from "openai";
// const openai = new OpenAIApi({
//     apiKey: process.env.OPENAI_API_KEY,
//     organization: "org-fr9ZlpszL940huw96Xi3I02W",
// });

// async function getCompletion(string) {
//     const completion = await openai.completions.create({
//         prompt: string,
//         model: "gpt-3.5-turbo-instruct",
//     });
//     console.log(completion);
//     return completion
// }

// function promptFromMessages(messages) {
//     let prompt = "";
//     for (let message of messages) {
//         prompt += `\n${message.type} - ${message.timestamp?}: ${message.content}`;
//     }
//     prompt += '\nassistant: '
//     return prompt;
// }

// export async function getResponse(messages) {
//     const prompt = promptFromMessages(messages)
//     const completion = await getCompletion(prompt)
//     return completion?.choices[0]?.text
// }