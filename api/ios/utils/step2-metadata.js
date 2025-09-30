import { llmRouter } from '../../handlers/llmRouter.js';

function generateMetadataPrompt(card, reflection) {
    const systemPrompt = `You are creating metadata for Nayra, a meditation app that guides users through spiritual reflection.

Context: A user has:
1. Selected a symbol (from tarot, Hindu deities, orixás, or animal spirits)
2. Written a personal journal entry
3. Received an AI-generated reflection that connects their journal to the symbol

Your role: Create structured metadata that enriches this reflection with additional guidance.
You continue in the same warm, insightful voice from the reflection provided.
Match the tone, style, and energy of the original text.
Don't summarize like a student - speak with the same wisdom and warmth as the reflection.`;

    const userPrompt = `Based on 
     symbol: ${card}
     reflection: "${reflection}"

Continue in the same voice and create metadata in the same language as the reflection.
Respond in this exact JSON format 
{
  "summaryTitle": "[The word 'Summary' in the same language as the *reflection* (not the symbol)]",
  "mainCard": {
    "aboutSymbolTitle": "[title that reads about [symbol]]",
    "aboutSymbol": "[Educational content about this symbol/deity - who they are, their domain, cultural significance, and an interesting lesser-known fact]",
    "cardNameLocal": "[symbol name in the reflection's language]",
    "sectionName": "[Create a poetic name for this entire reading/experience]",
    "summary": "[2-3 sentence crystallization of the reflection]",
    "title": "[Evocative title for the reflection itself]",
    "subtitle": "A [Choose: Reflection/Revelation/Journey] by Nayra",
    "keyInsights": [
      "[Key lesson or wisdom point 1 - extracted from the reflection's insights]",
      "[Key lesson or wisdom point 2 - extracted from the reflection's insights]",
      "[Key lesson or wisdom point 3 - extracted from the reflection's insights]"
    ],
    "keyInsightsLabel": "[Dynamic title for the keyInsights list]",
    "dailyInspiration": "[Mystical wisdom that captures the reflection's essence]"
  },
}`;

    // "finalGuidance": {
    //     "section": "Guided Meditation",
    //         "sectionName": "[a powerful mantra to start the meditation]",
    //         "subSectionName": "[Specific integration theme]",
    //         "guidance": "[Prophetic vision showing how this symbol's wisdom unfolds in your journey]",
    //         "practice": "[Specific ritual, meditation technique, or spiritual action that connects with this symbol's energy]",
    //         "meditationPoints": [
    //         "[First aspect to meditate on]",
    //         "[Second aspect to meditate on]",
    //         "[Third aspect to meditate on]"
    //     ]
    // }


    return { systemPrompt, userPrompt };
}


export async function generateMetadata(card, reflection, model = 'claude') {

    const { systemPrompt, userPrompt } = generateMetadataPrompt(card, reflection);
    console.log('\n=== iOS INTERPRETATION: STEP 2 - Generating metadata ===');
    const startTime = Date.now();

    // Call llmRouter directly like nayra.js does
    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
    ];

    let metadata;
    try {
        console.log(`Attempting metadata generation with ${model}...`);
        const result = await llmRouter(model, messages);

        // Extract and parse metadata
        let content = result.content || result.message || result.response || result;

        // Parse JSON if it's a string
        if (typeof content === 'string') {
            metadata = JSON.parse(content);
        } else {
            metadata = content;
        }
    } catch (error) {
        console.error(`${model} failed for metadata:`, error.message);

        // If the primary model fails, fallback to OpenAI
        if (model !== 'openai') {
            console.log('Falling back to OpenAI for metadata...');
            try {
                const result = await llmRouter('openai', messages);

                // Extract and parse metadata
                let content = result.content || result.message || result.response || result;

                // Parse JSON if it's a string
                if (typeof content === 'string') {
                    metadata = JSON.parse(content);
                } else {
                    metadata = content;
                }
                console.log('OpenAI fallback successful for metadata');
            } catch (fallbackError) {
                console.error('OpenAI fallback also failed:', fallbackError.message);
                throw new Error(`Both ${model} and OpenAI failed for metadata: ${error.message} | ${fallbackError.message}`);
            }
        } else {
            // If OpenAI was the primary and it failed, just throw
            throw error;
        }
    }

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    console.log('\n=============== STEP 2: METADATA RESPONSE ===============');
    console.log(JSON.stringify(metadata, null, 2));
    console.log('=============== END STEP 2 RESPONSE ===============');
    console.log(`⏱️ Step 2 Time: ${elapsedTime}ms\n`);

    return {
        metadata, // Return parsed metadata directly
        time: elapsedTime
    };
}