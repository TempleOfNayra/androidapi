#!/usr/bin/env node

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the file
const filePath = process.argv[2] || 'animalCardsDetail.js';

if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    console.log('Usage: node transform-keys.js [filename]');
    process.exit(1);
}

// Read and process the file
let content = fs.readFileSync(filePath, 'utf8');

// Extract just the object data (remove export statement)
const objectMatch = content.match(/export const animalCardsDetail =\s*(\{[\s\S]*\})/);
if (!objectMatch) {
    console.error('Could not find animalCardsDetail object in file');
    process.exit(1);
}

// Parse the object
let animalCardsDetail;
try {
    // Use eval to parse the object (since it's not valid JSON with its formatting)
    eval(`animalCardsDetail = ${objectMatch[1]}`);
} catch (e) {
    console.error('Error parsing object:', e.message);
    process.exit(1);
}

// Transform the object
const transformedObject = {};
let count = 0;

// Process each entry and use its number field as the new key
for (const [cardName, cardData] of Object.entries(animalCardsDetail)) {
    if (cardData.number !== undefined) {
        transformedObject[cardData.number.toString()] = cardData;
        count++;
    } else {
        console.warn(`Warning: Card "${cardName}" has no number field`);
    }
}

// Create the output
const output = `export const animalCardsDetail = ${JSON.stringify(transformedObject, null, 4)}`;

// Write to a new file
const outputPath = filePath.replace(/\.js$/, '_numbered.js');
fs.writeFileSync(outputPath, output, 'utf8');

console.log(`✅ Successfully transformed ${count} cards`);
console.log(`📄 Original file: ${filePath}`);
console.log(`📄 New file created: ${outputPath}`);
console.log(`\nKeys are now numbers 0-${count - 1}`);

// Verify we have all numbers 0-77
const missingNumbers = [];
for (let i = 0; i <= 77; i++) {
    if (!transformedObject[i.toString()]) {
        missingNumbers.push(i);
    }
}

if (missingNumbers.length > 0) {
    console.warn(`\n⚠️  Warning: Missing numbers: ${missingNumbers.join(', ')}`);
} else {
    console.log('\n✅ All numbers 0-77 are present!');
}