import { tarotCardsDetail } from './cards/tarotCardsDetails.js';
import { tarotCardsDetailEs } from './cards/tarotCardsDetails_es.js';
import { tarotCardsDetailFr } from './cards/tarotCardsDetails_fr.js';
import { tarotCardsDetailPt } from './cards/tarotCardsDetails_pt.js';
import { tarotCardsDetailHi } from './cards/tarotCardsDetails_hi.js';
import { tarotCardsDetailFa } from './cards/tarotCardsDetails_fa.js';
import { animalCardsDetail } from './cards/animalCardsDetails.js';
import { hinduDeitiesDetail } from './cards/HinduDeities.js';
import { saintsCardDetails } from './cards/saintsCardsDetail.js';
import { symbolCards } from './cards/symbolCardsDetails.js';
import { orixasDetail } from "./cards/OrixasDetail.js";
import {symbolTypes} from "../symbol_types.js";

export const getCardsDetail = (type, language, flow) => {
    if (language) {
        language = language.toLowerCase();
    }

    if (type === symbolTypes.tarot || type === symbolTypes.rws) {
        if (language === 'es') {
            return tarotCardsDetailEs;
        }
        if (language === 'pt') {
            return tarotCardsDetailPt;
        }
        if (language === 'fa') {
            return tarotCardsDetailFa;
        }
        if (language === 'hi') {
            return tarotCardsDetailHi;
        }
        if (language === 'fr') {
            return tarotCardsDetailFr;
        }
        return tarotCardsDetail;
    }

    if (type === symbolTypes.animals) {
        return animalCardsDetail;
    }

    if (type === symbolTypes.hindu) {
        return hinduDeitiesDetail;
    }

    if (type === symbolTypes.symbols) {
        return symbolCards;
    }

    if (type === symbolTypes.orixas) {
        return orixasDetail;
    }

    if (type === symbolTypes.saints) {
        return saintsCardDetails;
    }
}

