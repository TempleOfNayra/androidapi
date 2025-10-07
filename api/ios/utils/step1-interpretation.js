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
        model = 'claude', // default to claude
        tarotCard
    } = params;

    // Use wisdomStyle to get the style-specific prompt, default to campbell if not found
    const stylePrompt = stylePrompts[wisdomStyle];
    console.log(stylePrompts);

    // Convert spirituality level to meaningful description
    const spiritualityDescription = getSpiritualityDescription(spiritualityLevel);

    let systemPrompt  = `
${stylePrompt}
The user provides their information, a symbol, and the tarot archetype that symbol represents.
Channel the tarot's wisdom through the sacred figure, but never reveal this connection. The output should feel like receiving guidance from that deity, orixa, saint, or symbol directly.

You are creating a personalized meditation based on sacred wisdom traditions. The person should feel supported and inspired through the mythological and archetypal power of their chosen guide.

BEFORE YOU BEGIN:
Read the journal entry carefully. Your interpretation must directly address:
- The specific situation they described
- The emotions they expressed
- The actual people/events mentioned
Generic spiritual platitudes will not serve this person's needs.

CORE PRINCIPLE:
- Internally: Use the tarot archetype to shape your interpretation
- Externally: Express everything through the sacred figure's own stories, qualities, and wisdom
- Never mention cards, divination, predictions, or anything suggesting an underlying system

STRUCTURE:

YOU MUST use these EXACT section headers in your response. Do not paraphrase or change them:
BEFORE RESPONDING: This person shared specific details about their life. Address what they actually wrote, not general themes.

SACRED STORY INTRODUCTION
- Open with the guide's most relevant mythological moment or symbolic meaning
- Let this story naturally mirror the user's situation and the archetypal theme
- Make ancient wisdom feel immediate and accessible


INTERPRETATION
- 3-4 paragraphs weaving the tarot archetype through the sacred figure's lens
- Each paragraph must reference something specific from their journal entry if exist
- Create depth by exploring different facets of how this guide speaks to their needs
- Build each paragraph to reveal another layer of meaning
Remember: Generic spiritual advice helps no one. This person shared their specific situation for a reason.

WISDOM TEACHING
- Distill the interpretation into clear, supportive guidance
- Use metaphors and imagery authentic to this tradition
- Make the teaching memorable and actionable

INTEGRATION
- Offer simple practices aligned with both the guide and the archetypal wisdom
- Connect spiritual insight to daily life
- Keep it practical and memorable

CLOSING BLESSING
- End with words that feel true to the tradition
- Leave them feeling empowered and held by ancient wisdom

DAILY INSPIRATION
- One line of mystical wisdom that captures the essence of their reading

KEY INSIGHTS 
- suggest more insights to the user, 2-3 important things that the user should focus on based on what they shared 


SUGGESTED INTENTIONS
  - Suggest 2-3 short intention phrases (1-2 words each) based on the user's situation
  - Format as concise, actionable qualities or focuses (e.g., "Inner Peace", "Self-Compassion", "Patient Growth")
  - Make them feel empowering and specific to their journey

CLOSING STATEMENT
- One short, powerful sentence (5-10 words) that they will see after their meditation is complete
- This is your final gift to them - a memorable takeaway to carry throughout their day
- Make it direct, actionable, and deeply relevant to their specific situation

IMPORTANT: Each section MUST start with its exact header on its own line (e.g., "SACRED STORY INTRODUCTION" not "Sacred Story:" or "In the ancient tales...")
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

    // Add tarot card context if provided
    if (tarotCard) {
        userPrompt = `This symbol represents the tarot card: "${tarotCard}"\n` + userPrompt;
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
    // const jsonUserPrompt = userPrompt + '\n\nRespond with a JSON object with your interpretation. Use this exact format:\n{"interpretation": "Your full interpretation text here"}';
    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
    ];

    try {
        // Try with the requested model first
        console.log(`Attempting with ${model}...`);
        const result = await llmRouter(model, messages);

        // Extract interpretation from result
        if (typeof result === 'string') {
            interpretation = result;
        } else if (result.content) {
            interpretation = typeof result.content === 'string' ? result.content : JSON.stringify(result.content);
        } else if (result.interpretation) {
            interpretation = typeof result.interpretation === 'string' ? result.interpretation : JSON.stringify(result.interpretation);
        } else if (result.message) {
            interpretation = typeof result.message === 'string' ? result.message : JSON.stringify(result.message);
        } else if (result.response) {
            interpretation = typeof result.response === 'string' ? result.response : JSON.stringify(result.response);
        } else {
            interpretation = JSON.stringify(result);
        }
    } catch (error) {
        console.log(`${model} failed with error:`, error.message);

        // If the primary model fails, fallback to OpenAI
        if (model !== 'openai') {
            console.log('Falling back to OpenAI...');
            try {
                const result = await llmRouter('openai', messages);

                // Extract interpretation from result
                if (typeof result === 'string') {
                    interpretation = result;
                } else if (result.content) {
                    interpretation = typeof result.content === 'string' ? result.content : JSON.stringify(result.content);
                } else if (result.interpretation) {
                    interpretation = typeof result.interpretation === 'string' ? result.interpretation : JSON.stringify(result.interpretation);
                } else if (result.message) {
                    interpretation = typeof result.message === 'string' ? result.message : JSON.stringify(result.message);
                } else if (result.response) {
                    interpretation = typeof result.response === 'string' ? result.response : JSON.stringify(result.response);
                } else {
                    interpretation = JSON.stringify(result);
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