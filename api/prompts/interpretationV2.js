export function interpretationV2(cards, pageNames, language, intention, userName = null, lastUsedTime = null) {
    if (!cards || cards.length === 0) {
        throw new Error(`Missing cards array`);
    }
    
    let promptParts = [];
    
    // Provide the cards and their positions
    if (cards.length === 1) {
        promptParts.push(`Card: ${cards[0]}`);
        promptParts.push(`Position: ${pageNames[0]}`);
    } else {
        promptParts.push(`Cards and Positions:`);
        for (let i = 0; i < cards.length; i++) {
            promptParts.push(`Position ${i + 1} - ${pageNames[i]}: ${cards[i]}`);
        }
    }
    
    promptParts.push('');
    
    // Add the seeker's context
    if (intention) {
        promptParts.push(`Seeker's question: "${intention}"`);
    } else {
        promptParts.push('General reading requested');
    }
    
    if (userName) {
        promptParts.push(`Seeker's name: ${userName}`);
    }
    
    if (lastUsedTime) {
        promptParts.push(`Returning seeker (last reading: ${lastUsedTime})`);
    }
    
    promptParts.push(`Language: ${language}`);
    
    return promptParts.filter(p => p !== null && p !== '').join('\n');
}