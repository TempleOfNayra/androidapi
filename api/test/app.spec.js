import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getAvailableCards, getCardDetail } from "../services/cardsService.js";
import { symbolTypes } from "../symbol_types.js";
import {
    buildSystemPromptForTarot,
    buildSystemPromptForAnimal,
    buildSystemPromptForDeities,
    buildSystemPromptForOrixas
} from "../prompts/promptsService.js";
import * as prompts from "../prompts/promptsService.js";


describe('Available Cards Tests', () => {

    it('should get available tarot cards in spanish', () => {
        const cards = getAvailableCards(symbolTypes.tarot, 'es');
        console.log(cards)
        assert(Array.isArray(cards), 'Should return an array');
        assert(cards.length > 0, 'Should have tarot cards');
    });

    it('should get available tarot cards in french', () => {
        const cards = getAvailableCards(symbolTypes.tarot, 'fr');
        console.log(cards)
        assert(Array.isArray(cards), 'Should return an array');
        assert(cards.length > 0, 'Should have tarot cards');
    });

    it('should get available tarot cards in portugese', () => {
        const cards = getAvailableCards(symbolTypes.tarot, 'pt');
        console.log(cards);
        assert(Array.isArray(cards), 'Should return an array');
        assert(cards.length > 0, 'Should have tarot cards');
    });

    it('should get available tarot cards in english', () => {
        const cards = getAvailableCards(symbolTypes.tarot, 'en');
        console.log(cards)
        assert(Array.isArray(cards), 'Should return an array');
        assert(cards.length > 0, 'Should have tarot cards');
    });


    it('should get available orixas cards', () => {
        const cards = getAvailableCards(symbolTypes.orixas);
        assert(Array.isArray(cards), 'Should return an array');
        assert(cards.length > 0, 'Should have orixas cards');
    });

    it('should get available animal cards', () => {
        const cards = getAvailableCards(symbolTypes.animals);
        assert(Array.isArray(cards), 'Should return an array');
        assert(cards.length > 0, 'Should have animal cards');
    });

    it('should get available RWS cards', () => {
        const cards = getAvailableCards(symbolTypes.rws);
        assert(Array.isArray(cards), 'Should return an array');
        assert(cards.length > 0, 'Should have RWS cards');
    });

    it('should get available tarot cards', () => {
        const cards = getAvailableCards(symbolTypes.tarot);
        assert(Array.isArray(cards), 'Should return an array');
        assert(cards.length > 0, 'Should have tarot cards');
    });

    it('should get available hindu cards', () => {
        const cards = getAvailableCards(symbolTypes.hindu);
        assert(Array.isArray(cards), 'Should return an array');
        assert(cards.length > 0, 'Should have hindu cards');
    });
});

describe('Card Details Tests', () => {
    it('should get orixas card detail for Ibú', () => {
        const card = getCardDetail(symbolTypes.orixas, 'Ibú');
        assert(card !== undefined, 'Card detail should be defined');
        assert(typeof card.name === 'string' && isNaN(Number(card.tName)), 'cardName must be a string, not a number');

        assert(typeof card === 'object', 'Card detail should be an object');
    });

    it('should get animal card detail by index', () => {
        const card = getCardDetail(symbolTypes.animals, 'Otter');
        assert(card !== undefined, 'Card detail should be defined');
        assert(typeof card === 'object', 'Card detail should be an object');
    });

    it('should get RWS card detail by name in English', () => {
        const card = getCardDetail(symbolTypes.rws, "The Fool", "en");
        assert(card !== undefined, 'Card detail should be defined');
        console.log(card);
        assert(typeof card === 'object', 'Card detail should be an object');
    });

    it('should get RWS card detail by name in Spanish', () => {
        const card = getCardDetail(symbolTypes.rws, "The Fool", "es");
        assert(card !== undefined, 'Card detail should be defined');
        // console.log(card);
        assert(typeof card === 'object', 'Card detail should be an object');
    });

    it('should get RWS card detail by name in French', () => {
        const card = getCardDetail(symbolTypes.rws, "The Fool", "fr");
        assert(card !== undefined, 'Card detail should be defined');
        console.log(card);
        assert(typeof card === 'object', 'Card detail should be an object');
    });

    it('should get RWS card detail by name in portugese', () => {
        const card = getCardDetail(symbolTypes.rws, "The Fool", "pt");
        assert(card !== undefined, 'Card detail should be defined');
        console.log(card);
        assert(typeof card === 'object', 'Card detail should be an object');
    });

    it('should get tarot card detail by name', () => {
        const card = getCardDetail(symbolTypes.tarot, 'The Fool', 'en');
        assert(card !== undefined, 'Card detail should be defined');
        assert(typeof card === 'object', 'Card detail should be an object');
    });

    it('should get tarot card detail by name in spanish', () => {
        const card = getCardDetail(symbolTypes.tarot, 'The Fool', 'en');
        assert(card !== undefined, 'Card detail should be defined');
        console.log(card);
        assert(typeof card === 'object', 'Card detail should be an object');
    });

    it('should get hindu card detail for Ganesha', () => {
        const card = getCardDetail(symbolTypes.hindu, 'Ganesha');
        assert(card !== undefined, 'Card detail should be defined');
        assert(typeof card === 'object', 'Card detail should be an object');
    });
});

