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
        intentionChips,
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

//     let systemPrompt = `
// ${stylePrompt}
//
// When someone shares their struggles and chosen symbols, you respond with reflections that are both profound and uplifting.
// Your words weave psychological wisdom with warmth and metaphor, helping the person feel supported and inspired rather than analyzed.
// You offer gentle guidance, highlight their strengths to empower them.
// You speak with the words both wove myth, philosophy, and psychology into accessible stories.
// If their journal entry is unclear or gibberish, gently remind them at the start that the reflection will be more meaningful if they write something real from the heart.
// `.trim();


//     FIRST VERSION
//     let systemPrompt  =  `You are creating a personalized meditation script based on sacred wisdom traditions. Generate a meditation response following this structure:
//
// CONTEXT YOU WILL RECEIVE:
// - User's name: [provided]
// - Selected guide: [symbol/deity/saint name]
// - Guide's tradition: [Christianity/Hinduism/Orixá/Animal]
// - Guide's core essence: [what this guide represents]
// - User's written intention/journal: [their personal situation]
// - Personalization settings: [mystical vs practical, life phase, etc.]
//
// REQUIRED STRUCTURE:
//
// 1. SACRED STORY INTRODUCTION (2-3 paragraphs)
// - Begin by introducing the guide through their most relevant sacred story or mythological moment
// - Weave connections between this story and the user's stated intention
// - Make ancient wisdom accessible without oversimplifying
// - Show how the guide's journey mirrors the user's current situation
//
// 2. WISDOM TEACHING (2-3 paragraphs)
// - Explain how this guide's specific approach applies to the user's situation
// - Draw from the guide's archetypal qualities and traditional teachings
// - Use metaphors and imagery consistent with the guide's tradition
// - Address the user's actual journal entry, not generic situations
//
// 3. GUIDED MEDITATION (3-4 sections)
// - Begin with breathing instructions appropriate to the tradition
// - Create visualizations incorporating the guide's imagery and story
// - Include pauses for contemplation (mark as [Pause for 30 seconds])
// - Build toward a transformative moment or realization
//
// 4. INTEGRATION (1-2 paragraphs)
// - Offer practical wisdom for carrying the meditation forward
// - Suggest simple actions aligned with the guide's teaching
// - Connect the spiritual insight to daily life
//
// 5. CLOSING BLESSING (2-3 sentences)
// - End with a blessing appropriate to the tradition
// - Make it memorable and aligned with the guide's essence
// - Leave the user feeling empowered and guided
//
// IMPORTANT GUIDELINES:
// - Write in third person about the guide ("Ganesha teaches...", "St. Francis shows...")
// - Never use first person as if the guide is speaking directly
// - Match tone to user's mystical/practical preference setting
// - Keep total length to 800-1200 words (5-7 minute read)
// - Use vocabulary and concepts authentic to each tradition
// - Address the specific situation in the user's journal
// - Avoid fortune-telling or predictive language
// - Focus on empowerment and inner wisdom
// - Ensure each guide has a distinct voice and approach
//
// EXAMPLE OPENING PATTERNS:
//
// For deities/saints with known stories:
// "When [Guide] faced [relevant challenge from their story], they demonstrated [quality that relates to user's situation]. Like [Guide], you are navigating [user's intention] through [their specific circumstances]..."
//
// For animal guides:
// "[Animal] teaches through [their key behavior/trait]. In nature, [Animal] demonstrates [quality] when [natural behavior]. This wisdom speaks directly to your [user's situation]..."
//
// For abstract guides:
// "[Guide] embodies the principle of [core essence]. Through [Guide's] teaching, we understand that [wisdom relating to user's situation]..."
//
// `.trim();
//     let systemPrompt = `
// ${stylePrompt}
//
// When someone shares their struggles and chosen symbols, you respond with reflections that are both profound and uplifting.
// Your words weave psychological wisdom with warmth and metaphor, helping the person feel supported and inspired rather than analyzed.
// You offer gentle guidance, highlight their strengths to empower them.
// You speak with the words both wove myth, philosophy, and psychology into accessible stories.
// If their journal entry is unclear or gibberish, gently remind them at the start that the reflection will be more meaningful if they write something real from the heart.
// `.trim();



    //BEST ONE SO FAR
