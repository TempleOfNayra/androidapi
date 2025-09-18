import { checkAuthAndRateLimit } from '../lib/gatekeeper.js';
import { setupCORS, handlePreflight, validateMethod } from './utils/http-setup.js';
import { getInterpretation } from './utils/step1-interpretation.js';
import { generateMetadata } from './utils/step2-metadata.js';
import { parseMetadataJSON, buildFinalResponse } from './utils/parsing.js';

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
        const startTime = Date.now();
        
        // Get input from request
        const {
            cards = ['The Sun'],
            symbology = 'tarot',
            journalEntry = '',
            wisdomStyle = 'campbell',  // Default to campbell to match stylePrompts keys
            spiritualityLevel = 1,
            lifeChapter = 'building',
            language = 'en',
            userName = null,
            model = 'claude'
        } = req.body || {};

        // Use first card if multiple are provided
        const card = Array.isArray(cards) ? cards[0] : cards;

        // STEP 1: Get natural, high-quality interpretation
        const step1Result = await getInterpretation({
            card,
            symbology,
            journalEntry,
            wisdomStyle,
            spiritualityLevel,
            lifeChapter,
            userName,
            model
        });

        const interpretation = step1Result.interpretation;
        const step1Time = step1Result.time;

        // STEP 2: Generate metadata fields based on the interpretation
        const step2Result = await generateMetadata(card, interpretation, model);
        const metadata = step2Result.metadata; // Already parsed JSON
        const step2Time = step2Result.time;

        // Combine into final structure
        const finalResult = buildFinalResponse(metadata, interpretation, card, cards, symbology);

        const totalTime = Date.now() - startTime;
        
        console.log('\n=== iOS INTERPRETATION COMPLETE ===');
        console.log('Two separate API calls completed successfully');
        console.log('Interpretation quality preserved, metadata generated');
        console.log('\n⏱️ === TIMING SUMMARY ===');
        console.log(`⏱️ Step 1 (Interpretation): ${step1Time}ms`);
        console.log(`⏱️ Step 2 (Metadata):      ${step2Time}ms`);
        console.log(`⏱️ Total Time:             ${totalTime}ms`);
        console.log('========================\n');
        
        res.status(200).json(finalResult);
        
    } catch (error) {
        console.error('Handler failed:', error);
        res.status(500).json({ error: error.message });
    }
}