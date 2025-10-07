// /api/symbology/textToVoice.js

// Convert structured content to SSML format (handles interpretation JSON)
function structureToSSML(content) {
    if (!content) return null;

    let ssml = '<speak>';

    // Check if this is an interpretation JSON with mainCard structure
    if (content.mainCard) {
        const card = content.mainCard;

        // Also check for the interpretation field (the main reflection text)
        // It can be at root level or inside mainCard
        const interpretation = content.interpretation || content.reflection || card.interpretation || card.reflection || '';

        // Opening moment of silence for meditation preparation
        ssml += '<break time="1.5s"/>';

        // 1. TITLE - read as an invocation with gravitas
        if (card.title) {
            ssml += '<prosody rate="80%" pitch="-1st" volume="soft">';
            ssml += `<emphasis level="strong">${card.title}</emphasis>`;
            ssml += '</prosody>';
            ssml += '<break time="1.5s"/>';
        }

        // 2. SUMMARY TITLE
        if (content.summaryTitle) {
            ssml += '<prosody rate="85%" pitch="-0.5st">';
            ssml += `<emphasis level="moderate">${content.summaryTitle}</emphasis>`;
            ssml += '</prosody>';
            ssml += '<break time="800ms"/>';
        }

        // 3. SUMMARY - the core message, read thoughtfully
        if (card.summary) {
            ssml += '<prosody rate="92%" pitch="-1st">';
            ssml += card.summary;
            ssml += '</prosody>';
            ssml += '<break time="2s"/>';  // Longer pause for reflection
        } else {
            console.log('⚠️ WARNING: No summary found in mainCard');
        }

        // 4. ABOUT SYMBOL TITLE
        if (card.aboutSymbolTitle) {
            console.log('✅ Adding aboutSymbolTitle:', card.aboutSymbolTitle.substring(0, 50));
            ssml += '<break time="1s"/>';
            ssml += '<prosody rate="95%" pitch="0st">';
            ssml += `<emphasis level="moderate">${card.aboutSymbolTitle}</emphasis>`;
            ssml += '</prosody>';
            ssml += '<break time="800ms"/>';
        } else {
            console.log('⚠️ No aboutSymbolTitle found');
        }

        // 5. ABOUT SYMBOL - educational tone
        if (card.aboutSymbol) {
            console.log('✅ Adding aboutSymbol:', card.aboutSymbol.substring(0, 50));
            ssml += '<prosody rate="98%" pitch="-0.5st">';
            ssml += card.aboutSymbol;
            ssml += '</prosody>';
            ssml += '<break time="2s"/>';
        } else {
            console.log('⚠️ No aboutSymbol found');
        }

        // 6. SUBTITLE - after about symbol as per order
        if (card.subtitle) {
            console.log('✅ Already added subtitle earlier');
        }

        // 7. INTERPRETATION - the main reflection text (most important part)
        if (interpretation) {
            console.log('✅ Adding interpretation:', interpretation.substring(0, 50));
            // Read the interpretation with deep, contemplative voice
            ssml += '<prosody rate="88%" pitch="-1st" volume="medium">';
            ssml += interpretation;
            ssml += '</prosody>';

            // Important pause after interpretation
            ssml += '<break time="3s"/>';
        } else {
            console.log('⚠️ WARNING: No interpretation or reflection text found!');
            console.log('  - content.interpretation:', !!content.interpretation);
            console.log('  - content.reflection:', !!content.reflection);
        }

        // 8. KEY INSIGHTS LABEL
        if (card.keyInsightsLabel) {
            console.log('✅ Adding keyInsightsLabel:', card.keyInsightsLabel);
            ssml += '<prosody rate="90%" pitch="-0.5st" volume="soft">';
            ssml += `<emphasis level="moderate">${card.keyInsightsLabel}</emphasis>`;
            ssml += '</prosody>';
            ssml += '<break time="1s"/>';
        } else {
            console.log('⚠️ No keyInsightsLabel found');
        }

        // 9. KEY INSIGHTS - each one as a meditation point
        if (card.keyInsights && Array.isArray(card.keyInsights)) {
            console.log('✅ Adding', card.keyInsights.length, 'key insights');
            card.keyInsights.forEach((insight, index) => {
                // Add breathing space between insights
                if (index > 0) {
                    ssml += '<break time="800ms"/>';
                }

                ssml += '<prosody rate="88%" pitch="-1st" volume="medium">';
                ssml += insight;
                ssml += '</prosody>';

                // Pause for contemplation
                ssml += '<break time="1.2s"/>';
            });

            // Final pause after all insights
            ssml += '<break time="2s"/>';
        } else {
            console.log('⚠️ No keyInsights found');
        }

        // Optional: Daily Inspiration if present (not in the specified order but keeping it)
        if (card.dailyInspiration) {
            ssml += '<break time="1.5s"/>';
            ssml += '<prosody rate="85%" pitch="-1.5st" volume="soft">';
            ssml += `<emphasis level="strong">${card.dailyInspiration}</emphasis>`;
            ssml += '</prosody>';
            ssml += '<break time="2s"/>';
        }

    } else {
        // Fallback to original structure for generic content
        // Main title - slower, with emphasis and pause after
        if (content.title) {
            ssml += `<prosody rate="85%"><emphasis level="strong">${content.title}</emphasis></prosody>`;
            ssml += '<break time="1s"/>';
        }

        // Subtitle - moderate emphasis with pause
        if (content.subtitle) {
            ssml += `<prosody rate="90%"><emphasis level="moderate">${content.subtitle}</emphasis></prosody>`;
            ssml += '<break time="800ms"/>';
        }

        // Summary - normal rate with pause after
        if (content.summary) {
            ssml += `${content.summary}`;
            ssml += '<break time="1s"/>';
        }

        // Sections with headers
        if (content.sections && Array.isArray(content.sections)) {
            content.sections.forEach(section => {
                // Section title - slight emphasis
                if (section.title) {
                    ssml += '<break time="500ms"/>';
                    ssml += `<prosody rate="90%"><emphasis level="moderate">${section.title}</emphasis></prosody>`;
                    ssml += '<break time="500ms"/>';
                }
                // Section content - normal reading
                if (section.content) {
                    ssml += `${section.content}`;
                    ssml += '<break time="700ms"/>';
                }
            });
        }

        // Main body text
        if (content.body) {
            ssml += content.body;
        }

        // Conclusion with slight pause before
        if (content.conclusion) {
            ssml += '<break time="1s"/>';
            ssml += `<prosody rate="95%">${content.conclusion}</prosody>`;
        }
    }

    ssml += '</speak>';
    return ssml;
}

