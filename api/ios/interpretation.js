import { checkAuthAndRateLimit } from '../lib/gatekeeper.js';
import { setupCORS, handlePreflight, validateMethod } from './utils/http-setup.js';
import { getInterpretation } from './utils/step1-interpretation.js';
import { generateMetadata } from './utils/step2-metadata.js';
import { buildFinalResponse } from './utils/parsing.js';
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
            cards = ['The Sun'],
            symbology = 'tarot',
            journalEntry = '',
            intentionChips = [],
            wisdomStyle = 'campbell',  // Default to campbell to match stylePrompts keys
            spiritualityLevel = 1,
            lifeChapter = 'building',
            language = 'en',
            userName = null,
            model = 'claude'
        } = req.body || {};

        console.log('🔵 Parsed params:', {
            cards, symbology, wisdomStyle, spiritualityLevel,
            lifeChapter, language, userName, model,
            journalEntryLength: journalEntry?.length || 0
        });

        console.log('++++++++++++++++++++++++++++');
        console.log(cards);
        console.log(intentionChips);
        console.log('++++++++++++++++++++++++++++');

        // Use first card if multiple are provided
        const card = Array.isArray(cards) ? cards[0] : cards;
        console.log('🔵 Using card:', card);

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
            model
        });

        const interpretation = step1Result.interpretation;
        const step1Time = step1Result.time;
        console.log('✅ Step 1 complete. Interpretation length:', interpretation?.length);
        console.log('📝 Interpretation preview:', interpretation?.substring(0, 200) + '...');

        // STEP 2: Generate metadata fields based on the interpretation
        console.log('\n🔮 === STEP 2: Generating Metadata ===')
        const step2Result = await generateMetadata(card, interpretation, model);
        const metadata = step2Result.metadata; // Already parsed JSON
        const step2Time = step2Result.time;
        console.log('✅ Step 2 complete. Metadata:', JSON.stringify(metadata, null, 2));

        // Combine into final structure
        console.log('\n🔧 === Building Final Response ===');
        const finalResult = buildFinalResponse(metadata, interpretation, card, symbology);
        console.log('📦 Final result structure:', JSON.stringify(finalResult, null, 2));

        const totalTime = Date.now() - startTime;

        console.log('\n✅ === iOS INTERPRETATION COMPLETE ===');
        console.log('Two separate API calls completed successfully');
        console.log('Interpretation quality preserved, metadata generated');
        console.log('\n⏱️ === TIMING SUMMARY ===');
        console.log(`⏱️ Step 1 (Interpretation): ${step1Time}ms`);
        console.log(`⏱️ Step 2 (Metadata):      ${step2Time}ms`);
        console.log(`⏱️ Total Time:             ${totalTime}ms`);
        console.log('========================\n');

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
Step 2 Time: ${step2Time}ms

Request Body:
${JSON.stringify(req.body, null, 2)}

System Prompt Used:
${step1Result.systemPrompt}

User Prompt Used:
${step1Result.userPrompt}

AI Response (Interpretation):
${interpretation}

Metadata Generated:
${JSON.stringify(metadata, null, 2)}

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