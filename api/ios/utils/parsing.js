// Parsing utilities for iOS interpretation API

export function parseInterpretationSections(text) {
    const sections = {
        sacredStoryIntroduction: '',
        interpretation: '',
        wisdomTeaching: '',
        integration: '',
        closingBlessing: '',
        dailyInspiration: '',
        meditationMantra: ''
    };

    // Split by section headers (with optional colons)
    const sacredMatch = text.match(/SACRED STORY INTRODUCTION\s*:?\s*\n([\s\S]*?)(?=\n\s*INTERPRETATION|$)/i);
    const interpretationMatch = text.match(/INTERPRETATION\s*:?\s*\n([\s\S]*?)(?=\n\s*WISDOM TEACHING|$)/i);
    const wisdomMatch = text.match(/WISDOM TEACHING\s*:?\s*\n([\s\S]*?)(?=\n\s*INTEGRATION|$)/i);
    const integrationMatch = text.match(/INTEGRATION\s*:?\s*\n([\s\S]*?)(?=\n\s*CLOSING BLESSING|$)/i);
    const blessingMatch = text.match(/CLOSING BLESSING\s*:?\s*\n([\s\S]*?)(?=\n\s*DAILY INSPIRATION|$)/i);
    const inspirationMatch = text.match(/DAILY INSPIRATION\s*:?\s*\n([\s\S]*?)(?=\n\s*MEDITATION MANTRA|$)/i);
    const mantraMatch = text.match(/MEDITATION MANTRA\s*:?\s*\n([\s\S]*?)$/i);

    if (sacredMatch) sections.sacredStoryIntroduction = sacredMatch[1].trim();
    if (interpretationMatch) sections.interpretation = interpretationMatch[1].trim();
    if (wisdomMatch) sections.wisdomTeaching = wisdomMatch[1].trim();
    if (integrationMatch) sections.integration = integrationMatch[1].trim();
    if (blessingMatch) sections.closingBlessing = blessingMatch[1].trim();
    if (inspirationMatch) {
        // Remove surrounding quotes from daily inspiration if present
        let inspiration = inspirationMatch[1].trim();
        sections.dailyInspiration = inspiration.replace(/^["']|["']$/g, '');
    }
    if (mantraMatch) {
        // Remove surrounding quotes from meditation mantra if present
        let mantra = mantraMatch[1].trim();
        sections.meditationMantra = mantra.replace(/^["']|["']$/g, '');
    }

    return sections;
}

export function buildFinalResponse(metadata, interpretation, card, symbology) {
    metadata.mainCard.interpretation = interpretation;
    metadata.mainCard.cardName = card;
    const response = {
        interpretation,
        ...metadata,
        symbology: symbology,
        cardName: card
    };

    console.log('📦 Final response structure built:');
    console.log('  Response keys:', Object.keys(response));
    console.log('  Response has mainCard?:', !!response.mainCard);
    console.log('  Response has summaryTitle?:', !!response.summaryTitle);

    return response;
}


//
// {
//
//     "mainCard": {
//         "cardName": "the card name",
//         "aboutSymbolTitle": "about $symbology",
//         "aboutSymbol": part1 + part2
//         "cardNameLocal": card
//         "sectionName": "Reflection part 1 ",
//         "title": "Reflection part 2 ",
//         "subtitle": "A Reflection by Nayra",
//         "dailyInspiration": "[Mystical wisdom that captures the reflection's essence]"
// },
// }