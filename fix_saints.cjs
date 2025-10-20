const fs = require('fs');

const newIntentions = {
  "St. Francis of Assisi": "peace, simplicity, joy, creation, detachment",
  "Prophet Moses": "liberation, leadership, divine law, deliverance",
  "St. Teresa of Ávila": "mystical union, inner wisdom, prayer, contemplation",
  "Mary, Mother of God": "compassion, nurturing, grace, maternal love",
  "King Solomon": "wisdom, discernment, justice, wealth, knowledge",
  "St. Peter": "faith, leadership, redemption, foundation, keys",
  "Sts. Louis IX and Margaret of Provence": "partnership, devotion, justice, unity",
  "St. George": "courage, protection, victory, strength, heroism",
  "St. Jerome": "scholarship, patience, translation, truth, discipline",
  "St. Anthony of Egypt": "solitude, contemplation, spiritual warfare, asceticism",
  "St. Catherine of Alexandria": "learning, eloquence, martyrdom, wheel, wisdom",
  "St. Michael the Archangel": "protection, justice, truth, spiritual warrior",
  "St. Simeon Stylites": "endurance, devotion, asceticism, pillar, witness",
  "St. Mary of Egypt": "repentance, transformation, desert, redemption",
  "St. Benedict of Nursia": "balance, community, ora et labora, stability",
  "St. Barbara": "sudden change, lightning, protection, tower, strength",
  "Our Lady of Guadalupe": "hope, miracles, maternal care, roses, tilma",
  "St. John of the Cross": "dark night, mysticism, purification, divine love",
  "Infant John the Baptist": "joy, purity, recognition, prophecy, blessing",
  "St. Gabriel the Archangel": "annunciation, messages, revelation, awakening",
  "Holy Grail with St. Joseph of Arimathea": "quest, divine spark, sacred vessel, mystery",
  "Sts. Joachim and Anne": "parenthood, preparation, faith, foundation",
  "Three Marys at the Tomb": "witness, resurrection, first light, faithful women",
  "St. Ignatius of Loyola": "discernment, spiritual exercises, formation, service",
  "St. Mary Magdalene": "devotion, witness, transformation, apostle",
  "St. Thérèse of Lisieux": "little way, roses, simplicity, trust, love",
  "St. Augustine": "conversion, intellect, confession, restless heart",
  "St. Alexis of Rome": "humility, detachment, poverty, hidden life",
  "St. Philip Neri": "joy, humor, community, devotion, Rome",
  "Holy Family in Nazareth": "domestic life, work, prayer, hidden years",
  "St. Bernadette of Lourdes": "visions, simplicity, healing waters, grotto",
  "St. Martin of Tours": "charity, cloak, compassion, soldier, bishop",
  "St. Elizabeth of Hungary": "generosity, charity, roses, bread, service",
  "St. Nicholas of Myra": "generosity, gifts, children, protection, three bags",
  "St. Brigid of Kildare": "hospitality, fire, creativity, abundance, Ireland",
  "Sts. Cyril and Methodius": "unity, alphabet, mission, brothers, Slavs",
  "St. Boniface": "evangelization, oak, Germany, martyrdom, mission",
  "St. Joseph the Worker": "labor, carpentry, provider, humility, work",
  "St. Athanasius": "orthodoxy, truth, courage, exile, defender",
  "St. Joan of Arc": "courage, voices, purity, mission, martyr",
  "St. Edmund Campion": "eloquence, martyrdom, England, faith, witness",
  "St. Paul the Apostle": "conversion, missionary, letters, zeal, apostle",
  "St. Sebastian": "endurance, arrows, protection, athlete, martyr",
  "St. Charles Borromeo": "reform, discipline, charity, plague, council",
  "St. Dominic Savio": "purity, youth, holiness, student, discipline",
  "St. Francis Xavier": "missions, baptism, East Indies, zeal, travel",
  "St. Catherine of Siena": "dialogue, stigmata, church reform, letters",
  "St. Patrick of Ireland": "evangelization, shamrock, snakes, Ireland, Trinity",
  "St. Hildegard of Bingen": "visions, music, healing, abbess, wisdom",
  "St. Thomas the Apostle": "doubt, faith, India, touching wounds, proof",
  "Our Lady of Sorrows": "suffering, seven sorrows, compassion, mother, pierced",
  "St. John Chrysostom": "preaching, golden mouth, eloquence, exile, liturgy",
  "St. Olga of Kiev": "conversion, vengeance, wisdom, baptism, Russia",
  "St. Brendan the Navigator": "journey, sea, whale, exploration, voyage",
  "St. John of God": "healing, hospitality, heart, mental illness, charity",
  "St. John Vianney": "confession, humility, parish, prayer, devotion",
  "St. Stephen": "martyrdom, stones, deacon, forgiveness, first martyr",
  "St. Aloysius Gonzaga": "purity, youth, plague, devotion, discipline",
  "St. Longinus the Centurion": "spear, conversion, sight, soldier, witness",
  "St. Scholastica": "prayer, storm, contemplation, sister, dove",
  "St. Constantine the Great": "vision, cross, empire, conversion, council",
  "St. Frances of Rome": "widowhood, charity, visions, guardian angel",
  "Sts. Cosmas and Damian": "healing, medicine, twins, charity, martyrdom",
  "St. Joseph Teaching Jesus": "fatherhood, craft, patience, teaching, workshop",
  "St. Matthew the Apostle": "tax collector, gospel, calling, conversion",
  "St. Martin de Porres": "charity, broom, biracial, humility, healing",
  "St. Vincent de Paul": "charity, poor, foundlings, Ladies of Charity",
  "St. Rose of Lima": "penance, roses, Peru, beauty, suffering",
  "St. Eligius": "craftsmanship, goldsmith, horseshoe, art, generosity",
  "St. Clare": "poverty, mirrors, monstrance, Poor Clares, simplicity",
  "St. Macrina the Younger": "philosophy, family, teaching, asceticism",
  "St. Pantaleon": "healing, physician, martyrdom, medicine, mercy",
  "St. Isidore the Farmer": "agriculture, plow, angels, patron farmer",
  "St. Martha of Bethany": "service, hospitality, cooking, practical love",
  "St. Homobonus": "merchant, integrity, charity, work, justice"
};

let content = fs.readFileSync('./api/services/cards/saintsCardsDetail.js', 'utf8');
let updated = 0;
let errors = 0;

for (const [name, newIntention] of Object.entries(newIntentions)) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(
    `("${escapedName}":\\s*\\{[^}]*"coreIntentions":\\s*")[^"]+(")`,
    'g'
  );
  
  const before = content;
  content = content.replace(regex, `$1${newIntention}$2`);
  
  if (content !== before) {
    updated++;
    console.log(`✓ Updated: ${name}`);
  } else {
    errors++;
    console.log(`✗ ERROR: Could not find or update ${name}`);
  }
}

fs.writeFileSync('./api/services/cards/saintsCardsDetail.js', content);
console.log(`\n✅ Successfully updated ${updated} saints`);
if (errors > 0) {
  console.log(`❌ Failed to update ${errors} saints`);
}
