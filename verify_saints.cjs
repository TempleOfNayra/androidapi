const fs = require('fs');

const expectedSaints = {
  "St. Francis of Assisi": "peace, simplicity, joy, creation, detachment",
  "Prophet Moses": "liberation, leadership, divine law, deliverance",
  "St. Teresa of Ávila": "contemplation, soul depths, union, reform",
  "Mary, Mother of God": "protection, mercy, motherhood, surrender",
  "King Solomon": "wisdom, discernment, prosperity, justice",
  "St. Peter": "forgiveness, faith, leadership, second chances",
  "Sts. Louis IX and Margaret of Provence": "justice, partnership, leadership, devotion",
  "St. George": "courage, faith, protection, valor",
  "St. Jerome": "wisdom, understanding, study, patience",
  "St. Anthony of Egypt": "solitude, temptation, wisdom, strength",
  "St. Catherine of Alexandria": "wisdom, learning, eloquence, clarity",
  "St. Michael the Archangel": "protection, justice, faith, strength",
  "St. Simeon Stylites": "detachment, perseverance, prayer",
  "St. Mary of Egypt": "repentance, transformation, solitude, change",
  "St. Benedict of Nursia": "balance, community, order, stability",
  "St. Barbara": "protection, courage, readiness",
  "Our Lady of Guadalupe": "dignity, miracle, unity, maternal care",
  "St. John of the Cross": "surrender, purification, divine connection, letting go",
  "Infant John the Baptist": "recognition, preparation, joy",
  "St. Gabriel the Archangel": "guidance, clarity, truth",
  "Holy Grail with St. Joseph of Arimathea": "seeking, hidden truth, quest",
  "Sts. Joachim and Anne": "patience, hope, gratitude, trust",
  "Three Marys at the Tomb": "witnessing, joy, seeking",
  "St. Ignatius of Loyola": "discernment, seeking God, service, transformation",
  "St. Mary Magdalene": "devotion, witness, beloved, chosen",
  "St. Thérèse of Lisieux": "simplicity, trust, grace",
  "St. Augustine": "conversion, peace, grace, seeking",
  "St. Alexis of Rome": "hiddenness, humility, patience",
  "St. Philip Neri": "joy, humor, love",
  "Holy Family in Nazareth": "family peace, obedience, protection, quiet service",
  "St. Bernadette of Lourdes": "healing, humility, trust, faith",
  "St. Martin of Tours": "sharing, compassion, charity",
  "St. Elizabeth of Hungary": "service, abundance, charity",
  "St. Nicholas of Myra": "secret giving, generosity, protection, rescue",
  "St. Brigid of Kildare": "abundance, hospitality, creativity, leadership",
  "Sts. Cyril and Methodius": "communication, unity, understanding, connection",
  "St. Boniface": "boldness, evangelization, courage",
  "St. Joseph the Worker": "dignity, provision, guidance, quiet strength",
  "St. Athanasius": "courage, truth, perseverance",
  "St. Joan of Arc": "calling, courage, conviction, passion",
  "St. Edmund Campion": "eloquence, courage, witness",
  "St. Paul the Apostle": "transformation, mission, zeal, humility",
  "St. Sebastian": "endurance, healing, resilience",
  "St. Charles Borromeo": "reform, service, dedication",
  "St. Dominic Savio": "piety, joy, purity",
  "St. Francis Xavier": "mission, adventure, zeal, exploration",
  "St. Catherine of Siena": "unity, soul union, healing, passion",
  "St. Patrick of Ireland": "forgiveness, protection, evangelization, cleansing",
  "St. Hildegard of Bingen": "visions, healing, harmony, creation",
  "St. Thomas the Apostle": "seeking truth, proof, trust, belief",
  "Our Lady of Sorrows": "grief, compassion, endurance, self love",
  "St. John Chrysostom": "preaching, truth, worship",
  "St. Olga of Kiev": "transformation, justice, strength",
  "St. Brendan the Navigator": "journey, trust, discovery, pilgrimage",
  "St. John of God": "clarity, hospitality, renewal",
  "St. John Vianney": "confession, simplicity, perseverance",
  "St. Stephen": "forgiveness, witness, mercy",
  "St. Aloysius Gonzaga": "youth, purity, service",
  "St. Longinus the Centurion": "recognition, sight, conversion",
  "St. Scholastica": "contemplation, power, family love",
  "St. Constantine the Great": "victory, vision, leadership",
  "St. Frances of Rome": "clear seeing, motherhood, protection",
  "Sts. Cosmas and Damian": "healing, unity, generosity",
  "St. Joseph Teaching Jesus": "wisdom, guidance",
  "St. Matthew the Apostle": "purpose, contentment, transformation",
  "St. Martin de Porres": "unity, service, healing",
  "St. Vincent de Paul": "charity, love, service",
  "St. Rose of Lima": "self-acceptance, solitude, sacrifice",
  "St. Eligius": "integrity, skill, excellence",
  "St. Clare": "clarity, simplicity, light, letting go",
  "St. Macrina the Younger": "wisdom, faith, teaching",
  "St. Pantaleon": "healing, generosity, courage",
  "St. Isidore the Farmer": "work, patience, trust",
  "St. Martha of Bethany": "hospitality, service, peace, discernment",
  "St. Homobonus": "integrity, honesty, charity"
};

const fileContent = fs.readFileSync('./api/services/cards/saintsCardsDetail.js', 'utf8');
const discrepancies = [];

for (const [name, expectedIntention] of Object.entries(expectedSaints)) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp('"name":\\s*"' + escapedName + '"[^}]*"coreIntentions":\\s*"([^"]*)"', 'i');
  const match = fileContent.match(regex);
  
  if (!match) {
    discrepancies.push({name, expected: expectedIntention, actual: 'NOT FOUND'});
  } else {
    const actualIntention = match[1];
    if (actualIntention !== expectedIntention) {
      discrepancies.push({name, expected: expectedIntention, actual: actualIntention});
    }
  }
}

console.log('Total saints to check:', Object.keys(expectedSaints).length);
console.log('Discrepancies found:', discrepancies.length);

if (discrepancies.length > 0) {
  console.log('\nMismatches:\n');
  discrepancies.forEach(d => {
    console.log(d.name);
    console.log('  Expected:', d.expected);
    console.log('  Actual:  ', d.actual);
    console.log('');
  });
} else {
  console.log('\n✅ All saints match perfectly!');
}
