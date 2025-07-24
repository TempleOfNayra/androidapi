// /api/symbology/systems.js
import { getAvailableCards,getCardDetail } from '../services/cardsService.js';
import { symbolTypes } from "../symbol_types.js";

export default function handler(req, res) {
    try {
        const { what } = req.body;
        const { language } = req.body;

        console.log(language);

        if (what === 'available') {
            const { symbology } = req.body;
            if (symbology && symbology.toLowerCase() === symbolTypes.animals) {
                return res.status(200).json(getAvailableCards(symbolTypes.animals));
            }
            if (symbology && symbology.toLowerCase() === symbolTypes.tarot) {
                return res.status(200).json(getAvailableCards(symbolTypes.tarot, language)
                    .filter(card => !card.name.includes('Reversed')));
            }
            if (symbology && symbology.toLowerCase() === symbolTypes.rws) {
                return res.status(200).json(getAvailableCards(symbolTypes.rws, language));
            }
            if (symbology && symbology.toLowerCase() === symbolTypes.hindu) {
                return res.status(200).json(getAvailableCards(symbolTypes.hindu));
            }
            if (symbology && symbology.toLowerCase() === symbolTypes.orixas) {
                return res.status(200).json(getAvailableCards(symbolTypes.orixas));
            }
        }

        if (what === 'detail') {
            const name = req.body.cardName ||  req.body.name;
            const symbology = (req.body.symbology).toLowerCase();

            if (symbology === symbolTypes.rws) {
                const detail = {...getCardDetail(symbolTypes.tarot, name, language), symbology}
                return res.status(200).json(detail);
            }

            return res.status(200).json({...getCardDetail(symbology, name, language), symbology});
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

