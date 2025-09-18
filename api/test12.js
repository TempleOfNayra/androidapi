// pages/api/reading.js
export default async function handler(req, res) {
  // --- CORS (adjust origin in prod) ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // --- Input (dynamic) ---
    const {
      card = 'The Sun',
      symbology = 'tarot',                 // e.g., 'tarot' | 'orixas' | 'hindu' | 'animal'
      journalEntry = 'I want more joy in life.',
      wisdomStyle = 'psychological',       // free-form tag
      spiritualityLevel = 1,               // number or string
      lifeChapter = 'building',            // e.g., 'building', 'transition', 'healing'
      language = 'en'
    } = (req.method === 'POST' ? req.body : req.query) || {};

    // --- System prompt (warm + deep + actionable, JSON guardrails) ---
    const systemPrompt = `
You are someone with deep psychological insight who understands the symbolic language of human nature and spiritual archetypes.
Respond with reflections that are profound yet gentle—never clinical. Blend psychological wisdom with warmth, metaphor, and mythic clarity.
Affirm feelings, highlight strengths, and offer 1–2 simple practices or micro-rituals. Favor clear, human language over theory.
Conclude with a brief inspiring image or question that leaves the person hopeful and grounded.
When later converting to JSON, do not paraphrase—copy sentences verbatim from your reflection (escape quotes/newlines). 
Do not use markdown code fences anywhere. Aim for ~200–300 words before any structured output.
    `.trim();

    // --- User prompt (fenced sections + dynamic fields + strict JSON rules) ---
    const userPrompt = `
Card: "${card}"
Symbology: ${symbology}
Journal Entry: ${journalEntry}
Wisdom Style: ${wisdomStyle}
Spirituality Level: ${spiritualityLevel}
Life Chapter: ${lifeChapter}
Language: ${language}

INSTRUCTIONS (FOLLOW EXACTLY):

STEP 1 — Reflection (MUST)
- Write a natural, supportive reflection (200–300 words).
- Weave in ALL of:
  • symbolic meaning + one lesser-known aspect of "${card}"
  • how "${card}" connects to this specific situation
  • where this energy might be felt in the body
  • how they already embody aspects of "${card}"
  • one specific practice/micro-ritual aligned with the symbol's energy
  • 1–2 psychological insights about their journey
  • a short poetic phrase that captures the essence
- End with a brief inspiring image or question.
- Output the reflection inside these tags ONLY (no extra text before/after):
<reflection>
...your paragraphs...
</reflection>

STEP 2 — JSON (MUST)
- Extract content VERBATIM from the reflection (no new ideas, no paraphrase).
- Escape quotes/newlines. No markdown code fences. Output NOTHING after </json>.
- If a field needs shortening, trim the original sentence without changing its wording.

Output JSON inside these tags ONLY:
<json>
{
  "summaryTitle": "Summary",
  "mainCard": {
    "title": "[Poetic phrase from your reflection capturing the essence]",
    "subtitle": "A ${symbology} Reading with Psychological Insight",
    "aboutSymbol": "[3–4 sentences about ${card}, including a lesser-known aspect—copied from reflection]",
    "cardName": "${card}",
    "symbolName": "${card}",
    "summary": "[2–3 sentences capturing ${card} in their life—verbatim]",
    "interpretation": "[The main body of your reflection—copied or lightly trimmed, verbatim]",
    "keyInsightsLabel": "${card} Wisdom",
    "keyInsights": [
      "[How they already embody ${card}—verbatim]",
      "[Where this archetypal force flows in their life/body—verbatim]",
      "[The gift addressing their immediate need—verbatim]"
    ],
    "dailyInspiration": "[The practice/micro-ritual—verbatim]"
  }
}
</json>
    `.trim();

    // --- Call Claude (Anthropic) ---
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLAUDE_NAYRA_KEY,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        system: systemPrompt,
        temperature: 0.7,          // warm but obedient
        top_p: 0.9,                // optional diversity
        max_tokens: 2200,          // ample for 200–300 words + JSON
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!response.ok) {
      const errTxt = await response.text();
      console.error('Claude API Error:', errTxt);
      return res.status(502).json({ error: 'Claude API error', details: errTxt });
    }

    const data = await response.json();
    const raw = data?.content?.[0]?.text || '';

    // --- Parse fenced <json>...</json> block safely ---
    const match = raw.match(/<json>\s*([\s\S]*?)\s*<\/json>/);
    if (!match) {
      return res.status(200).json({
        error: 'No <json> block found',
        raw
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(match[1]);
    } catch (e) {
      return res.status(200).json({
        error: 'Failed to parse JSON',
        details: String(e),
        raw
      });
    }

    // Optional quick structure checks
    // console.log({
    //   hasTitle: !!parsed?.mainCard?.title,
    //   hasAbout: !!parsed?.mainCard?.aboutSymbol,
    //   hasInterp: !!parsed?.mainCard?.interpretation,
    //   insightsCount: Array.isArray(parsed?.mainCard?.keyInsights) ? parsed.mainCard.keyInsights.length : 0
    // });

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Handler failed:', error);
    return res.status(500).json({ error: 'Server error', details: String(error) });
  }
}