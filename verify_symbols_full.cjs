const fs = require('fs');

const expectedSymbols = {
  "Anchor": "stability, grounding, hope, security, steadfastness",
  "Arrow": "direction, focus, intention, aim, purpose",
  "Bridge": "transition, connection, passage, unity, crossing",
  "Castle": "courage, perseverance, defense, strength, conviction",
  "Chalice": "receptivity, abundance, grace, vessel, blessing",
  "Clock": "timing, cycles, awareness, patience, rhythm",
  "Compass": "guidance, direction, orientation, truth, navigation",
  "Crown": "authority, achievement, mastery, honor, sovereignty",
  "Door": "opportunity, threshold, choice, passage, opening",
  "Eye": "awareness, vision, truth, perception, insight",
  "Feather": "lightness, freedom, truth, spirit, release",
  "Flame": "passion, transformation, energy, purification, light",
  "Fountain": "renewal, flow, life force, abundance, source",
  "Gate": "transition, initiation, portal, threshold, passage",
  "Heart": "love, compassion, emotion, courage, center",
  "Hourglass": "time, patience, flow, transience, cycle",
  "Key": "access, solution, knowledge, unlock, revelation",
  "Lamp": "illumination, guidance, wisdom, hope, clarity",
  "Lighthouse": "guidance, warning, beacon, safety, direction",
  "Lion": "courage, strength, leadership, pride, power",
  "Lotus": "purity, enlightenment, rebirth, beauty, transcendence",
  "Mirror": "reflection, truth, self-awareness, illusion, clarity",
  "Moon": "intuition, mystery, cycles, feminine, emotion",
  "Mountain": "challenge, aspiration, perspective, achievement, journey",
  "Oak Tree": "strength, endurance, wisdom, ancestry, grounding",
  "Pearl": "wisdom, purity, transformation, treasure, patience",
  "Phoenix": "rebirth, transformation, renewal, resilience, immortality",
  "Rainbow": "hope, promise, harmony, diversity, bridge",
  "River": "flow, change, journey, life force, passage",
  "Rose": "love, beauty, devotion, passion, balance",
  "Scale": "balance, justice, fairness, equilibrium, truth",
  "Seed": "potential, beginning, growth, promise, latency",
  "Shield": "protection, defense, boundaries, strength, courage",
  "Ship": "journey, adventure, navigation, exploration, passage",
  "Spiral": "growth, evolution, cycles, expansion, journey",
  "Staff": "support, authority, guidance, power, direction",
  "Star": "hope, guidance, inspiration, destiny, aspiration",
  "Stone": "permanence, foundation, strength, grounding, endurance",
  "Sun": "vitality, clarity, truth, energy, life",
  "Sword": "truth, decision, clarity, power, discernment",
  "Thunderbolt": "sudden change, awakening, power, revelation, breakthrough",
  "Tree of Life": "connection, growth, family, wisdom, unity",
  "Well": "depth, source, wisdom, mystery, sustenance",
  "Wheel": "cycles, fortune, change, destiny, turning point",
  "Wings": "freedom, transcendence, protection, spirit, aspiration",
  "Labyrinth": "journey, center, complexity, finding way, patience",
  "Candle": "hope, prayer, vigil, devotion, light",
  "Cauldron": "transformation, magic, abundance, potential, creation",
  "Circle": "wholeness, unity, cycles, completion, eternity",
  "Cross": "intersection, faith, sacrifice, balance, center",
  "Crescent": "growth, potential, transition, goddess, receptivity",
  "Diamond": "clarity, strength, value, truth, brilliance",
  "Dove": "peace, spirit, love, innocence, message",
  "Dragon": "power, transformation, guardian, primal force, wisdom",
  "Eagle": "vision, freedom, courage, spirit, transcendence",
  "Fish": "abundance, faith, fertility, flow, depth",
  "Garden": "growth, cultivation, paradise, sanctuary, abundance",
  "Grail": "quest, spiritual goal, divine grace, wholeness, mystery",
  "Hand": "action, offering, blessing, power, connection",
  "Harp": "harmony, beauty, healing, inspiration, divine music",
  "Butterfly": "transformation, soul, rebirth, joy, lightness",
  "Knot": "connection, binding, complexity, unity, eternity",
  "Lantern": "guidance, search, hope, wisdom, inner light",
  "Mask": "persona, mystery, transformation, hidden truth, protection",
  "Olive Branch": "peace, reconciliation, victory, healing, hope",
  "Pyramid": "ascension, mystery, stability, power, ancient wisdom",
  "Ring": "union, commitment, eternity, wholeness, cycles",
  "Rope": "connection, binding, support, strength, lifeline",
  "Scroll": "knowledge, wisdom, teaching, revelation, record",
  "Serpent": "wisdom, transformation, healing, kundalini, cycle",
  "Shell": "protection, femininity, journey, hearing, beauty",
  "Caduceus": "healing, balance, commerce, communication, integration",
  "Ankh": "life, immortality, balance, wisdom, regeneration",
  "Ouroboros": "eternity, cycles, self-reflection, wholeness, renewal",
  "Triskele": "progress, cycles, trinity, motion, balance",
  "Vesica Piscis": "intersection, creation, sacred geometry, unity, gateway",
  "The King": "authority, leadership, structure, responsibility, wisdom"
};

const fileContent = fs.readFileSync('./api/services/cards/symbolCardsDetails.js', 'utf8');
const discrepancies = [];
let matched = 0;

for (const [expectedKey, expectedValue] of Object.entries(expectedSymbols)) {
  const escapedKey = expectedKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`"${escapedKey}"[^}]*"coreIntentions":\\s*"([^"]*)"`, 'i');
  const match = fileContent.match(regex);

  if (!match) {
    discrepancies.push({
      name: expectedKey,
      expected: expectedValue,
      actual: 'NOT FOUND',
      status: 'MISSING'
    });
  } else {
    const actualValue = match[1];
    if (actualValue !== expectedValue) {
      discrepancies.push({
        name: expectedKey,
        expected: expectedValue,
        actual: actualValue,
        status: 'MISMATCH'
      });
    } else {
      matched++;
    }
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`Verifying symbolCardsDetails.js (${Object.keys(expectedSymbols).length} symbols)`);
console.log('='.repeat(60));

if (discrepancies.length === 0) {
  console.log(`✅ All ${Object.keys(expectedSymbols).length} entries match perfectly!`);
} else {
  console.log(`✅ Matched: ${matched}`);
  console.log(`❌ Found ${discrepancies.length} discrepancies:\n`);
  discrepancies.forEach(d => {
    console.log(`  ${d.name}`);
    console.log(`    Expected: "${d.expected}"`);
    console.log(`    Actual:   "${d.actual}"`);
    console.log(`    Status:   ${d.status}\n`);
  });
}
