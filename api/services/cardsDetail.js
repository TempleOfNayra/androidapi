import {symbolTypes} from "../symbol_types.js";

export const getCardsDetail = async (type, language, flow) => {
    try {
        if (language) {
            language = language.toLowerCase();
        }

        if (type === symbolTypes.tarot || type === symbolTypes.rws) {
            if (language === 'es') {
                const module = await import('./cards/tarotCardsDetails_es.js');
                return module.tarotCardsDetailEs;
            }
            if (language === 'pt') {
                const module = await import('./cards/tarotCardsDetails_pt.js');
                return module.tarotCardsDetailPt;
            }
            if (language === 'fa') {
                const module = await import('./cards/tarotCardsDetails_fa.js');
                return module.tarotCardsDetailFa;
            }
            if (language === 'hi') {
                const module = await import('./cards/tarotCardsDetails_hi.js');
                return module.tarotCardsDetailHi;
            }
            if (language === 'fr') {
                const module = await import('./cards/tarotCardsDetails_fr.js');
                return module.tarotCardsDetailFr;
            }
            const module = await import('./cards/tarotCardsDetails.js');
            return module.tarotCardsDetail;
        }

        if (type === symbolTypes.animals) {
            const module = await import('./cards/animalCardsDetails.js');
            return module.animalCardsDetail;
        }

        if (type === symbolTypes.hindu) {
            const module = await import('./cards/HinduDeities.js');
            return module.hinduDeitiesDetail;
        }

        if (type === symbolTypes.symbols) {
            const module = await import('./cards/symbolCardsDetails.js');
            return module.symbolCards;
        }

        if (type === symbolTypes.orixas) {
            const module = await import('./cards/OrixasDetail.js');
            return module.orixasDetail;
        }

        if (type === symbolTypes.saints) {
            const module = await import('./cards/saintsCardsDetail.js');
            return module.saintsCardDetails;
        }

        throw new Error(`Unknown symbology type: ${type}`);
    } catch (error) {
        console.error('Error loading cards:', error);
        throw error;
    }
}

