import {
    buildSystemPromptForTarot,
    buildSystemPromptForAnimal,
    buildSystemPromptForDeities,
    buildSystemPromptForOrixas
} from "./prompts/promptsService.js";

import { llmRouter } from './handlers/llmRouter.js';
import * as prompts from "./prompts/promptsService.js";
import { checkAuthAndRateLimit } from './lib/gatekeeper.js';
import {symbolTypes} from "./symbol_types.js";

let isWarmStart = false;
const isProd = false;

export default async function handler(req, res) {
    isWarmStart = true;

        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        const step = req.body.step;

        if (isProd) {
            const auth = checkAuthAndRateLimit(req, step);
            if (!auth.allowed) {
                return res.status(auth.status).json({ error: auth.error });
            }
        }

        // Handle AI interpretation
        const model = req.body.model?.toLowerCase() || "claude";
        const allowedModels = ["openai", "deepseek", "claude"];
        if (!allowedModels.includes(model)) {
            return res.status(400).json({ error: "Invalid model specified" });
        }

        const [promptProps, chatHistory, detectedLanguage] = await makePromptProperties(req.body);
        const type = req.body.symbology;

        let systemPrompt;
        if (type === symbolTypes.animals) {
            systemPrompt = buildSystemPromptForAnimal();
        }
        if (type === symbolTypes.rws || type === symbolTypes.tarot) {
            systemPrompt = buildSystemPromptForTarot();
        }

        if (type === symbolTypes.hindu) {
            systemPrompt = buildSystemPromptForDeities();
        }

        if (type === symbolTypes.orixas) {
            systemPrompt = buildSystemPromptForOrixas();
        }

        let cardName = promptProps.mainCard;
        const userPrompt = prompts.interpretation(
            promptProps.type,
            cardName,
            promptProps.intention,
            promptProps.mood,
            promptProps.userName,
            promptProps.timeLastUsed,
        );

        const messages = [
            { role: "system", content: systemPrompt },
            ...safeChatHistory(chatHistory),
            { role: "user", content: userPrompt }
        ];

    try {
        const result = await llmRouter(model, messages);
        result.mainCard.cardName = cardName+ '';
        result.symbology = type;
        res.status(200).json({ ...result, version: 'n2'});
    } catch (error) {
        const result = await llmRouter('openai', messages);
        result.mainCard.cardName = cardName+ '';
        result.symbology = type;
        res.status(200).json({ ...result, version: 'n2'});

        res.status(500).json({ error: "Server error", details: error.message });
    }
}

function safeChatHistory(history = []) {
    if (history.length > 0 && history[0].role === "assistant") {
        return history.slice(1);
    }
    return history;
}

async function makePromptProperties(body) {
    const {
        step,
        type,
        intention,
        mainCard,
        isReversed,
        mood,
        isTrial = false,
        userName = null,
        timeLastUsed = null,
        poeticLevel = 5,
        chatHistory = []
    } = body;

    return [
        { step, intention, userName, mainCard, isReversed, timeLastUsed, poeticLevel, isTrial, mood, type },
        chatHistory
    ];
}



