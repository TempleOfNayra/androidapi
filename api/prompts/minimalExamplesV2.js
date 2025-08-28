/**
 * Minimal Examples for Dynamic Positions V2
 * 
 * Lightweight pattern teaching for the LLM without heavy token usage
 * Each example is ~50-100 tokens showing the PATTERN, not full readings
 */

export const minimalPatterns = {
    // Position patterns - actual examples in Nayra's voice
    ANSWER: `"YES — The Sun's twenty-one rays converge into absolute affirmation. This is not mere agreement but cosmic celebration. Within three weeks, what you seek not only arrives but exceeds imagination. Watch for signs in threes, beginning Thursday."`,
    
    LOVE: `"Three of Cups in love reveals romance arriving through laughter. A friend's gathering becomes cupid's arena. Someone you've known three months sees you with new eyes after witnessing you in your element. By month's end, friendship transcends into electric connection."`,
    
    MONEY: `"Nine of Pentacles in money whispers of self-reliance becoming fortune. The project you've nurtured in solitude reaches harvest. I see $9,000 or multiples of nine appearing significantly. Your independence becomes your wealth."`,
    
    LIFE: `"The Star in life position promises healing rains after your wildfire. Seven months of restoration begin now. Dreams become prophetic, water features prominently. The wish made in despair finds unexpected answer."`,
    
    PAST: `"Six of Cups in past reveals childhood's golden thread still weaving through today. That innocence you thought lost went underground, protecting itself until safe. The past hasn't finished giving its gifts."`,
    
    PRESENT: `"Two of Pentacles captures your juggling act perfectly. This performance peaks in two weeks, then one ball must drop to catch what matters. The universe applauds your skill but prepares simpler rhythm."`,
    
    FUTURE: `"Ace of Wands in future ignites creative fire within one lunar cycle. Opportunity arrives like lightning — sudden, demanding immediate action. Prepare for inspiration so intense it disrupts sleep."`,
    
    ENERGY: `"Queen of Wands radiates through your field — magnetic, creative, sovereign. Others sense your power building, responding with either attraction or intimidation. The universe crowns those who crown themselves."`,
    
    CHALLENGE: `"Knight of Swords charges as your challenge — impulsive action threatens careful plans. Someone (perhaps your shadow) moves too fast. This peaks in three days. Slow the knight down."`,
    
    TIMING: `"Eight of Wands promises swift movement within eight days. What felt stuck suddenly flies. Messages arrive in clusters, travel spontaneously manifests. The universe breaks its speed limit for you."`
};

/**
 * Get minimal examples for specific positions
 * Returns only 1-2 examples to keep tokens low while teaching pattern
 */
export function getMinimalExample(positions) {
    let examples = '';
    
    // Add only the first position's pattern as example
    if (positions && positions.length > 0) {
        const firstPosition = positions[0].toUpperCase();
        if (minimalPatterns[firstPosition]) {
            examples += `Example for ${firstPosition} position:\n${minimalPatterns[firstPosition]}\n\n`;
        }
    }
    
    // If 3-card reading, add connection pattern
    if (positions && positions.length === 3) {
        examples += `WEAVING CARDS: Connect three cards into one narrative arc. First card sets foundation, second reveals challenge/transformation, third shows resolution. "The Tower's destruction in past cleared ground for Star's healing in present, preparing World's completion in future..."\n\n`;
    }
    
    return examples;
}

/**
 * Get pattern instruction without examples
 * Even lighter - just describes what to do
 */
export function getPatternInstruction(positions) {
    const instructions = {
        ANSWER: "Provide clear YES/NO/MAYBE with mystical explanation and specific timing",
        LOVE: "Interpret through romantic/relational lens with concrete romantic predictions",
        MONEY: "Focus on financial/career manifestations with specific amounts and dates",
        LIFE: "Address overall spiritual journey and life path with seasonal markers",
        PAST: "Reveal foundations and origins that created present circumstances",
        PRESENT: "Decode current energies and immediate dynamics",
        FUTURE: "Prophet coming manifestations with specific timeframes",
        ENERGY: "Describe energetic signature to embody now",
        CHALLENGE: "Identify obstacle and provide navigation strategy",
        TIMING: "Reveal cosmic scheduling of events"
    };
    
    let instruction = "POSITION INTERPRETATIONS:\n";
    positions.forEach(pos => {
        const upperPos = pos.toUpperCase();
        if (instructions[upperPos]) {
            instruction += `${upperPos}: ${instructions[upperPos]}\n`;
        }
    });
    
    return instruction;
}

/**
 * Core elements to always include (very minimal)
 */
export const essentials = {
    timing: "Include specific timeframes: days (3-21), lunar cycles, seasons, significant dates",
    specificity: "Provide concrete details: colors, numbers, initials, directions, amounts",
    mythology: "Reference the actual card imagery and symbolism, not generic meanings",
    prophecy: "Speak with certainty about what you see coming, not possibilities",
    connection: "For multiple cards, weave one story, not separate readings"
};

/**
 * Format minimal examples for system prompt
 * Keeps token usage under 200-300 total
 */
export function formatMinimalForPrompt(positions = []) {
    return getMinimalExample(positions) + 
           "Remember: Mystical depth with specific predictions. " +
           "Timeframes, numbers, signs, concrete manifestations. " +
           "Weave mythology with personal truth. " +
           "Speak as oracle, not advisor.";
}