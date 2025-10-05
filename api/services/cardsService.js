import {getCardsDetail} from './cardsDetail.js';
import {symbolTypes} from "../symbol_types.js";
import {tarotCardsCompleteMeaningEn} from "./cards/tarotCardsMeaningComplete_en.js";
import {tarotCardsCompleteMeaningEs} from "./cards/tarotCardsMeaningComplete_es.js";
import {tarotCardsCompleteMeaningPt} from "./cards/tarotCardsMeaningComplete_pt.js";
import {tarotCardsCompleteMeaningFa} from "./cards/tarotCardsMeaningComplete_fa.js";
import {tarotCardsCompleteMeaningHi} from "./cards/tarotCardsMeaningComplete_hi.js";
import {tarotCardsCompleteMeaningFr} from "./cards/tarotCardsMeaningComplete_fr.js";

const completeMeaningForCard = (language) => {
    if (language === "en") return tarotCardsCompleteMeaningEn;
    if (language === "es") return tarotCardsCompleteMeaningEs;
    if (language === "pt") return tarotCardsCompleteMeaningPt;
    if (language === "fa") return tarotCardsCompleteMeaningFa;
    if (language === "hi") return tarotCardsCompleteMeaningHi;
    if (language === "fr") return tarotCardsCompleteMeaningFr;
}

export const getCardDetail = (cardType, cardName, language, flow) => {
    try {
        const card = getCardsDetail(cardType, language)[cardName];
        const detail =  {
            name: cardName,
            displayName: card.displayName || card.name,
            cardTitle: card.title,
            cardMessage: card.meaning,
            isReversed: card.isReversed,
            number: card.number + "",
            suitNumber: card.suitNumber + "",
            suit: card.suit,
            coreMeaning: card.coreMeaning,
            nayraQuote: card.nayraQuote,
            nextPrompt: card.nextPrompt,
            isMajor: card.suit === "MajorArcana",
            coreIntention: card.coreIntentions || card.coreMeaning
        }
        console.log('if flow', flow);
        if (flow) {
            console.log('if flow - yes ');
            console.log('if flow - language: ', language);
            const meanings = completeMeaningForCard(language);
            const moreDetail = meanings[card.number + ''];
            console.log({...detail, [flow]: moreDetail[flow]});
            return {...detail, [flow]: moreDetail[flow]}
        }

        console.log(detail);

        return detail;
    } catch (err) {
        console.error("Error in getCardDetail:", err);
        return null; // or {}
    }
}

export const getAvailableCards = (cardType, language='en') => {
    const allCards = getCardsDetail(cardType, language);
    // console.log(allCards);
    if (cardType === symbolTypes.rws || cardType === symbolTypes.tarot) {
        return Object.entries(allCards)
            .filter(([key, card]) => !key.includes('reversed'))
            .map(([key, card]) => ({
                name: key,
                displayName: card.name,
                coreMeaning: card.coreMeaning,
                keywords: card.keywords || [],
            }));
    }


        return Object.entries(allCards)
            // .filter(([cardName, card]) => card.name)
            .map(([cardName, card]) => ({
                name: cardName,
                displayName:card.displayName || card.name,
                coreMeaning: card.coreEssence || card.coreMeaning,
                keywords: card.keywords || [],
            }));


}