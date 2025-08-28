import { buildSystemPromptForMultiCardTarot } from "../prompts/systems/systemPromptV2.js";
import { interpretationV2 } from "../prompts/interpretationV2.js";
import { llmRouter } from '../handlers/llmRouter.js';
import { checkAuthAndRateLimit } from '../lib/gatekeeper.js';

let isWarmStart = false;
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

    const [promptProps, chatHistory] = await makePromptPropertiesV2(req.body);
    const systemPrompt = buildSystemPromptForMultiCardTarot(promptProps.pageNames);

    // V2: Handle multiple cards with their positions
    const userPrompt = interpretationV2(
        promptProps.cards,  // Array of cards
        promptProps.pageNames,  // Array of position names
        promptProps.language,
        promptProps.intention,
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
        result.symbology = 'tarot';  // Always tarot for v2
        result.cards = promptProps.cards;  // Include cards array in response
        result.pageNames = promptProps.pageNames;  // Include pageNames in response
        
        console.log('\nINPUT:');
        console.log('  Cards:', promptProps.cards);
        console.log('  Positions:', promptProps.pageNames);
        console.log('  Intention:', promptProps.intention);
        
        console.log('\nRAW RESULT OBJECT:');
        console.log('Result keys:', Object.keys(result));
        console.log('Result.content type:', typeof result.content);
        
        // Try to find the actual response data
        let content = result.content || result.message || result.response || result;
        if (typeof content === 'string') {
            try {
                content = JSON.parse(content);
                result.content = content;
            } catch (e) {
                console.log('Content is string but not JSON');
            }
        }
        
        console.log('\n=== COMPLETE NEW API V2 RESPONSE ===');
        console.log(JSON.stringify(result, null, 2));
        console.log('=== END NEW API V2 RESPONSE ===\n');
        
        res.status(200).json({ ...result, version: 'symbology-v2'});
    } catch (error) {
        console.log('=== ERROR WITH PRIMARY MODEL ===');
        console.log(error);
        try {
            const result = await llmRouter('openai', messages);
            result.symbology = 'tarot';
            result.cards = promptProps.cards;
            result.pageNames = promptProps.pageNames;

            res.status(200).json({ ...result, version: 'symbology-v2'});
        } catch(error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }
}

function safeChatHistory(history = []) {
    if (history.length > 0 && history[0].role === "assistant") {
        return history.slice(1);
    }
    return history;
}

    async function makePromptPropertiesV2(body) {
    const {
        step,
        intention,
        cards = [],  // Required: cards array
        pageNames = [],  // Required: pageNames array
        language,
        isTrial = false,
        userName = null,
        timeLastUsed = null,
        poeticLevel = 5,
        chatHistory = []
    } = body;

    return [
        { 
            step, 
            language, 
            intention, 
            userName, 
            cards,
            pageNames,
            timeLastUsed, 
            poeticLevel, 
            isTrial
        },
        chatHistory,
    ];
}