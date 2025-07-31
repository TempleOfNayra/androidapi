import {getCardsDetail} from './cardsDetail.js';
import {symbolTypes} from "../symbol_types.js";

export const getCardDetail = (cardType, cardName, language) => {

    console.log('language 1: ' , language);

    const card = getCardsDetail(cardType, language)[cardName];
    return {
        name: cardName,
        displayName: card.name,
        cardTitle: card.title,
        cardMessage: card.meaning,
        isReversed: card.isReversed,
        number: card.number + "",
        suitNumber: card.suitNumber + "",
        suit: card.suit,
        coreMeaning: card.coreMeaning,
        nayraQuote: card.nayraQuote,
        nextPrompt: card.nextPrompt,
        isMajor: card.suit === "MajorArcana"
    }
}

export const getAvailableCards = (cardType, language='en') => {
    const allCards = getCardsDetail(cardType, language);

    if (cardType === symbolTypes.rws || cardType === symbolTypes.tarot) {
        return Object.entries(allCards)
            .filter(([key, card]) => !key.includes('reversed'))
            .map(([key, card]) => ({
                name: key,
                displayName: card.name
            }));
    }

    if (cardType === symbolTypes.hindu|| cardType === symbolTypes.orixas) {
        return Object.entries(allCards)
            .filter(([cardName, card]) => card.name)
            .map(([cardName, card]) => ({
                name: card.name,
                displayName: card.name
            }));
    }

    return Object.entries(allCards)
        .filter(([cardName, card]) => card.name)
        .map(([cardName, card]) => ({
            name: card.name,
            displayName: card.name
        }));
}