// /api/symbology/systems.js
import { getAvailableCards,getCardDetail } from '../services/cardsService.js';
import { symbolTypes } from "../symbol_types.js";
import { generateVoice } from './textToVoice.js';

export default async function handler(req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', 'https://www.nayra.io');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // Handle preflight OPTIONS request
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }
        const { what } = req.body;
        const { language } = req.body;

        if (what === 'available') {
            const { symbology } = req.body;
            if (symbology && symbology.toLowerCase() === symbolTypes.animals) {
                const cards = await getAvailableCards(symbolTypes.animals, language);
                return res.status(200).json(cards);
            }
            if (symbology && symbology.toLowerCase() === symbolTypes.tarot) {
                const cards = await getAvailableCards(symbolTypes.tarot, language);
                return res.status(200).json(cards.filter(card => !card.name.includes('Reversed')));
            }
            const cards = await getAvailableCards(symbology, language);
            return res.status(200).json(cards);

            // if (symbology && symbology.toLowerCase() === symbolTypes.rws) {
            //     return res.status(200).json(getAvailableCards(symbolTypes.rws, language));
            // }
            // if (symbology && symbology.toLowerCase() === symbolTypes.hindu) {
            //     return res.status(200).json(getAvailableCards(symbolTypes.hindu, language));
            // }
            // if (symbology && symbology.toLowerCase() === symbolTypes.orixas) {
            //     return res.status(200).json(getAvailableCards(symbolTypes.orixas, language));
            // }
            // if (symbology && symbology.toLowerCase() === symbolTypes.saints) {
            //     return res.status(200).json(getAvailableCards(symbolTypes.saints, language));
            // }
        }

        if (what === 'detail') {
            const name = req.body.cardName ||  req.body.name;
            const flow  = req.body.flow && req.body.flow.toLowerCase();
            let symbology = (req.body.symbology).toLowerCase();

            if (symbology === symbolTypes.rws) {
                symbology = symbolTypes.tarot;
            }

            const cardDetail = await getCardDetail(symbology, name, language, flow);
            return res.status(200).json({...cardDetail, symbology});
        }

        if (what === 'voice') {
            return generateVoice(req, res);
        }


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

