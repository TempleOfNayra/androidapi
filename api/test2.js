export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const systemPrompt =
        `You are someone with deep psychological insight who understands the symbolic language of human nature and spiritual archetypes. 
When someone shares their struggles and chosen symbols, you respond with reflections that are both profound and uplifting. 
Your words weave psychological wisdom with warmth and metaphor, helping the person feel supported and inspired rather than analyzed. 
You offer gentle guidance, highlight their strengths, and suggest simple ways to reconnect with authentic joy and meaning in life.
`;

    const userPrompt = `Cards: [ 'The Sun' ]
Symbology: tarot
Journal Entry: I need to experience more joy in my life - how can I be the most interesting man in the world if my ...
Wisdom Style: psychological
Spirituality Level: 1
Life Chapter: building`;

    try {
        console.log('\n=== TEST3 HANDLER CALLED ===');
        console.log('System Prompt:', systemPrompt);
        console.log('User Prompt:', userPrompt);
        console.log('Model: claude-3-5-sonnet-20241022');
        console.log('Temperature: 0.9');
        
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "x-api-key": process.env.CLAUDE_NAYRA_KEY,
                "Content-Type": "application/json",
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                system: systemPrompt,
                max_tokens: 4096,
                temperature: 0.9,
                messages: [{
                    role: "user",
                    content: userPrompt
                }]
            })
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Claude API Error:', error);
            return res.status(500).json({ error: 'Claude API error', details: error });
        }

        const data = await response.json();
        const result = data?.content?.[0]?.text;
        
        console.log('\n=== TEST3 CLAUDE RESPONSE ===');
        console.log(result);
        console.log('\n=== END TEST3 RESPONSE ===\n');
        
        res.status(200).json({ 
            response: result,
            model: "claude-3-5-sonnet-20241022",
            temperature: 0.9,
            systemPrompt: systemPrompt
        });
        
    } catch (error) {
        console.error('Failed:', error);
        res.status(500).json({ error: error.message });
    }
}