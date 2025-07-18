import {tarotExamples, animalExamples, hinduExamples, orixaExamples} from "./promptReferenceLibrary.js";

import { animalCardsDetail } from '../services/animalCardsDetails.js';

import {buildSystemPromptForAnimal} from "./systems/animal-prompt.js";
import {buildSystemPromptForTarot} from "./systems/tarot-prompt.js";
import {buildSystemPromptForDeities} from "./systems/deities-prompt.js";
import {buildSystemPromptForOrixas} from "./systems/orixas-prompt.js";
import {symbolTypes} from "../symbol_types.js";

export {
    buildSystemPromptForAnimal,
    buildSystemPromptForTarot,
    buildSystemPromptForDeities,
    buildSystemPromptForOrixas
};

export function interpretation(type, cardName, intention, mood, userName = null, lastUsedTime = null) {
    if ((!mood && !intention) || !cardName) {
        throw new Error(`Missing mood=${mood} or intention =${intention} or card name = ${cardName}`);
    }
    const formattedName = userName ? userName : "Traveler";

    let example;
    if (type === symbolTypes.rws || type ===  symbolTypes.tarot) {
       example = tarotExamples.getExampleForCard(cardName, cardName.includes('Reversed'));
        if (!example) {
            throw new Error(`rws - Prompt card example ->${cardName}<- was not found`);
        }
    } else if (type === symbolTypes.animals) {
        example = animalExamples.getExampleForCard(cardName);
        if (!example) {
            throw new Error(`animals - Prompt card example ->${cardName}<- was not found`);
        }
    } else if (type === symbolTypes.hindu) {
        example = hinduExamples.getExampleForDeity();
        if (!example) {
            throw new Error(`hindu - Prompt card example ->${cardName}<- was not found`);
        }
    } else if (type === symbolTypes.orixas) {
        example = orixaExamples.getExampleForOrixa();
        if (!example) {
            throw new Error(`hindu - Prompt card example ->${cardName}<- was not found`);
        }
    }

    let animalName;
    if (type === symbolTypes.animals) {
        animalName = animalCardsDetail[cardName].name;
    }

    // Build the user prompt with dynamic content
    let promptParts = [
        `mainCard: ${animalName || cardName}`,
        mood ? `emotional focus: ${mood}` : null,
        intention ? `intention: ${intention}` : null,
        userName ? `seeker's name: ${formattedName}` : null,
        lastUsedTime ? `last reading: ${lastUsedTime}` : null,
        '', // Empty line
        'STYLE REFERENCE for this specific card:',
        example,
        '', // Empty line
        'Note: Your complete reading should be fully developed (not more than 1200 words total across all sections), emotionally rich, and layered with meaning. The [...] indicates substantial content that should be expanded in your full reading.'
    ];

    // Filter out null values and join with newlines
    return promptParts.filter(part => part !== null).join('\n');
}
