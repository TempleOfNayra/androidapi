// export function buildReflectionPrompt(
//     cards,
//     symbology,
//     journalEntry,
//     intention,
//     wisdomStyle,
//     spiritualityLevel,
//     lifeChapter,
//     userName,
//     language
// ) {
//     let promptParts = [];
//
//     // User's chosen symbol(s)
//     if (cards && cards.length > 0) {
//         promptParts.push(`Chosen Symbol: ${cards.join(', ')}`);
//         promptParts.push(`Symbol System: ${symbology}`);
//     }
//
//     promptParts.push('');
//
//     // User's journal entry - THE MOST IMPORTANT PART
//     if (journalEntry) {
//         promptParts.push(`User's Personal Reflection:`);
//         promptParts.push(`"${journalEntry}"`);
//         promptParts.push('');
//     }
//
//     // Context about the user's journey
//     if (userName) {
//         promptParts.push(`User's Name: ${userName}`);
//     }
//
//     if (intention) {
//         promptParts.push(`Their Intention: "${intention}"`);
//     }
//
//     // Onboarding insights for personalization
//     if (wisdomStyle) {
//         promptParts.push(`Wisdom Style That Resonates: ${wisdomStyle}`);
//     }
//
//     if (spiritualityLevel !== null && spiritualityLevel !== undefined) {
//         let level = 'Just Beginning';
//         if (spiritualityLevel > 25) level = 'Exploring';
//         if (spiritualityLevel > 50) level = 'Deepening';
//         if (spiritualityLevel > 75) level = 'Experienced';
//         promptParts.push(`Spiritual Journey Stage: ${level} (${spiritualityLevel}/100)`);
//     }
//
//     if (lifeChapter) {
//         promptParts.push(`Current Life Chapter: ${lifeChapter}`);
//     }
//
//     promptParts.push(`Response Language: ${language}`);
//     promptParts.push('');
//
//     // Instructions for the response
//     promptParts.push('INSTRUCTIONS:');
//     promptParts.push('1. Read their journal entry carefully - this is their personal reflection');
//     promptParts.push('2. Share a unique story or lesser-known teaching about their chosen symbol');
//     promptParts.push('3. Connect their journal themes to the symbol\'s wisdom');
//     promptParts.push('4. Ask thoughtful questions that help them explore deeper');
//     promptParts.push('5. Offer a practical exercise they can do today');
//     promptParts.push('6. Create an affirmation using their own words');
//     promptParts.push('7. Focus on self-discovery and growth, not predictions');
//     promptParts.push('8. Respond in their specified language');
//
//     return promptParts.filter(p => p !== null && p !== '').join('\n');
// }
//
// // Helper function to get symbol-specific context
// export function getSymbolContext(symbology, cardName) {
//     const contexts = {
//         'wisdom': {
//             default: 'archetypal wisdom and universal truths'
//         },
//         'animals': {
//             default: 'the ancient teachings and medicine of animal spirits'
//         },
//         'angels': {
//             default: 'angelic guidance and divine support'
//         },
//         'orixas': {
//             'Iemanjá': 'the ocean mother who transforms tears into pearls of wisdom',
//             'Oxalá': 'the father of peace who teaches patience and clarity',
//             'Ogum': 'the forge master who transforms obstacles into tools',
//             default: 'the profound wisdom of the Orishas'
//         },
//         'hindu': {
//             'Ganesha': 'the remover of obstacles who dances at crossroads',
//             'Lakshmi': 'the goddess who teaches that true wealth flows from within',
//             'Saraswati': 'the river of knowledge that flows through all creative acts',
//             default: 'the timeless teachings of Hindu wisdom'
//         },
//         'hellenistic': {
//             'Athena': 'the goddess of wisdom who was born fully formed from thought itself',
//             'Hermes': 'the messenger who walks between worlds',
//             default: 'the myths that have guided humanity for millennia'
//         }
//     };
//
//     const system = contexts[symbology] || contexts['wisdom'];
//     return system[cardName] || system.default;
// }