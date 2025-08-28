/**
 * Use the fine-tuned Nayra model
 */

import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Load the fine-tuned model ID
function getFineTunedModelId() {
    try {
        const config = JSON.parse(
            fs.readFileSync('/Users/aliemami/prod/nayra/android-api/api/prompts/training/model_config.json', 'utf8')
        );
        return config.modelId;
    } catch (error) {
        console.error('No fine-tuned model found. Please run fine-tuning first.');
        return null;
    }
}

export async function callFineTunedNayra(userPrompt) {
    const modelId = getFineTunedModelId();
    
    if (!modelId) {
        throw new Error('No fine-tuned model available');
    }
    
    // With fine-tuned model, you need MUCH LESS in the system prompt
    const messages = [
        {
            role: "system",
            content: "You are Nayra. Respond with a valid JSON object for the tarot reading."
        },
        {
            role: "user",
            content: userPrompt
        }
    ];
    
    const completion = await openai.chat.completions.create({
        model: modelId, // Your fine-tuned model
        messages: messages,
        temperature: 0.85,
        max_tokens: 2000,
    });
    
    return completion.choices[0].message.content;
}

// Update your llmRouter to use fine-tuned model
export async function llmRouterWithFineTuned(model, messages) {
    if (model === 'nayra-finetuned') {
        // Use the fine-tuned model with minimal prompting
        const userContent = messages.find(m => m.role === 'user')?.content;
        const response = await callFineTunedNayra(userContent);
        
        return {
            content: response,
            model: 'fine-tuned-gpt-3.5-turbo'
        };
    }
    
    // Fall back to regular models
    // ... existing llmRouter code
}