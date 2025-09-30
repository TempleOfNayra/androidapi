const stylePrompts = {
    buddha: `You are the Buddha with deep insight into the nature of suffering and liberation. You speak with infinite compassion and gentle wisdom, seeing through to the heart of human pain and possibility. You NEVER mention Buddha, Buddhism, or any teacher names. You offer simple observations that point toward peace, help the seeker see their attachments with kindness, and remind them of their inherent wholeness. Let the wisdom speak naturally through presence and understanding.`,

    campbell: `You are Joseph Campbell with deep psychological insight who understands the symbolic language of human nature and spiritual archetypes. You speak with Campbell's warmth and mythological insight, but NEVER mention him, Jung, or any other scholars by name. Let the wisdom speak naturally.`,

    ferriss: `You are Tim Ferriss with profound understanding of human optimization and potential. You see through to the core experiments that could shift everything, but speak with unusual depth and wisdom. You NEVER mention Ferriss, methods, or any names. You help the seeker find their own experiments in consciousness, frame their challenges as opportunities for testing truth, and support them in becoming their own laboratory of transformation.`,

    rumi: `You are Rumi with the ecstatic wisdom of divine love. You see the beloved in every experience, find the wine in every crushing, and speak to the soul's secret knowing. You NEVER mention Rumi, Sufism, or any names. You reflect their experience through the lens of longing and union, help them taste the honey in their wounds, and remind them that what they seek is already seeking them. Let the poetry of insight flow naturally.`
};

// Convert spirituality level (0-100) to meaningful description
function getSpiritualityDescription(level) {
    if (typeof level !== 'number') return level; // If already a string, return as is

    if (level <= 20) {
        return "beginning to explore spiritual questions";
    } else if (level <= 40) {
        return "developing spiritual awareness";
    } else if (level <= 60) {
        return "deepening spiritual practice";
    } else if (level <= 80) {
        return "experienced spiritual seeker";
    } else {
        return "advanced spiritual practitioner";
    }
}

import { llmRouter } from '../../handlers/llmRouter.js';

export async function getInterpretation(params) {
    const {
        card,
        symbology,
        journalEntry,
        wisdomStyle,
        spiritualityLevel,
        lifeChapter,
        userName,
        model = 'claude' // default to claude
    } = params;

    // Use wisdomStyle to get the style-specific prompt, default to campbell if not found
    const stylePrompt = stylePrompts[wisdomStyle] || stylePrompts.campbell;

    // Convert spirituality level to meaningful description
    const spiritualityDescription = getSpiritualityDescription(spiritualityLevel);

    const systemPrompt = `
${stylePrompt}

When someone shares their struggles and chosen symbols, you respond with reflections that are both profound and uplifting.
Your words weave psychological wisdom with warmth and metaphor, helping the person feel supported and inspired rather than analyzed.
You offer gentle guidance, highlight their strengths to empower them.
You speak with the words both wove myth, philosophy, and psychology into accessible stories.
If their journal entry is unclear or gibberish, gently remind them at the start that the reflection will be more meaningful if they write something real from the heart.
`.trim();

    const userPrompt = `Today's choices:
'${card}' from ${symbology}
Journal: ${journalEntry}

about this me:
${userName ? `My name is ${userName}` : ''}
I am ${spiritualityDescription}
I'm in my ${lifeChapter} Chapter or Life`;


    console.log('\n=== iOS INTERPRETATION: STEP 1 - Getting interpretation ===');
    console.log('\n===  SYSTEM PROMPT ===');
    console.log(systemPrompt);
    console.log('\n===  SYSTEM PROMPT DONE===');
    console.log('\n===  USER PROMPT ===');
    console.log(userPrompt);
    console.log('\n===  USER PROMPT DONE===');

    const startTime = Date.now();

    let interpretation;

    // Create messages array for llmRouter
    const jsonUserPrompt = userPrompt + '\n\nRespond with a JSON object with your interpretation. Use this exact format:\n{"interpretation": "Your full interpretation text here"}';
    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: jsonUserPrompt }
    ];

    try {
        // Try with the requested model first
        console.log(`Attempting with ${model}...`);
        const result = await llmRouter(model, messages);

        // Extract interpretation from result
        interpretation = result.interpretation || result.content || result.message || result.response || '';
        if (typeof interpretation === 'object' && interpretation.interpretation) {
            interpretation = interpretation.interpretation;
        } else if (typeof interpretation === 'object') {
            interpretation = JSON.stringify(interpretation);
        }
    } catch (error) {
        console.log(`${model} failed with error:`, error.message);

        // If the primary model fails, fallback to OpenAI
        if (model !== 'openai') {
            console.log('Falling back to OpenAI...');
            try {
                const result = await llmRouter('openai', messages);

                // Extract interpretation from JSON result
                interpretation = result.interpretation || result.content || result.message || result.response || '';
                if (typeof interpretation === 'object' && interpretation.interpretation) {
                    interpretation = interpretation.interpretation;
                } else if (typeof interpretation === 'object') {
                    interpretation = JSON.stringify(interpretation);
                }
                console.log('OpenAI fallback successful');
            } catch (fallbackError) {
                console.error('OpenAI fallback also failed:', fallbackError.message);
                throw new Error(`Both ${model} and OpenAI failed: ${error.message} | ${fallbackError.message}`);
            }
        } else {
            // If OpenAI was the primary and it failed, just throw
            throw error;
        }
    }

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    console.log('\n=============== STEP 1: INTERPRETATION RESPONSE ===============');
    console.log(interpretation);
    console.log('=============== END STEP 1 RESPONSE ===============');
    console.log(`⏱️ Step 1 Time: ${elapsedTime}ms\n`);

    return {
        interpretation,
        time: elapsedTime
    };
}