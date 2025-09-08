import { buildSystemPromptForReflection } from "./prompts/systemPromptReflection.js";
import { buildReflectionPrompt } from "./prompts/reflectionPrompt.js";
import { llmRouter } from '../handlers/llmRouter.js';
import { checkAuthAndRateLimit } from '../lib/gatekeeper.js';
import {interpretation} from "../prompts/promptsService.js";

const isProd = false;

export default async function handler(req, res) {
    
    res.setHeader('Access-Control-Allow-Origin', 'https://www.nayra.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

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

    // Handle AI interpretation for iOS (reflection-based, not fortune-telling)
    const model = req.body.model?.toLowerCase() || "claude";
    const allowedModels = ["openai", "deepseek", "claude"];
    if (!allowedModels.includes(model)) {
        return res.status(400).json({ error: "Invalid model specified" });
    }

    const promptProps = makePromptPropertiesForReflection(req.body);
    const systemPrompt = buildSystemPromptForReflection(promptProps.symbology);

    const userPrompt = buildReflectionPrompt(
        promptProps.cards,
        promptProps.symbology,
        promptProps.journalEntry,
        promptProps.intention,
        promptProps.wisdomStyle,
        promptProps.spiritualityLevel,
        promptProps.lifeChapter,
        promptProps.userName,
        promptProps.language
    );

    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
    ];

    try {
        const result = await llmRouter(model, messages);
        result.symbology = promptProps.symbology;
        result.cards = promptProps.cards;
        
        console.log('\n=== iOS REFLECTION API INPUT ===');
        console.log('  Cards:', promptProps.cards);
        console.log('  Symbology:', promptProps.symbology);
        console.log('  Journal Entry:', promptProps.journalEntry?.substring(0, 100) + '...');
        console.log('  Wisdom Style:', promptProps.wisdomStyle);
        console.log('  Spirituality Level:', promptProps.spiritualityLevel);
        console.log('  Life Chapter:', promptProps.lifeChapter);
        console.log('\n=== iOS REFLECTION API RESULT ===');
        console.log('  INTERPRETATION', result);


        res.status(200).json({ ...result, version: 'ios-reflection-v1'});
    } catch (error) {
        console.log('=== ERROR WITH PRIMARY MODEL ===');
        console.log(error);
        try {
            // Fallback to OpenAI
            const result = await llmRouter('openai', messages);
            result.symbology = promptProps.symbology;
            result.cards = promptProps.cards;

            res.status(200).json({ ...result, version: 'ios-reflection-v1'});
        } catch(error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }
}

function makePromptPropertiesForReflection(body) {
    const {
        step,
        intention,
        cards = [],
        symbology = 'wisdom',
        journalEntry = '',
        wisdomStyle = null,
        spiritualityLevel = null,
        lifeChapter = null,
        language = 'en',
        userName = null,
        isTrial = false
    } = body;

    return { 
        step, 
        language, 
        intention, 
        userName, 
        cards,
        symbology,
        journalEntry,
        wisdomStyle,
        spiritualityLevel,
        lifeChapter,
        isTrial
    };
}