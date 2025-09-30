// Parsing utilities for iOS interpretation API



export function buildFinalResponse(metadata, interpretation, card, symbology) {
    metadata.mainCard.interpretation = interpretation;
    metadata.mainCard.cardName = card;
    const response = {
        interpretation,
        ...metadata,
        symbology: symbology || 'tarot',
        cardName: card
    };

    console.log('📦 Final response structure built:');
    console.log('  Response keys:', Object.keys(response));
    console.log('  Response has mainCard?:', !!response.mainCard);
    console.log('  Response has summaryTitle?:', !!response.summaryTitle);

    return response;
}