// Convert structured content to plain text (fallback for ElevenLabs)
function structureToPlainText(content) {
    if (!content) return null;

    let plainText = '';

    // Check if this is an interpretation JSON with mainCard structure
    if (content.mainCard) {
        const card = content.mainCard;

        // Also check for the interpretation field (the main reflection text)
        // It can be at root level or inside mainCard
        const interpretation = content.interpretation || content.reflection || card.interpretation || card.reflection || '';

        // 1. TITLE
        if (card.title) {
            plainText += card.title + '.\n\n';
        }

        // 2. SUMMARY TITLE
        if (content.summaryTitle) {
            plainText += content.summaryTitle + '.\n\n';
        }

        // 3. SUMMARY
        if (card.summary) {
            plainText += card.summary + '\n\n...\n\n';  // Natural pause with ellipsis
        }

        // 4. ABOUT SYMBOL TITLE
        if (card.aboutSymbolTitle) {
            plainText += card.aboutSymbolTitle + '.\n\n';
        }

        // 5. ABOUT SYMBOL
        if (card.aboutSymbol) {
            plainText += card.aboutSymbol + '\n\n...\n\n';
        }

        // 6. SUBTITLE
        if (card.subtitle) {
            plainText += card.subtitle + '.\n\n';
        }

        // 7. INTERPRETATION (main reflection text)
        if (interpretation) {
            plainText += interpretation + '\n\n...\n\n...\n\n';  // Longer pause after interpretation
        }

        // 8. KEY INSIGHTS LABEL
        if (card.keyInsightsLabel) {
            plainText += card.keyInsightsLabel + '.\n\n';
        }

        // 9. KEY INSIGHTS
        if (card.keyInsights && Array.isArray(card.keyInsights)) {
            card.keyInsights.forEach((insight, index) => {
                plainText += insight + '.\n\n';
            });
            plainText += '...\n\n';
        }

        // Optional: Daily Inspiration
        if (card.dailyInspiration) {
            plainText += card.dailyInspiration + '.';
        }

    } else {
        // Fallback to original structure for generic content
        if (content.title) {
            plainText += content.title + '.\n\n';
        }

        if (content.subtitle) {
            plainText += content.subtitle + '.\n\n';
        }

        if (content.summary) {
            plainText += content.summary + '\n\n';
        }

        if (content.sections && Array.isArray(content.sections)) {
            content.sections.forEach(section => {
                if (section.title) {
                    plainText += '\n' + section.title + '.\n';
                }
                if (section.content) {
                    plainText += section.content + '\n';
                }
            });
        }

        if (content.body) {
            plainText += '\n' + content.body;
        }

        if (content.conclusion) {
            plainText += '\n\n' + content.conclusion;
        }
    }

    return plainText.trim();
}

