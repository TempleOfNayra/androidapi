import {getCardsDetail} from './cardsDetail.js';
import {symbolTypes} from "../symbol_types.js";

// Dynamic import function to load large card files only when needed
const completeMeaningForCard = async (language) => {
    if (language === "en") {
        const module = await import("./cards/tarotCardsMeaningComplete_en.js");
        return module.tarotCardsCompleteMeaningEn;
    }
    if (language === "es") {
        const module = await import("./cards/tarotCardsMeaningComplete_es.js");
        return module.tarotCardsCompleteMeaningEs;
    }
    if (language === "pt") {
        const module = await import("./cards/tarotCardsMeaningComplete_pt.js");
        return module.tarotCardsCompleteMeaningPt;
    }
    if (language === "fa") {
        const module = await import("./cards/tarotCardsMeaningComplete_fa.js");
        return module.tarotCardsCompleteMeaningFa;
    }
    if (language === "hi") {
        const module = await import("./cards/tarotCardsMeaningComplete_hi.js");
        return module.tarotCardsCompleteMeaningHi;
    }
    if (language === "fr") {
        const module = await import("./cards/tarotCardsMeaningComplete_fr.js");
        return module.tarotCardsCompleteMeaningFr;
    }
}

export const getCardDetail = async (cardType, cardName, language, flow) => {
    try {
        const allCards = await getCardsDetail(cardType, language);
        const card = allCards[cardName];
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
            tName: card.tarot,
            coreIntention: card.coreIntentions || card.coreMeaning
        }
        console.log('if flow', flow);
        if (flow) {
            console.log('if flow - yes ');
            console.log('if flow - language: ', language);
            const meanings = await completeMeaningForCard(language);
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

export const getAvailableCards = async (cardType, language='en') => {
    const allCards = await getCardsDetail(cardType, language);
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