describe('System Prompts Tests', () => {
    it('should build system prompt for tarot', () => {
        const prompt = buildSystemPromptForTarot();
        assert(typeof prompt === 'string', 'Prompt should be a string');
        assert(prompt.length > 0, 'Prompt should not be empty');
    });

    it('should build system prompt for animal', () => {
        const prompt = buildSystemPromptForAnimal();
        assert(typeof prompt === 'string', 'Prompt should be a string');
        assert(prompt.length > 0, 'Prompt should not be empty');
    });

    it('should build system prompt for deities', () => {
        const prompt = buildSystemPromptForDeities();
        assert(typeof prompt === 'string', 'Prompt should be a string');
        assert(prompt.length > 0, 'Prompt should not be empty');
    });

    it('should build system prompt for orixas', () => {
        const prompt = buildSystemPromptForOrixas();
        assert(typeof prompt === 'string', 'Prompt should be a string');
        assert(prompt.length > 0, 'Prompt should not be empty');
    });
});

describe('Interpretation Prompts Tests', () => {
    it('should generate RWS interpretation prompt', () => {
        const promptProps = {
            type: symbolTypes.rws,
            cardName: 'The Fool',
            intention: 'love',
            mood: 'love',
            userName: 'Ali',
        };

        const rwsPrompt = prompts.interpretation(
            promptProps.type,
            promptProps.cardName,
            promptProps.intention,
            promptProps.mood,
            promptProps.userName,
            promptProps.timeLastUsed
        );

        assert(typeof rwsPrompt === 'string', 'Prompt should be a string');
        assert(rwsPrompt.length > 0, 'Prompt should not be empty');
    });

    it('should generate tarot interpretation prompt', () => {
        const promptProps = {
            type: symbolTypes.tarot,
            cardName: 'The Fool',
            intention: 'love',
            mood: 'love',
            userName: 'Ali',
        };

        const tarotPrompt = prompts.interpretation(
            promptProps.type,
            promptProps.cardName,
            promptProps.intention,
            promptProps.mood,
            promptProps.userName,
            promptProps.timeLastUsed
        );

        assert(typeof tarotPrompt === 'string', 'Prompt should be a string');
        assert(tarotPrompt.length > 0, 'Prompt should not be empty');
    });

    // it('should generate animal interpretation prompt', () => {
    //     const promptProps = {
    //         type: symbolTypes.animals,
    //         cardName: 'otter',
    //         intention: 'love',
    //         mood: 'love',
    //         userName: 'Ali',
    //     };
    //
    //     const animalPrompt = prompts.interpretation(
    //         promptProps.type,
    //         promptProps.cardName,
    //         promptProps.intention,
    //         promptProps.mood,
    //         promptProps.userName,
    //         promptProps.timeLastUsed
    //     );
    //
    //     assert(typeof animalPrompt === 'string', 'Prompt should be a string');
    //     assert(animalPrompt.length > 0, 'Prompt should not be empty');
    // });

    it('should generate hindu interpretation prompt', () => {
        const promptProps = {
            type: symbolTypes.hindu,
            cardName: 'KALI',
            intention: 'love',
            mood: 'love',
            userName: 'Ali',
        };

        const hinduPrompt = prompts.interpretation(
            promptProps.type,
            promptProps.cardName,
            promptProps.intention,
            promptProps.mood,
            promptProps.userName,
            promptProps.timeLastUsed
        );

        assert(typeof hinduPrompt === 'string', 'Prompt should be a string');
        assert(hinduPrompt.length > 0, 'Prompt should not be empty');
    });

    it('should generate orixas interpretation prompt', () => {
        const promptProps = {
            type: symbolTypes.orixas,
            cardName: 'oxu',
            intention: 'love',
            mood: 'love',
            userName: 'Ali',
        };

        const orixasPrompt = prompts.interpretation(
            promptProps.type,
            promptProps.cardName,
            promptProps.intention,
            promptProps.mood,
            promptProps.userName,
            promptProps.timeLastUsed
        );

        assert(typeof orixasPrompt === 'string', 'Prompt should be a string');
        assert(orixasPrompt.length > 0, 'Prompt should not be empty');
    });
});