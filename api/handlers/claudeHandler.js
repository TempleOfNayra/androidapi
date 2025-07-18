export async function claudeHandler(messages) {
    console.time('Claude API Total Time');

    // Extract system and user messages
    const systemMessage = messages.find(m => m.role === "system")?.content || "";
    const userMessages = messages.filter(m => m.role !== "system");

    console.time('Claude API Network Call');
    console.time('Fetch to First Byte');

    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": process.env.CLAUDE_NAYRA_KEY,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01",
            "anthropic-beta": "prompt-caching-2024-07-31",
        },
        body: JSON.stringify({
            model: "claude-3-5-sonnet-20241022",
            system: [{
                type: "text",
                text: systemMessage,
                cache_control: { type: "ephemeral" }
            }],
            max_tokens: 4096,
            temperature: 0.9,  // Back to original temperature
            messages: userMessages.map(m => ({
                role: m.role === "assistant" ? "assistant" : "user",
                content: m.content,
            })),
        }),
    });

    console.timeEnd('Fetch to First Byte');
    console.log('Response headers received, starting to read body...');

    console.timeEnd('Claude API Network Call');

    if (!response.ok) {
        const errData = await response.text();
        console.error('Claude API Error:', errData);
        throw new Error(`Claude error: ${errData}`);
    }

    console.time('Response Body Read');
    console.time('Claude Response Parsing');
    const data = await response.json();
    console.timeEnd('Response Body Read');
    console.timeEnd('Claude Response Parsing');

    const raw = data?.content?.[0]?.text?.trim() || '';

    // Log token usage for monitoring (including cache info)
    console.error('Token usage:', {
        input: data.usage?.input_tokens,
        cached: data.usage?.cache_read_input_tokens || 0,
        cache_created: data.usage?.cache_creation_input_tokens || 0,
        output: data.usage?.output_tokens,
        total: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0)
    });

    console.timeEnd('Claude API Total Time');

    // Parse and return JSON
    try {
        return JSON.parse(raw);
    } catch (error) {
        console.error('Failed to parse Claude response as JSON:', raw);
        throw new Error('Invalid JSON response from Claude');
    }
}