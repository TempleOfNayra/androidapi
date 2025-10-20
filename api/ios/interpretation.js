import { checkAuthAndRateLimit } from '../lib/gatekeeper.js';
import { setupCORS, handlePreflight, validateMethod } from './utils/http-setup.js';
import { getInterpretation } from './utils/step1-interpretation.js';
import { parseInterpretationSections } from './utils/parsing.js';
import { INDEX_TO_NAME } from '../services/cardsUtil.js';

const isProd = false;

export default async function handler(req, res) {

    setupCORS(res);

    // Handle preflight OPTIONS request
    if (handlePreflight(req, res)) {
        return;
    }

    if (!validateMethod(req, res, 'POST')) {
        return;
    }

    const step = req.body.step;

    if (isProd) {
        const auth = checkAuthAndRateLimit(req, step);
        if (!auth.allowed) {
            return res.status(auth.status).json({ error: auth.error });
        }
    }

    try {
        // Get input from request
        const {
            cards = [],
            symbology,
            journalEntry = '',
            intentionChips = [],
            wisdomStyle = 'campbell',
            spiritualityLevel = 1,
            lifeChapter,
            language = 'en',
            userName = null,
            model = 'claude',
            tarotCard,
            cardNumber
        } = req.body || {};

        // Use first card if multiple are provided
        const card = Array.isArray(cards) ? cards[0] : cards;

        // Get tarot card name from cardNumber if provided
        let tarotCardName = tarotCard;
        if (cardNumber !== undefined && cardNumber !== null && INDEX_TO_NAME[cardNumber]) {
            tarotCardName = INDEX_TO_NAME[cardNumber];
        }

        // STEP 1: Get interpretation
        const step1Result = await getInterpretation({
            card,
            symbology,
            journalEntry,
            intentionChips,
            wisdomStyle,
            spiritualityLevel,
            lifeChapter,
            userName,
            model,
            tarotCard: tarotCardName
        });

        const interpretation = step1Result.interpretation;

        // Parse sections programmatically
        const sections = parseInterpretationSections(interpretation);

        // Build final response structure
        const finalResult = {
            summaryTitle: "Sacred Story",
            symbology: symbology || "",
            mainCard: {
                cardName: card || "",
                cardNumber: cardNumber || "",
                displayName: card || "",
                symbolName: card || "",
                cardNameLocal: card || "",
                title: "MESSAGE", // TODO: Generate evocative title
                subtitle: "A Reflection by Nayra",
                section: "REFLECTION",
                // sectionName: "SECTION NAME", // TODO: Generate poetic name
                interpretation: sections.interpretation,
                wisdomTitle: 'Wisdom Teaching',
                wisdom: sections.wisdomTeaching,
                keyInsightsLabel: "Key Insights",
                keyInsights: sections.keyInsights || [],
                suggestedIntentions: sections.suggestedIntentions || [],
                summary: sections.sacredStoryIntroduction || "",
                dailyInspiration: sections.dailyInspiration || "",
            },
            // secondCard: {
            //     section: "",
            //     sectionName: "",
            //     subSectionName: "",
            //     cardName: "",
            //     symbolName: "",
            //     cardNameLocal: "",
            //     relationshipToFirst: "",
            //     interpretation: "",
            //     keyInsightsLabel: "",
            //     keyInsights: [],
            //     summary: ""
            // },
            // thirdCard: {
            //     section: "",
            //     sectionName: "",
            //     subSectionName: "",
            //     cardName: "",
            //     symbolName: "",
            //     cardNameLocal: "",
            //     timingInteraction: "",
            //     interpretation: "",
            //     keyInsightsLabel: "",
            //     keyInsights: [],
            //     summary: ""
            // },
            finalGuidance: {
                section: "",
                // sectionName: "Section Name",
                subSectionName: "",
                summary: sections.wisdomTeaching,
                guidance: sections.closingBlessing || "",

                practiceTitle: "",
                practice: sections.integration || "",

                blessingTitle: "",
                // closingBlessing: sections.closingBlessing || "",
                closingStatement: sections.closingStatement || ""
            }
        };

        res.status(200).json(finalResult);

    } catch (error) {
        console.error('iOS interpretation error:', error.message);
        res.status(500).json({ error: error.message });
    }
}