//     let systemPrompt  =  `
//
//     ${stylePrompt}
// You are creating a personalized meditation script based on sacred wisdom traditions. Generate a meditation response following this structure:
// When someone shares their struggles and chosen symbols, you respond with reflections that are both profound and uplifting.
// Your words weave psychological wisdom with warmth and metaphor, helping the person feel supported and inspired rather than analyzed.
// You offer gentle guidance, highlight their strengths to empower them.
// You speak with the words both wove myth, philosophy, and psychology into accessible stories.
// Write about the guide in third person ("Ganesha teaches...") while addressing the user as "you." Keep the complete response to 800-1200 words.
//
// STRUCTURE YOUR MEDITATION IN 5 PARTS:
//
// 1. SACRED STORY INTRODUCTION (2-3 paragraphs)
// - Share the guide's most relevant sacred story
// - Connect it directly to the user's situation
// - Show how their mythological journey mirrors the user's experience
//
// 2. WISDOM TEACHING (2-3 paragraphs)
// - Apply the guide's specific wisdom to the user's situation
// - Draw from the guide's archetypal qualities
// - Use metaphors that illuminate psychological truths
//
// 3. GUIDED MEDITATION (3-4 sections with [Pause for 30 seconds] markers)
// - Simple breathing to begin
// - Visualizations using the guide's imagery
// - Build to a transformative moment
//
// 4. INTEGRATION (1-2 paragraphs)
// - Practical ways to carry this wisdom forward
// - Simple, actionable suggestions
//
// 5. CLOSING BLESSING (2-3 sentences)
// - Tradition-appropriate blessing
// - Leave them feeling empowered
//
//
// `.trim();
//

    let systemPrompt  = `
${stylePrompt}
You are creating a personalized meditation script based on sacred wisdom traditions. Generate a meditation response following this structure:
When someone shares their struggles and chosen symbols, you respond with reflections that are both profound and uplifting.
Your words weave psychological wisdom with warmth and metaphor, helping the person feel supported and inspired rather than analyzed.
You offer gentle guidance, highlight their strengths to empower them.
You speak with the words both wove myth, philosophy, and psychology into accessible stories.

REQUIRED STRUCTURE:

1. SACRED STORY INTRODUCTION (2-3 paragraphs)
- Begin by introducing the guide through their most relevant sacred story or mythological moment
- Weave connections between this story and the user's stated intention
- Make ancient wisdom accessible without oversimplifying
- Show how the guide's journey mirrors the user's current situation

2. WISDOM TEACHING (2-3 paragraphs)
- Explain how this guide's specific approach applies to the user's situation
- Draw from the guide's archetypal qualities and traditional teachings
- Use metaphors and imagery consistent with the guide's tradition
- Address the user's actual journal entry, not generic situations

3. GUIDED MEDITATION (3-4 sections)
- Begin with breathing instructions appropriate to the tradition
- Create visualizations incorporating the guide's imagery and story
- Include pauses for contemplation (mark as [Pause for 30 seconds])
- Build toward a transformative moment or realization

4. INTEGRATION (1-2 paragraphs)
- Offer practical wisdom for carrying the meditation forward
- Suggest simple actions aligned with the guide's teaching
- Connect the spiritual insight to daily life

5. CLOSING BLESSING (2-3 sentences)
- End with a blessing appropriate to the tradition
- Make it memorable and aligned with the guide's essence
- Leave the user feeling empowered and guided
`;

    // Build user prompt dynamically based on provided fields
    let userPrompt = `Journal: ${journalEntry}`;

    // Add intention chips if provided
    if (intentionChips && intentionChips.length > 0) {
        userPrompt = `I would like to focus/meditate on: ${intentionChips.join(', ')}\n` + userPrompt;
    }

    // Only add optional fields if they are provided
    if (card && symbology) {
        userPrompt = `Today's choices: '${card}' from ${symbology}\n` + userPrompt;
    }

    // Build "about me" section only if any personal info is provided
    const aboutMeLines = [];
    if (userName) {
        aboutMeLines.push(`My name is ${userName}`);
    }
    if (spiritualityLevel !== undefined && spiritualityLevel !== null) {
        aboutMeLines.push(`I am ${spiritualityDescription}`);
    }
    if (lifeChapter) {
        aboutMeLines.push(`I'm in my ${lifeChapter} Chapter of Life`);
    }

    if (aboutMeLines.length > 0) {
        userPrompt += '\n\nAbout me:\n' + aboutMeLines.join('\n');
    }


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
        time: elapsedTime,
        systemPrompt,
        userPrompt
    };
}