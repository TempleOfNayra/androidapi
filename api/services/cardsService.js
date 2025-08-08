import {getCardsDetail} from './cardsDetail.js';
import {symbolTypes} from "../symbol_types.js";
import {tarotCardsCompleteMeaning} from "./cards/tarotCardsMeaningComplete_en.js";

export const getCardDetail = (cardType, cardName, language, flow) => {
    try {
        const card = getCardsDetail(cardType, language)[cardName];
        const detail =  {
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

        if (flow) {
            const moreDetail = tarotCardsCompleteMeaning[card.number + ''];
            return {...detail, [flow]: moreDetail[flow]}
        }

        return detail;
    } catch (err) {
        console.error("Error in getCardDetail:", err);
        return null; // or {}
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