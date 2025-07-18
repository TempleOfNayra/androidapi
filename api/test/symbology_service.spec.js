import {getAvailableCards, getCardDetail} from "../services/cardsService.js";

const x = getAvailableCards('tarot');

const card = getCardDetail('rws', '0_reversed');

console.log(card);