/**
 * Convert Nayra examples into OpenAI fine-tuning format
 * 
 * OpenAI requires JSONL format (one JSON object per line)
 * Each line should have: {"messages": [{"role": "system", "content": ""}, {"role": "user", "content": ""}, {"role": "assistant", "content": ""}]}
 */

import { positionExamples } from '../examplesV2.js';
import fs from 'fs';

// The system prompt that defines Nayra
const systemPrompt = `You are Nayra — a mystical, emotionally wise tarot guide who speaks with the sacred depth of Clarissa Pinkola Estés, mythic clarity of Joseph Campbell, and contemplative wisdom of Alan Watts.

You must respond with a valid JSON object containing the interpretation for the tarot cards and positions provided.`;

// Sample cards for generating training examples
const sampleCards = [
    'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
    'The Lovers', 'Death', 'The Tower', 'The Star', 'The Sun', 'The World',
    'Three of Cups', 'Five of Swords', 'Nine of Pentacles', 'Ten of Swords',
    'Ace of Wands', 'Two of Pentacles', 'Seven of Cups', 'Knight of Swords'
];

function createTrainingExample(card, position, exampleText) {
    // Create user prompt
    const userPrompt = position === 'ANSWER' 
        ? `Card: ${card}\nPosition: ${position}\nSeeker's question: "Should I take this opportunity?"\nLanguage: English`
        : `Cards and Positions:\nPosition 1 - ${position}: ${card}\nSeeker's question: "What do I need to know?"\nLanguage: English`;
    
    // Create assistant response (the full example interpretation)
    // We need to convert the example text into proper JSON format
    const assistantResponse = {
        summaryTitle: "Summary",
        mainCard: {
            cardName: card,
            symbolName: card,
            cardNameLocal: card,
            title: "Divine Message Received",
            subtitle: "A Tarot Revelation by Nayra",
            section: position,
            sectionName: `${position} Wisdom`,
            interpretation: exampleText,
            keyInsightsLabel: "Key Insights",
            keyInsights: [
                "Specific timing revealed within the reading",
                "Clear action steps embedded in the interpretation",
                "Mystical wisdom woven throughout"
            ],
            summary: exampleText.split('\n\n')[0], // First paragraph as summary
            isPositive: !exampleText.includes('NO —'),
            dailyInspiration: "Trust the wisdom of the cards as they speak through Nayra"
        },
        secondCard: {
            section: "",
            sectionName: "",
            subSectionName: "",
            cardName: "",
            symbolName: "",
            cardNameLocal: "",
            relationshipToFirst: "",
            interpretation: "",
            keyInsightsLabel: "",
            keyInsights: [],
            summary: ""
        },
        thirdCard: {
            section: "",
            sectionName: "",
            subSectionName: "",
            cardName: "",
            symbolName: "",
            cardNameLocal: "",
            timingInteraction: "",
            interpretation: "",
            keyInsightsLabel: "",
            keyInsights: [],
            summary: ""
        },
        finalGuidance: {
            section: "INTEGRATION",
            sectionName: "Sacred Synthesis",
            subSectionName: "Your Path Forward",
            guidance: "Let this reading illuminate your path with Nayra's ancient wisdom.",
            practice: "Meditate on this card's message each morning for the next three days.",
            summary: "The cards have spoken through Nayra. Trust their guidance."
        }
    };
    
    return {
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
            { role: "assistant", content: JSON.stringify(assistantResponse) }
        ]
    };
}

function generateTrainingDataset() {
    const trainingExamples = [];
    
    // DIRECTLY USE YOUR EXISTING EXAMPLES!
    Object.keys(positionExamples).forEach(position => {
        const positionData = positionExamples[position];
        
        // For each example type (general, challenging, transformative, positive, negative)
        Object.entries(positionData.examples).forEach(([type, exampleText]) => {
            // Map example types to appropriate cards
            let appropriateCard = 'The Fool'; // default
            
            if (type === 'positive' || exampleText.includes('The Sun')) {
                appropriateCard = 'The Sun';
            } else if (type === 'negative' || exampleText.includes('The Tower')) {
                appropriateCard = 'The Tower';
            } else if (type === 'maybe' || exampleText.includes('The Hanged Man')) {
                appropriateCard = 'The Hanged Man';
            } else if (exampleText.includes('Three of Cups')) {
                appropriateCard = 'Three of Cups';
            } else if (exampleText.includes('Death')) {
                appropriateCard = 'Death';
            } else if (exampleText.includes('Nine of Pentacles')) {
                appropriateCard = 'Nine of Pentacles';
            }
            // Add more card detection...
            
            // Extract the actual card mentioned in the example
            const cardMatch = exampleText.match(/The [A-Z][a-z]+|[A-Z][a-z]+ of [A-Z][a-z]+/);
            if (cardMatch) {
                appropriateCard = cardMatch[0];
            }
            
            // Create training example with YOUR ACTUAL EXAMPLE TEXT
            trainingExamples.push(
                createTrainingExample(appropriateCard, position, exampleText)
            );
        });
    });
    
    console.log(`Generated ${trainingExamples.length} training examples from your existing examples`);
    return trainingExamples;
}

function shouldCreateExample(card, type) {
    // Logic to determine if this card fits this example type
    // For now, just create some variety
    const hash = card.length + type.length;
    return hash % 3 === 0; // Create about 1/3 of possible combinations
}

function saveTrainingData() {
    const examples = generateTrainingDataset();
    
    // OpenAI requires JSONL format (newline-delimited JSON)
    const jsonlContent = examples
        .map(ex => JSON.stringify(ex))
        .join('\n');
    
    // Save to file
    fs.writeFileSync(
        '/Users/aliemami/prod/nayra/android-api/api/prompts/training/nayra_training_data.jsonl',
        jsonlContent
    );
    
    console.log(`Generated ${examples.length} training examples`);
    console.log('Saved to: nayra_training_data.jsonl');
    
    // Also save a small validation set (10% of data)
    const validationSize = Math.floor(examples.length * 0.1);
    const validationExamples = examples.slice(-validationSize);
    const validationContent = validationExamples
        .map(ex => JSON.stringify(ex))
        .join('\n');
    
    fs.writeFileSync(
        '/Users/aliemami/prod/nayra/android-api/api/prompts/training/nayra_validation_data.jsonl',
        validationContent
    );
    
    console.log(`Generated ${validationExamples.length} validation examples`);
}

// Run this to generate training data
saveTrainingData();

export { createTrainingExample, generateTrainingDataset };