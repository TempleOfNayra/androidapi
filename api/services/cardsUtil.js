// // tarotDeckUtils.js - Simple and Efficient
//
// // Direct mapping - no computation needed
// const NAME_TO_INDEX = {
//     "the_fool": 0,
//     "the_magician": 1,
//     "the_high_priestess": 2,
//     "the_empress": 3,
//     "the_emperor": 4,
//     "the_hierophant": 5,
//     "the_lovers": 6,
//     "the_chariot": 7,
//     "strength": 8,
//     "the_hermit": 9,
//     "wheel_of_fortune": 10,
//     "justice": 11,
//     "the_hanged_man": 12,
//     "death": 13,
//     "temperance": 14,
//     "the_devil": 15,
//     "the_tower": 16,
//     "the_star": 17,
//     "the_moon": 18,
//     "the_sun": 19,
//     "judgement": 20,
//     "the_world": 21,
//     "ace_of_wands": 22,
//     "two_of_wands": 23,
//     "three_of_wands": 24,
//     "four_of_wands": 25,
//     "five_of_wands": 26,
//     "six_of_wands": 27,
//     "seven_of_wands": 28,
//     "eight_of_wands": 29,
//     "nine_of_wands": 30,
//     "ten_of_wands": 31,
//     "page_of_wands": 32,
//     "knight_of_wands": 33,
//     "queen_of_wands": 34,
//     "king_of_wands": 35,
//     "ace_of_cups": 36,
//     "two_of_cups": 37,
//     "three_of_cups": 38,
//     "four_of_cups": 39,
//     "five_of_cups": 40,
//     "six_of_cups": 41,
//     "seven_of_cups": 42,
//     "eight_of_cups": 43,
//     "nine_of_cups": 44,
//     "ten_of_cups": 45,
//     "page_of_cups": 46,
//     "knight_of_cups": 47,
//     "queen_of_cups": 48,
//     "king_of_cups": 49,
//     "ace_of_swords": 50,
//     "two_of_swords": 51,
//     "three_of_swords": 52,
//     "four_of_swords": 53,
//     "five_of_swords": 54,
//     "six_of_swords": 55,
//     "seven_of_swords": 56,
//     "eight_of_swords": 57,
//     "nine_of_swords": 58,
//     "ten_of_swords": 59,
//     "page_of_swords": 60,
//     "knight_of_swords": 61,
//     "queen_of_swords": 62,
//     "king_of_swords": 63,
//     "ace_of_pentacles": 64,
//     "two_of_pentacles": 65,
//     "three_of_pentacles": 66,
//     "four_of_pentacles": 67,
//     "five_of_pentacles": 68,
//     "six_of_pentacles": 69,
//     "seven_of_pentacles": 70,
//     "eight_of_pentacles": 71,
//     "nine_of_pentacles": 72,
//     "ten_of_pentacles": 73,
//     "page_of_pentacles": 74,
//     "knight_of_pentacles": 75,
//     "queen_of_pentacles": 76,
//     "king_of_pentacles": 77
// };
//
// // Reverse mapping
// const INDEX_TO_NAME = {
//     0: "the_fool",
//     1: "the_magician",
//     2: "the_high_priestess",
//     3: "the_empress",
//     4: "the_emperor",
//     5: "the_hierophant",
//     6: "the_lovers",
//     7: "the_chariot",
//     8: "strength",
//     9: "the_hermit",
//     10: "wheel_of_fortune",
//     11: "justice",
//     12: "the_hanged_man",
//     13: "death",
//     14: "temperance",
//     15: "the_devil",
//     16: "the_tower",
//     17: "the_star",
//     18: "the_moon",
//     19: "the_sun",
//     20: "judgement",
//     21: "the_world",
//     22: "ace_of_wands",
//     23: "two_of_wands",
//     24: "three_of_wands",
//     25: "four_of_wands",
//     26: "five_of_wands",
//     27: "six_of_wands",
//     28: "seven_of_wands",
//     29: "eight_of_wands",
//     30: "nine_of_wands",
//     31: "ten_of_wands",
//     32: "page_of_wands",
//     33: "knight_of_wands",
//     34: "queen_of_wands",
//     35: "king_of_wands",
//     36: "ace_of_cups",
//     37: "two_of_cups",
//     38: "three_of_cups",
//     39: "four_of_cups",
//     40: "five_of_cups",
//     41: "six_of_cups",
//     42: "seven_of_cups",
//     43: "eight_of_cups",
//     44: "nine_of_cups",
//     45: "ten_of_cups",
//     46: "page_of_cups",
//     47: "knight_of_cups",
//     48: "queen_of_cups",
//     49: "king_of_cups",
//     50: "ace_of_swords",
//     51: "two_of_swords",
//     52: "three_of_swords",
//     53: "four_of_swords",
//     54: "five_of_swords",
//     55: "six_of_swords",
//     56: "seven_of_swords",
//     57: "eight_of_swords",
//     58: "nine_of_swords",
//     59: "ten_of_swords",
//     60: "page_of_swords",
//     61: "knight_of_swords",
//     62: "queen_of_swords",
//     63: "king_of_swords",
//     64: "ace_of_pentacles",
//     65: "two_of_pentacles",
//     66: "three_of_pentacles",
//     67: "four_of_pentacles",
//     68: "five_of_pentacles",
//     69: "six_of_pentacles",
//     70: "seven_of_pentacles",
//     71: "eight_of_pentacles",
//     72: "nine_of_pentacles",
//     73: "ten_of_pentacles",
//     74: "page_of_pentacles",
//     75: "knight_of_pentacles",
//     76: "queen_of_pentacles",
//     77: "king_of_pentacles"
// };
//
// // Utility functions
// export const tarotUtils = {
//     // Get name by index (returns snake_case name)
//     getCardName: (index) => INDEX_TO_NAME[index] || null,
//
//     // Get index by name - handles "The Fool", "THE FOOL", "the fool", "The_Fool", etc.
//     getCardIndex: (name) => {
//         if (!name) return null;
//         console.log('before number');
//         const num = Number(name);
//         if (!isNaN(num)) {
//             return num;
//         }
//         console.log('after name : ', name);
//         // Normalize: "The Fool" or "The_Fool" -> "the_fool"
//         const normalized = name
//             .toLowerCase()
//             .trim()
//             .replace(/[\s_]+/g, '_')  // Replace any whitespace OR underscores with single underscore
//             .replace(/_{2,}/g, '_');  // Replace multiple underscores with single underscore
//         console.log('normalized', normalized);
//
//         return NAME_TO_INDEX[normalized] ?? normalized;
//     },
//
//     // Get display name: "the_fool" -> "The Fool"
//     getDisplayName: (indexOrSnakeName) => {
//         let snakeName;
//
//         if (typeof indexOrSnakeName === 'number') {
//             snakeName = INDEX_TO_NAME[indexOrSnakeName];
//         } else {
//             snakeName = indexOrSnakeName;
//         }
//
//         if (!snakeName) return null;
//
//         return snakeName
//             .split('_')
//             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(' ');
//     },
//
//     // Direct checks
//     isMajorArcana: (indexOrName) => {
//         const index = typeof indexOrName === 'number'
//             ? indexOrName
//             : tarotUtils.getCardIndex(indexOrName);
//         return index !== null && index < 22;
//     },
//
//     // Helper to normalize model output
//     normalizeCardName: (modelOutput) => {
//         return modelOutput
//             .toLowerCase()
//             .trim()
//             .replace(/\s+/g, '_');
//     }
// };