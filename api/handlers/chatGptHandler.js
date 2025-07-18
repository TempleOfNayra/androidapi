import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function chatGptHandler(messages, model = 'gpt-4o') {
    try {
        const response = await openai.chat.completions.create({
            model,
            messages,
            temperature: 0.9,
        });

        const content = response.choices?.[0]?.message?.content || '';
        console.error('RAW CHAT GPT RESPONSE:', content);
        return JSON.parse(content);
    } catch (err) {
        console.error('ChatGPT Error:', err);
        throw new Error('Failed to fetch from ChatGPT');
    }
}