export async function generateVoice(req, res) {
    console.log('\n🎙️ === VOICE GENERATION REQUEST ===');
    console.log('📝 Request body:', JSON.stringify(req.body, null, 2));

    const {
        text,
        voice_id,
        model_id,
        language_code,
        language,
        // Voice settings for tone control
        stability,
        similarity_boost,
        style,
        use_speaker_boost,
        // Provider selection (defaults to elevenlabs)
        provider = 'elevenlabs',
        // Structured content with title, subtitle, body, etc.
        structured_content = null
    } = req.body;

    // Process structured content if provided
    let finalText = text;
    let useSSML = false;

    if (structured_content) {
        console.log('📄 === FULL STRUCTURED CONTENT (NO TRUNCATION) ===');
        console.log(JSON.stringify(structured_content, null, 2));
        console.log('📄 === END STRUCTURED CONTENT ===');

        // Log what fields are present
        console.log('🔍 Content structure analysis:');
        console.log('  - Has mainCard:', !!structured_content.mainCard);
        console.log('  - Has interpretation:', !!structured_content.interpretation);
        console.log('  - Has reflection:', !!structured_content.reflection);
        console.log('  - Has summaryTitle:', !!structured_content.summaryTitle);

        if (structured_content.mainCard) {
            const card = structured_content.mainCard;
            console.log('  - mainCard.title:', !!card.title);
            console.log('  - mainCard.subtitle:', !!card.subtitle);
            console.log('  - mainCard.summary:', !!card.summary);
            console.log('  - mainCard.aboutSymbolTitle:', !!card.aboutSymbolTitle);
            console.log('  - mainCard.aboutSymbol:', !!card.aboutSymbol);
            console.log('  - mainCard.keyInsightsLabel:', !!card.keyInsightsLabel);
            console.log('  - mainCard.keyInsights:', Array.isArray(card.keyInsights) ? card.keyInsights.length : 0);
            console.log('  - mainCard.dailyInspiration:', !!card.dailyInspiration);
        }

        if (provider === 'google') {
            // Google supports SSML for better structured reading
            finalText = structureToSSML(structured_content);
            useSSML = true;
            console.log('🎯 Generated SSML for Google TTS');
            console.log('📝 SSML content (first 500 chars):', finalText.substring(0, 500));
            console.log('📝 SSML content (last 500 chars):', finalText.substring(finalText.length - 500));
        } else {
            // ElevenLabs doesn't support SSML, use plain text with natural pauses
            finalText = structureToPlainText(structured_content);
            console.log('📝 Generated plain text for ElevenLabs');
            console.log('📝 Plain text content (first 500 chars):', finalText.substring(0, 500));
        }
    }

    console.log('📋 Extracted params:');
    console.log('  - provider:', provider);
    console.log('  - text length:', finalText?.length || 0, 'characters');
    console.log('  - text preview:', finalText?.substring(0, 100) + (finalText?.length > 100 ? '...' : ''));
    console.log('  - language:', language);
    console.log('  - voice_id requested:', voice_id || 'none (will use default)');
    console.log('  - model_id requested:', model_id || 'none (will use default)');
    console.log('  - voice settings:', { stability, similarity_boost, style, use_speaker_boost });
    console.log('  - using SSML:', useSSML);

    // Validate required parameters
    if (!finalText) {
        console.error('❌ ERROR: No text or structured content provided');
        return res.status(400).json({ error: 'Text or structured_content is required for voice generation' });
    }

    // Route to appropriate provider
    if (provider === 'google') {
        return generateGoogleVoice(req, res, finalText, useSSML);
    }

    // ElevenLabs API configuration
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
    if (!ELEVENLABS_API_KEY) {
        console.error('❌ ERROR: ELEVENLABS_API_KEY not found in environment');
        return res.status(500).json({ error: 'ElevenLabs API key not configured' });
    }
    console.log('✅ API Key found:', ELEVENLABS_API_KEY.substring(0, 10) + '...');

    // VOICE SELECTION GUIDE:
    // FEMALE - Warm, soft voices (great for meditation):
    // - 'Xb7hH8MSUJpSbSDYk0k2' - Alice (warm, multilingual)
    // - 'EXAVITQu4vr4xnSDxMaL' - Bella (soft, calming)
    // - 'MF3mGyEYCl7XYWbV9V6O' - Elli (gentle, young)
    // - 'jsCqWAovK2LkecY7zXl4' - Freya (warm, expressive)
    // - 'ThT5KcBeYPX3keUQqHPh' - Dorothy (British, soothing)
    // - 'pFZP5JQG7iQjIQuC4Bku' - Lily (warm, narrative)

    // MALE - Warm, grandfather-like voices (great for meditation):
    // - 'JBFqnCBsd6RMkjVDRZzb' - George (British, actual grandfather voice) ⭐ BEST
    // - 'onwK4e9ZLuTAKqWW03F9' - Daniel (British, warm, older)
    // - 'TxGEqnHWrfWFTfGW9XjX' - Thomas (calm, steady, mature)
    // - 'VR6AewLTigWG4xSOukaG' - Arnold (deep, storytelling)
    // - 'pNInz6obpgDQGcFmaJgB' - Adam (deep, calm, professional)
    // - 'yoZ06aMxZJJ28mfd3POQ' - Sam (warm, raspy, grandfather-like)
    // - 'GBv7mTt0atIp3Br8iCZE' - Callum (American, warm, calm)
    // - 'N2lVS1w4EtoT3dr4eOWO' - Marcus (deep, soothing, mature)

    // Default to the actual grandfather voice
    const selectedVoiceId = voice_id || 'JBFqnCBsd6RMkjVDRZzb'; // Default: George (British grandfather)

    // Model selection best practices:
    // - eleven_turbo_v2: Fastest, good quality, English only
    // - eleven_multilingual_v2: Best for non-English, slightly slower
    // - eleven_monolingual_v1: Legacy, good for English
    const selectedModelId = model_id || (language === 'en' ? 'eleven_turbo_v2' : 'eleven_multilingual_v2');

    // VOICE SETTINGS GUIDE for warmer/softer voice:
    // stability: 0.3-0.5 for more expressive (lower = more variation)
    // similarity_boost: 0.6-0.8 for natural sound
    // style: 0.2-0.4 for more expression (only works with v2 models)
    // use_speaker_boost: true for clarity

    const voiceSettings = {
        stability: stability ?? 0.4,              // Lower for more expression (default was 0.5)
        similarity_boost: similarity_boost ?? 0.7, // Balanced natural sound
        style: style ?? 0.3,                      // Add warmth and expression
        use_speaker_boost: use_speaker_boost ?? true
    };

    console.log('🎯 Using configuration:');
    console.log('  - Selected voice_id:', selectedVoiceId);
    console.log('  - Selected model_id:', selectedModelId);
    console.log('  - Voice settings:', voiceSettings);

    try {
        const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`;
        console.log('🌐 API URL:', apiUrl);

        const requestBody = {
            text: finalText,  // Use the processed text
            model_id: selectedModelId,
            voice_settings: voiceSettings,
            ...(language_code && { language_code })
        };

        console.log('📤 Request to ElevenLabs:', JSON.stringify(requestBody, null, 2));
        console.log('⏱️ Starting API call to ElevenLabs...');
        const startTime = Date.now();

        // ElevenLabs Text-to-Speech API call
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY
            },
            body: JSON.stringify(requestBody)
        });

        const elapsedTime = Date.now() - startTime;
        console.log(`⏱️ ElevenLabs API responded in ${elapsedTime}ms`);
        console.log('📥 Response status:', response.status, response.statusText);
        console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ ElevenLabs API error response:', errorText);
            console.error('❌ Response status:', response.status);

            // Parse error for common issues
            let errorMessage = 'Voice generation failed';
            let userMessage = errorMessage;

            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.detail?.message || errorJson.detail || errorJson.message || errorText;

                // Check for common quota/credit errors
                if (errorText.includes('quota') || errorText.includes('limit') || errorText.includes('credits')) {
                    userMessage = 'Voice generation quota exceeded. Your ElevenLabs free credits may have run out.';
                    console.error('💳 QUOTA ERROR: User has likely exceeded their ElevenLabs free tier limit (10,000 characters/month)');
                } else if (response.status === 401) {
                    userMessage = 'Authentication failed. Check your ElevenLabs API key.';
                    console.error('🔑 AUTH ERROR: Invalid or expired API key');
                } else if (response.status === 422) {
                    userMessage = 'Invalid request parameters. Check voice_id and model_id.';
                    console.error('⚠️ VALIDATION ERROR: Invalid parameters sent to ElevenLabs');
                }
            } catch (e) {
                console.error('Could not parse error JSON:', e);
            }

            return res.status(response.status).json({
                error: userMessage,
                details: errorMessage,
                status: response.status,
                suggestion: response.status === 422 ?
                    'Check that the voice_id exists and model_id is valid' :
                    response.status === 401 ?
                    'Verify your ELEVENLABS_API_KEY is correct' :
                    'Check your ElevenLabs dashboard at https://elevenlabs.io/app/subscription for usage limits'
            });
        }

        console.log('✅ Voice generation successful!');

        // Get audio buffer
        const audioBuffer = await response.arrayBuffer();
        console.log('📦 Audio buffer size:', audioBuffer.byteLength, 'bytes');

        // Best practice: Return base64 encoded audio for easier handling
        const base64Audio = Buffer.from(audioBuffer).toString('base64');
        console.log('📦 Base64 encoded size:', base64Audio.length, 'characters');

        const responseData = {
            audio: `data:audio/mpeg;base64,${base64Audio}`,
            voice_id: selectedVoiceId,
            model_id: selectedModelId,
            text_length: finalText.length,
            character_count: finalText.length
        };

        console.log('✅ === VOICE GENERATION COMPLETE ===');
        console.log('📊 Summary:');
        console.log('  - Characters used:', finalText.length);
        console.log('  - Audio size:', audioBuffer.byteLength, 'bytes');
        console.log('  - Response time:', elapsedTime, 'ms');

        return res.status(200).json(responseData);

    } catch (error) {
        console.error('💥 UNEXPECTED ERROR in voice generation:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).json({
            error: 'Failed to generate voice',
            details: error.message,
            type: 'unexpected_error'
        });
    }
}

// Google Text-to-Speech implementation
async function generateGoogleVoice(req, res, processedText, isSSML) {
    console.log('\n🔊 === GOOGLE TTS GENERATION ===');

    // Default to slightly slower and deeper for Alan Watts style
    const { text, language = 'en', voice_id, speaking_rate = 0.9, pitch = -2.0 } = req.body;

    // Use processed text if provided, otherwise use original text
    const finalText = processedText || text;

    // Google Cloud TTS API key
    const GOOGLE_TTS_API_KEY = process.env.GOOGLE_TTS_API_KEY;
    if (!GOOGLE_TTS_API_KEY) {
        console.error('❌ ERROR: GOOGLE_TTS_API_KEY not found in environment');
        return res.status(500).json({ error: 'Google TTS API key not configured' });
    }

    // Google TTS voice selection
    // WARM MALE VOICES - Alan Watts style (storyteller/grandfather)
    // Best options for warm, deep, contemplative voice:
    // - 'en-US-Neural2-J': Warm male, deep, contemplative (BEST for Alan Watts style)
    // - 'en-US-Studio-M': Professional studio male, warm and deep
    // - 'en-US-Wavenet-I': Deep male, warm tone
    // - 'en-US-Wavenet-J': Warm male, good for narration
    // - 'en-US-Neural2-D': Natural male voice
    // - 'en-US-Standard-J': Deep warm standard voice

    const googleVoices = {
        'en': {
            male: 'en-US-Standard-J',        // Deep warm standard
            female: 'en-US-Standard-C',      // Warm female voice
            neural: 'en-US-Neural2-J',       // Best Alan Watts style - warm, deep, contemplative
            studio: 'en-US-Studio-M',        // Studio quality warm male
            wavenet: 'en-US-Wavenet-I'       // Deep warm wavenet
        },
        'es': {
            male: 'es-ES-Standard-B',
            female: 'es-ES-Standard-A',
            neural: 'es-ES-Neural2-B'        // Warm male Spanish
        },
        'fr': {
            male: 'fr-FR-Standard-B',
            female: 'fr-FR-Standard-C',
            neural: 'fr-FR-Neural2-B'        // Warm male French
        }
    };

    // Select voice based on language and preference
    const languageCode = language === 'en' ? 'en-US' :
                        language === 'es' ? 'es-ES' :
                        language === 'fr' ? 'fr-FR' : 'en-US';

    // Default to Neural2-J for English (best Alan Watts style voice)
    const selectedVoice = voice_id || googleVoices[language]?.neural || 'en-US-Neural2-J';

    console.log('🎯 Google TTS Configuration:');
    console.log('  - Voice:', selectedVoice);
    console.log('  - Language:', languageCode);
    console.log('  - Speaking rate:', speaking_rate);
    console.log('  - Pitch:', pitch);
    console.log('  - Is SSML:', isSSML);
    console.log('  - Final text type:', isSSML ? 'SSML' : 'Plain text');
    console.log('  - Final text length:', finalText?.length || 0);

    // Log the actual content being sent
    if (isSSML) {
        console.log('📜 SSML being sent to Google TTS:');
        console.log(finalText);
    } else {
        console.log('📜 Plain text being sent to Google TTS (first 1000 chars):');
        console.log(finalText?.substring(0, 1000));
    }

    try {
        const requestBody = {
            input: isSSML ? { ssml: finalText } : { text: finalText },
            voice: {
                languageCode: languageCode,
                name: selectedVoice,
                // SSML_VOICE_GENDER is optional, Google will infer from voice name
            },
            audioConfig: {
                audioEncoding: 'MP3',
                speakingRate: speaking_rate,  // 0.25 to 4.0, 1.0 is normal
                pitch: pitch,                  // -20.0 to 20.0, 0.0 is normal
                volumeGainDb: 0.0              // -96.0 to 16.0
            }
        };

        console.log('📤 Request to Google TTS:', JSON.stringify(requestBody, null, 2));
        const startTime = Date.now();

        const response = await fetch(
            `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            }
        );

        const elapsedTime = Date.now() - startTime;
        console.log(`⏱️ Google TTS responded in ${elapsedTime}ms`);
        console.log('📥 Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Google TTS error:', errorText);

            let userMessage = 'Google voice generation failed';
            if (response.status === 403) {
                userMessage = 'Google TTS API key is invalid or API not enabled';
            } else if (response.status === 429) {
                userMessage = 'Google TTS quota exceeded';
            }

            return res.status(response.status).json({
                error: userMessage,
                details: errorText,
                suggestion: 'Check Google Cloud Console for API status and quotas'
            });
        }

        const data = await response.json();

        // Google returns base64 encoded audio in audioContent field
        if (!data.audioContent) {
            console.error('❌ No audio content in Google response');
            return res.status(500).json({ error: 'No audio generated from Google TTS' });
        }

        console.log('✅ Google TTS generation successful!');
        console.log('📦 Base64 audio length:', data.audioContent.length);

        return res.status(200).json({
            audio: `data:audio/mpeg;base64,${data.audioContent}`,
            voice_id: selectedVoice,
            provider: 'google',
            language: languageCode,
            character_count: finalText.length
        });

    } catch (error) {
        console.error('💥 Google TTS error:', error);
        return res.status(500).json({
            error: 'Failed to generate voice with Google',
            details: error.message,
            type: 'google_tts_error'
        });
    }
}