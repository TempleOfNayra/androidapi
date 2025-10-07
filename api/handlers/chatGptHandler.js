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

        // Try to parse as JSON first
        try {
            return JSON.parse(cleanedContent);
        } catch (parseError) {
            // If not JSON, return raw text wrapped in content field
            console.log('Returning raw text response from OpenAI (not JSON)');
            return { content: cleanedContent };
        }
    } catch (err) {
        throw new Error('Failed to fetch from ChatGPT');
    }
}