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
        const cleanedContent = content.trim()
            .replace(/^```json\s*\n?/g, '')
            .replace(/^```\s*\n?/g, '')
            .replace(/\n?```\s*$/g, '')
            .trim();

        return JSON.parse(cleanedContent);
    } catch (err) {
        throw new Error('Failed to fetch from ChatGPT');
    }
}