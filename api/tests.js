// import {tarotUtils as cardsUtils} from "./services/cardsUtil.js";
import {getAvailableCards, getCardDetail} from "./services/cardsService.js";
import {symbolTypes} from "./symbol_types.js";
import {
    buildSystemPromptForTarot,
    buildSystemPromptForAnimal,
    buildSystemPromptForDeities,
    buildSystemPromptForOrixas
} from "./prompts/promptsService.js";
import * as prompts from "./prompts/promptsService.js";

// console.log(cardsUtils.getCardIndex('KALI'));

console.log('testing available cards');
console.log(symbolTypes.orixas);
console.log(getAvailableCards(symbolTypes.orixas));

console.log(symbolTypes.animals);
console.log(getAvailableCards(symbolTypes.animals));

console.log(symbolTypes.rws);
console.log(getAvailableCards(symbolTypes.rws));

console.log(symbolTypes.tarot);
console.log(getAvailableCards(symbolTypes.tarot));

console.log(symbolTypes.hindu);
console.log(getAvailableCards(symbolTypes.hindu));
console.log('done');

console.log('testing card details ');
console.log(symbolTypes.orixas);
console.log(getCardDetail(symbolTypes.orixas, 'Ibú'));

console.log(symbolTypes.animals);
console.log(getCardDetail(symbolTypes.animals, 'Fox'));

console.log(symbolTypes.rws);
console.log(getCardDetail(symbolTypes.rws, 'The Fool'));

console.log(symbolTypes.tarot);
console.log(getCardDetail(symbolTypes.tarot, 'The Fool'));

console.log(symbolTypes.hindu);
console.log(getCardDetail(symbolTypes.hindu, 'Ganesha'));
// console.log('done');


console.log(buildSystemPromptForTarot());
console.log(buildSystemPromptForAnimal());
console.log(buildSystemPromptForDeities());
console.log(buildSystemPromptForOrixas());

console.log('system prompts done');

let promptProps = {
    type: symbolTypes.rws,
    cardName: 'The Fool',
    intention: 'love',
    mood: 'love',
    userName: 'Ali ',
}
const rwsPrompts = prompts.interpretation(
    promptProps.type,
    promptProps.cardName,
    promptProps.intention,
    promptProps.mood,
    promptProps.userName,
    promptProps.timeLastUsed,
);

console.log(rwsPrompts);


promptProps = {
    type: symbolTypes.tarot,
    cardName: 'The Fool',
    intention: 'love',
    mood: 'love',
    userName: 'Ali ',
}
prompts.interpretation(
    promptProps.type,
    promptProps.cardName,
    promptProps.intention,
    promptProps.mood,
    promptProps.userName,
    promptProps.timeLastUsed,
);

promptProps = {
    type: symbolTypes.animals,
    cardName: 'Fox',
    intention: 'love',
    mood: 'love',
    userName: 'Ali ',
}
const animalPrompt = prompts.interpretation(
    promptProps.type,
    promptProps.cardName,
    promptProps.intention,
    promptProps.mood,
    promptProps.userName,
    promptProps.timeLastUsed,
);

console.log(animalPrompt);



promptProps = {
    type: symbolTypes.hindu,
    cardName: 'KALI',
    intention: 'love',
    mood: 'love',
    userName: 'Ali ',
}
let prompt = prompts.interpretation(
    promptProps.type,
    promptProps.cardName,
    promptProps.intention,
    promptProps.mood,
    promptProps.userName,
    promptProps.timeLastUsed,
);
console.log(prompt);


promptProps = {
    type: symbolTypes.orixas,
    cardName: 'oxu',
    intention: 'love',
    mood: 'love',
    userName: 'Ali ',
}
prompt = prompts.interpretation(
    promptProps.type,
    promptProps.cardName,
    promptProps.intention,
    promptProps.mood,
    promptProps.userName,
    promptProps.timeLastUsed,
);
console.log(prompt);


console.log(symbolTypes.orixas);
console.log(getCardDetail(symbolTypes.orixas, 'Ibú'));
console.log(symbolTypes.rws);

let cards = getAvailableCards(symbolTypes.rws);
cards.filter(card => !card.name.includes('Reversed')).map((card) => {console.log(card.name)})

cards = getAvailableCards(symbolTypes.tarot);
cards.filter(card => !card.name.includes('Reversed')).map((card) => {console.log(card.name)})


console.log(getCardDetail(symbolTypes.tarot, 'The Fool'));



console.log(getAvailableCards(symbolTypes.tarot));
