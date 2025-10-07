import { checkAuthAndRateLimit } from '../lib/gatekeeper.js';
import { setupCORS, handlePreflight, validateMethod } from './utils/http-setup.js';
import { getInterpretation } from './utils/step1-interpretation.js';
// import { generateMetadata } from './utils/step2-metadata.js';
import { parseInterpretationSections } from './utils/parsing.js';
import { INDEX_TO_NAME } from '../services/cardsUtil.js';
import { appendFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_FILE = join(__dirname, '../../interpretation_results.txt');

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
        console.log('\n🔵 === iOS INTERPRETATION API CALLED ===');
        console.log('🔵 Request body:', JSON.stringify(req.body, null, 2));

        const startTime = Date.now();

        // Get input from request
        const {
            cards = [],
            symbology,
            journalEntry = '',
            intentionChips = [],
            wisdomStyle = 'campbell',  // Default to campbell to match stylePrompts keys
            spiritualityLevel = 1,
            lifeChapter,
            language = 'en',
            userName = null,
            model = 'claude',
            tarotCard,
            cardNumber
        } = req.body || {};

        console.log('🔵 Parsed params:', {
            cards, symbology, wisdomStyle, spiritualityLevel,
            lifeChapter, language, userName, model, tarotCard, cardNumber,
            journalEntryLength: journalEntry?.length || 0
        });



        // Use first card if multiple are provided
        const card = Array.isArray(cards) ? cards[0] : cards;

        // Get tarot card name from cardNumber if provided
        let tarotCardName = tarotCard;
        if (cardNumber !== undefined && cardNumber !== null && INDEX_TO_NAME[cardNumber]) {
            tarotCardName = INDEX_TO_NAME[cardNumber];
            console.log('🔵 Resolved tarot card from cardNumber:', cardNumber, '->', tarotCardName);
        }

        console.log('🔵 Using card:', card);
        console.log('🔵 Using tarot card:', tarotCardName);

        // STEP 1: Get natural, high-quality interpretation
        console.log('\n📝 === STEP 1: Getting Interpretation ===')
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
        const step1Time = step1Result.time;
        console.log('✅ Step 1 complete. Interpretation length:', interpretation?.length);
        console.log('📝 Interpretation preview:', interpretation?.substring(0, 200) + '...');

        // Parse sections programmatically
        console.log('\n📝 === Parsing Interpretation Sections ===');
        const sections = parseInterpretationSections(interpretation);
        console.log('✅ Parsed sections:', Object.keys(sections));

        const totalTime = Date.now() - startTime;

        console.log('\n✅ === INTERPRETATION COMPLETE ===');
        console.log('\n⏱️ === TIMING SUMMARY ===');
        console.log(`⏱️ Step 1 (Interpretation): ${step1Time}ms`);
        console.log(`⏱️ Total Time:             ${totalTime}ms`);
        console.log('========================\n');

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
                keyInsights: [], // TODO: Extract from wisdom teaching
                summary: sections.sacredStoryIntroduction || "",
                dailyInspiration: sections.dailyInspiration || "",
                meditationMantra: sections.meditationMantra || ""
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
                section: "INTEGRATION",
                // sectionName: "Section Name",
                subSectionName: "PRACTICE",
                guidance: "",
                practice: sections.integration || "",
                summary: sections.closingBlessing || ""
            }
        };

        // Write results to file
        try {
            const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
            const logEntry = `
========================================
API Call: ${timestamp}
Model: ${model}
Card: ${card}
Symbology: ${symbology}
========================================

Total Time: ${totalTime}ms
Step 1 Time: ${step1Time}ms

Request Body:
${JSON.stringify(req.body, null, 2)}

System Prompt Used:
${step1Result.systemPrompt}

User Prompt Used:
${step1Result.userPrompt}

AI Response (Interpretation):
${interpretation}

Parsed Sections:
${JSON.stringify(sections, null, 2)}

Final Result:
${JSON.stringify(finalResult, null, 2)}

`;
            appendFileSync(OUTPUT_FILE, logEntry);
            console.log(`📝 Results appended to ${OUTPUT_FILE}`);
        } catch (fileError) {
            console.error('⚠️ Failed to write to file:', fileError.message);
        }

        console.log('🚀 Sending response with status 200');
        console.log('🚀 Response preview:', JSON.stringify(finalResult));
        res.status(200).json(finalResult);
        
    } catch (error) {
        console.error('❌ === iOS HANDLER FAILED ===');
        console.error('❌ Error message:', error.message);
        console.error('❌ Error stack:', error.stack);
        console.error('❌ Full error:', error);
        res.status(500).json({ error: error.message });
    }
}