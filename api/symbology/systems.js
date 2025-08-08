// /api/symbology/systems.js
import { getAvailableCards,getCardDetail } from '../services/cardsService.js';
import { symbolTypes } from "../symbol_types.js";

export default function handler(req, res) {
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
                return res.status(200).json(getAvailableCards(symbolTypes.animals, language));
            }
            if (symbology && symbology.toLowerCase() === symbolTypes.tarot) {
                return res.status(200).json(getAvailableCards(symbolTypes.tarot, language)
                    .filter(card => !card.name.includes('Reversed')));
            }
            if (symbology && symbology.toLowerCase() === symbolTypes.rws) {
                return res.status(200).json(getAvailableCards(symbolTypes.rws, language));
            }
            if (symbology && symbology.toLowerCase() === symbolTypes.hindu) {
                return res.status(200).json(getAvailableCards(symbolTypes.hindu, language));
            }
            if (symbology && symbology.toLowerCase() === symbolTypes.orixas) {
                return res.status(200).json(getAvailableCards(symbolTypes.orixas, language));
            }
        }

        if (what === 'detail') {
            const name = req.body.cardName ||  req.body.name;
            const symbology = (req.body.symbology).toLowerCase();
            const flow  = req.body.flow && req.body.flow.toLowerCase();

            if (symbology === symbolTypes.rws) {
                const detail = {...getCardDetail(symbolTypes.tarot, name, language, flow), symbology}
                return res.status(200).json(detail);
            }

            return res.status(200).json({...getCardDetail(symbology, name, language), symbology});
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

