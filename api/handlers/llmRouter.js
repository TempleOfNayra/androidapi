// llmRouter.js
import { chatGptHandler } from './chatGptHandler.js';
import { deepSeekHandler } from './deepSeekHandler.js';
import { claudeHandler } from './claudeHandler.js';

export async function llmRouter(provider, messages) {
    switch (provider) {
        case "openai":
            console.log('calling chatGPT');
            return await chatGptHandler(messages);
        case "deepseek":
            return await deepSeekHandler(messages);
        case "claude":
            return await claudeHandler(messages);
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
}
