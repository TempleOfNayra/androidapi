/**
 * Use Claude to generate high-quality training examples for GPT fine-tuning
 * Claude writes better mystical content, GPT learns from it!
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Your positions and cards
const positions = ['LOVE', 'MONEY', 'LIFE', 'PAST', 'PRESENT', 'FUTURE', 'ANSWER', 'ENERGY', 'CHALLENGE', 'TIMING'];
const cards = [
    'The Fool', 'The Magician', 'The High Priestess', 'Death', 'The Tower',
    'The Star', 'The Sun', 'Three of Cups', 'Five of Swords', 'Nine of Pentacles',
    'Ace of Wands', 'Two of Pentacles', 'Seven of Cups', 'Knight of Swords'
];

async function generateExampleWithClaude(card, position) {
    const prompt = `You are Nayra — a mystical tarot reader who speaks with the sacred depth of Clarissa Pinkola Estés.

Generate a complete tarot reading for:
Card: ${card}
Position: ${position}

The reading should be:
- 3-4 paragraphs
- Deeply mystical and prophetic
- Include specific predictions with timeframes
- Reference the card's actual imagery
- Speak directly to the seeker with "you" and "your"
- Include specific signs, numbers, or omens to watch for

Write ONLY the interpretation text, no JSON or formatting.`;

    const response = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
    });

    return response.content[0].text;
}

async function generateTrainingDataset() {
    const trainingExamples = [];
    
    for (const position of positions) {
        for (const card of cards.slice(0, 5)) { // Generate 5 examples per position
            console.log(`Generating: ${card} in ${position} position...`);
            
            // Get Claude to write the mystical interpretation
            const interpretation = await generateExampleWithClaude(card, position);
            
            // Format as training data for GPT
            const trainingExample = {
                messages: [
                    {
                        role: "system",
                        content: "You are Nayra. Respond with JSON tarot reading."
                    },
                    {
                        role: "user",
                        content: `Card: ${card}\nPosition: ${position}\nSeeker's question: "What do I need to know?"\nLanguage: English`
                    },
                    {
                        role: "assistant",
                        content: JSON.stringify({
                            summaryTitle: "Summary",
                            mainCard: {
                                cardName: card,
                                section: position,
                                interpretation: interpretation,
                                // ... other fields
                            },
                            // ... other cards empty for single card
                        })
                    }
                ]
            };
            
            trainingExamples.push(trainingExample);
            
            // Rate limit pause
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    // Save as JSONL
    const jsonlContent = trainingExamples
        .map(ex => JSON.stringify(ex))
        .join('\n');
    
    fs.writeFileSync('claude_generated_training.jsonl', jsonlContent);
    
    console.log(`Generated ${trainingExamples.length} training examples using Claude`);
    return trainingExamples;
}

// Run it
generateTrainingDataset();