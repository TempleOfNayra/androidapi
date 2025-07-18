// addCardNumbers.js

import { tarotCardsDetail } from '../services/tarotCardsDetails.js';

// Define the standard tarot deck order
const TAROT_DECK_ORDER = [
    // Major Arcana (0-21)
    "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
    "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
    "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
    "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World",

    // Wands (22-35)
    "Ace of Wands", "Two of Wands", "Three of Wands", "Four of Wands", "Five of Wands",
    "Six of Wands", "Seven of Wands", "Eight of Wands", "Nine of Wands", "Ten of Wands",
    "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands",

    // Cups (36-49)
    "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups", "Five of Cups",
    "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups", "Ten of Cups",
    "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups",

    // Swords (50-63)
    "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords",
    "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords",
    "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords",

    // Pentacles (64-77)
    "Ace of Pentacles", "Two of Pentacles", "Three of Pentacles", "Four of Pentacles",
    "Five of Pentacles", "Six of Pentacles", "Seven of Pentacles", "Eight of Pentacles",
    "Nine of Pentacles", "Ten of Pentacles", "Page of Pentacles", "Knight of Pentacles",
    "Queen of Pentacles", "King of Pentacles"
];

// Create a map for quick lookup
const cardIndexMap = new Map();
TAROT_DECK_ORDER.forEach((cardName, index) => {
    cardIndexMap.set(cardName, index);
    // Also add reversed versions with same index
    cardIndexMap.set(`${cardName} Reversed`, index);
});

// Process the tarotCardsDetail object
function addNumbersToCards(cardsDetail) {
    const updatedCards = {};

    for (const [cardName, cardData] of Object.entries(cardsDetail)) {
        const cardNumber = cardIndexMap.get(cardName);

        if (cardNumber !== undefined) {
            updatedCards[cardName] = {
                meaning: cardData.meaning,
                suitNumber: cardData.suitNumber,  // Keep the original suitNumber
                number: cardNumber,  // Add the new number field
                title: cardData.title,
                coreMeaning: cardData.coreMeaning,
                nayraQuote: cardData.nayraQuote,
                nextPrompt: cardData.nextPrompt
            };
        } else {
            console.warn(`Card not found in standard deck order: ${cardName}`);
            updatedCards[cardName] = { ...cardData };
        }
    }

    return updatedCards;
}

// Run the conversion
const updatedTarotCards = addNumbersToCards(tarotCardsDetail);

// Output in deck order
console.log('export const tarotCardsDetail = {');

// First output all upright cards in order
TAROT_DECK_ORDER.forEach((cardName, index) => {
    if (updatedTarotCards[cardName]) {
        const cardData = updatedTarotCards[cardName];
        console.log(`    "${cardName}": {`);
        console.log(`        "meaning": "${cardData.meaning}",`);
        console.log(`        "suitNumber": ${cardData.suitNumber},`);
        console.log(`        "number": ${cardData.number},`);
        console.log(`        "title": "${cardData.title}",`);
        console.log(`        "coreMeaning": "${cardData.coreMeaning}",`);
        console.log(`        "nayraQuote": "${cardData.nayraQuote}",`);
        console.log(`        "nextPrompt": "${cardData.nextPrompt}"`);
        console.log(`    },`);
    }
});

// Then output all reversed cards in order
TAROT_DECK_ORDER.forEach((cardName, index) => {
    const reversedName = `${cardName} Reversed`;
    if (updatedTarotCards[reversedName]) {
        const cardData = updatedTarotCards[reversedName];
        console.log(`    "${reversedName}": {`);
        console.log(`        "meaning": "${cardData.meaning}",`);
        console.log(`        "suitNumber": ${cardData.suitNumber},`);
        console.log(`        "number": ${cardData.number},`);
        console.log(`        "title": "${cardData.title}",`);
        console.log(`        "coreMeaning": "${cardData.coreMeaning}",`);
        console.log(`        "nayraQuote": "${cardData.nayraQuote}",`);
        console.log(`        "nextPrompt": "${cardData.nextPrompt}"`);
        console.log(`    },`);
    }
});

console.log('};');

// Verification
console.log('\n// Verification:');
console.log(`// Total cards in original file: ${Object.keys(tarotCardsDetail).length}`);
console.log(`// Cards with numbers assigned: ${Object.keys(updatedTarotCards).filter(name => updatedTarotCards[name].number !== undefined).length}`);

// Check for missing cards
const allExpectedCards = [];
TAROT_DECK_ORDER.forEach(name => {
    allExpectedCards.push(name);
    allExpectedCards.push(`${name} Reversed`);
});

const missingCards = allExpectedCards.filter(name => !updatedTarotCards[name]);
if (missingCards.length > 0) {
    console.log(`// Missing cards: ${missingCards.join(', ')}`);
}

// Check for extra cards
const extraCards = Object.keys(updatedTarotCards).filter(name => !allExpectedCards.includes(name));
if (extraCards.length > 0) {
    console.log(`// Extra/unknown cards: ${extraCards.join(', ')}`);
}