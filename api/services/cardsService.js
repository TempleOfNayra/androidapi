import {getCardsDetail} from './cardsDetail.js';
import {symbolTypes} from "../symbol_types.js";

export const getCardDetail = (cardType, cardName) => {
    const card = getCardsDetail(cardType)[cardName];
    return {
        name: card.name || cardName,
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

export const getAvailableCards = (cardType) => {
    const allCards = getCardsDetail(cardType);
    if (cardType === symbolTypes.rws || cardType === symbolTypes.tarot) {
        return Object.entries(allCards)
            .filter(([cardName, card]) => !cardName.includes('reversed'))
            .map(([cardName, card]) => ({
                name: cardName
            }));
    }

    if (cardType === symbolTypes.hindu|| cardType === symbolTypes.orixas) {
        return Object.entries(allCards)
            .filter(([cardName, card]) => card.name)
            .map(([cardName, card]) => ({
                name: card.name
            }));
    }

    return Object.entries(allCards)
        .filter(([cardName, card]) => card.name)
        .map(([cardName, card]) => ({
            name: card.name
        }));
}