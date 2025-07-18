// Import the original data and new prompts
// import { animalCardsDetail } from './paste-2.js'; // Adjust path as needed
// import { newNextPrompts } from './new_next_prompt.js'; // Adjust path as needed
// import fs from 'fs';
import { animalCardsDetail } from './animalCardsDetails.js';
import {newPrompts} from './new_next_prompt.js';
import fs from 'fs';

// Create a deep copy of the original data to avoid mutating it
const updatedAnimalCardsDetail = JSON.parse(JSON.stringify(animalCardsDetail));

// Update each card's nextPrompt with the new value
Object.keys(updatedAnimalCardsDetail).forEach(cardKey => {
   if (newPrompts[cardKey]) {
       updatedAnimalCardsDetail[cardKey].nextPrompt = newPrompts[cardKey];
   } else {
       console.warn(`No new nextPrompt found for card: ${cardKey}`);
   }
});

// Write the updated data to a new file
const outputData = `export const animalCardsDetail = ${JSON.stringify(updatedAnimalCardsDetail, null, 2)};`;

fs.writeFileSync('./animalCardsDetail_updated.js', outputData, 'utf8');

console.log('Successfully updated nextPrompt fields and saved to animalCardsDetail_updated.js');

// Optional: Also save as pure JSON
fs.writeFileSync('./animalCardsDetail_updated.json', JSON.stringify(updatedAnimalCardsDetail, null, 2), 'utf8');
console.log('Also saved as JSON to animalCardsDetail_updated.json');
