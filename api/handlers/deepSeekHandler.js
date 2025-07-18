// deepSeekHandler.js
import axios from 'axios';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions'; // Adjust if DeepSeek uses a different path

export const deepSeekHandler = async (messages, temperature = 0.8 ) => {
    try {
        const response = await axios.post(
            DEEPSEEK_ENDPOINT,
            {
                model: 'deepseek-chat',
                messages,
                temperature,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
                },
            }
        );
        console.log('DeepSeek full message content:', JSON.stringify(response.data.choices[0].message, null, 2));
        let reply = response.data.choices?.[0]?.message?.content?.trim();

         const clean = reply
            .replace(/^```json/, '')
            .replace(/^```/, '')
            .replace(/```$/, '')
            .trim();

        return JSON.parse(clean);
    } catch (error) {
        console.error('[DeepSeek API Error]', error?.response?.data || error.message);
        throw new Error('DeepSeek API failed:'+ error);
    }
};