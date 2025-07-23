import { tarotCardsDetail } from './tarotCardsDetails.js';
import { tarotCardsDetailEs } from './tarotCardsDetails_es.js';
import { animalCardsDetail } from './animalCardsDetails.js';
import { hinduDeitiesDetail } from './HinduDeities.js';
import { orixasDetail } from "./OrixasDetail.js";
import {symbolTypes} from "../symbol_types.js";

export const getCardsDetail = (type, language) => {


    if (language === 'es') {
        if (type === symbolTypes.tarot || type === symbolTypes.rws)  {
            return tarotCardsDetailEs;
        }
    }



    if (type === symbolTypes.tarot || type === symbolTypes.rws)  {
        return tarotCardsDetail;
    }

    if (type === symbolTypes.animals) {
        return animalCardsDetail;
    }

    if (type === symbolTypes.hindu) {
        return hinduDeitiesDetail;
    }

    if (type === symbolTypes.orixas) {
        return orixasDetail;
    }
}

