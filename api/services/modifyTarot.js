#!/usr/bin/env node

import fs from 'fs';

// Read the file
const filePath = process.argv[2] || 'tarotCardsDetail.js';

if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    console.log('Usage: node transform-tarot.js [filename]');
    process.exit(1);
}

// Read and process the file
let content = fs.readFileSync(filePath, 'utf8');

// Extract the object data
const objectMatch = content.match(/export const tarotCardsDetail = (\{[\s\S]*\});/);
if (!objectMatch) {
    console.error('Could not find tarotCardsDetail object in file');
    process.exit(1);
}

// Parse the object
let tarotCardsDetail;
try {
    // Use eval to parse (safe since it's your own file)
    eval(`tarotCardsDetail = ${objectMatch[1]}`);
} catch (e) {
    console.error('Error parsing object:', e.message);
    process.exit(1);
}

// Transform the object
const transformedObject = {};
let regularCount = 0;
let reversedCount = 0;

for (const [cardName, cardData] of Object.entries(tarotCardsDetail)) {
    // Add the name field
    const newCardData = {
        name: cardName,
        ...cardData
    };

    // Use the number as the new key
    const number = cardData.number;
    if (number !== undefined) {
        let key = number.toString();

        // Check if this is a reversed card
        if (cardName.includes('Reversed')) {
            key = `${number}_reversed`;
            reversedCount++;
        } else {
            regularCount++;
        }

        // Check for duplicates (shouldn't happen with this logic)
        if (transformedObject[key]) {
            console.warn(`Warning: Duplicate key "${key}" for card "${cardName}"`);
        }

        transformedObject[key] = newCardData;
    } else {
        console.warn(`Warning: Card "${cardName}" has no number field`);
    }
}

// Create the output
const output = `export const tarotCardsDetail = ${JSON.stringify(transformedObject, null, 4)};`;

// Write to a new file
const outputPath = filePath.replace(/\.js$/, '_transformed.js');
fs.writeFileSync(outputPath, output, 'utf8');

console.log(`\n✅ Successfully transformed ${Object.keys(transformedObject).length} cards`);
console.log(`📄 Original file: ${filePath}`);
console.log(`📄 New file created: ${outputPath}`);
console.log(`\n📊 Summary:`);
console.log(`   - Regular cards: ${regularCount}`);
console.log(`   - Reversed cards: ${reversedCount}`);
console.log(`   - Total: ${Object.keys(transformedObject).length}`);

// Show sample of the transformation
console.log(`\nSample transformation:`);
console.log(`"The Fool" → "0" (name: "The Fool")`);
console.log(`"The Fool Reversed" → "0_reversed" (name: "The Fool Reversed")`);
console.log(`"Ace of Wands" → "22" (name: "Ace of Wands")`);
console.log(`"Ace of Wands Reversed" → "22_reversed" (name: "Ace of Wands Reversed")`);