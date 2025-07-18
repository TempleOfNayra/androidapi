/**
 * Tarot Card Example Library
 *
 * A comprehensive collection of card examples organized by type
 * for the Nayra tarot interpretation system.
 */
// Add at the very end of the file
export { tarotExamples, animalExamples, hinduExamples, orixaExamples };

const tarotExamples = {
    /**
     * Categorize a tarot card into its appropriate example category
     * @param {string} cardName - The full name of the tarot card
     * @param {boolean} isReversed - Whether the card is reversed
     * @returns {string} The example text to use for this card type
     */
    getExampleForCard(cardName, isReversed = false) {
        const cardLower = cardName.toLowerCase().replace('reversed', '').trim();
        const cardIsReversed = isReversed || cardLower.includes('reversed') || cardName.includes('reversed');

        // If the card is reversed, determine if it's a positive or challenging reversed card
        if (cardIsReversed) {
            // Check if it's a traditionally challenging card that becomes positive in reversal
            if (this.challengingCards.some(card => cardLower.includes(card.toLowerCase()))) {
                return this.examples.positiveReversed;
            }
            // Otherwise use the standard reversed example (for uplifting or neutral cards in reversal)
            return this.examples.reversed;
        }

        // Check Major Arcana challenging cards
        if (this.challengingCards.some(card => cardLower.includes(card.toLowerCase()))) {
            return this.examples.challenging;
        }

        // Check Major Arcana uplifting cards
        if (this.upliftingCards.some(card => cardLower.includes(card.toLowerCase()))) {
            return this.examples.uplifting;
        }

        // Check Major Arcana transitional cards
        if (this.transitionalCards.some(card => cardLower.includes(card.toLowerCase()))) {
            return this.examples.transitional;
        }

        // Check Court cards
        if (this.courtRanks.some(rank => cardLower.includes(rank.toLowerCase()))) {
            return this.examples.court;
        }

        // Check Minor Arcana by suit
        if (cardLower.includes('cup') || cardLower.includes('chalice')) {
            return this.examples.cups;
        }
        if (cardLower.includes('wand') || cardLower.includes('rod')) {
            return this.examples.wands;
        }
        if (cardLower.includes('sword')) {
            return this.examples.swords;
        }
        if (cardLower.includes('pentacle') || cardLower.includes('coin') || cardLower.includes('disk')) {
            return this.examples.pentacles;
        }

        // Default example if no category matches
        return this.examples.default;
    },

    // Card category definitions
    challengingCards: [
        'Tower', 'Death', 'Devil', 'Ten of Swords', 'Three of Swords', 'Nine of Swords',
        'Five of Pentacles', 'Ten of Wands', 'Eight of Cups'
    ],

    upliftingCards: [
        'Sun', 'Star', 'World', 'Ten of Cups', 'Ten of Pentacles', 'Nine of Cups',
        'Three of Cups', 'Ace of Cups', 'Ace of Wands', 'Ace of Pentacles', 'Temperance', 'Nine of Pentacles'
    ],

    transitionalCards: [
        'Hanged Man', 'Wheel of Fortune', 'Judgment', 'Fool', 'Hermit', 'Moon',
        'Two of Pentacles', 'Eight of Wands', 'Eight of Pentacles', 'Six of Swords'
    ],

    courtRanks: ['King', 'Queen', 'Knight', 'Page', 'Prince', 'Princess'],

    // Example text for each card category
    examples: {
        reversed: `"# The Hidden Invitation
*A Tarot Revelation by Nayra*

Ali, when a card appears in reversal, it speaks in whispers rather than declarations. The Five of Cups reversed arrives not as opposition to its upright meaning, but as an invitation to look beneath the surface of grief...

[...]

Notice how the reversed position shifts your perspective—what was foreground becomes background, what was emphasized now recedes... The spilled cups remain spilled, but your attention is gently guided toward what remains standing...

[...]

In this orientation, the figure's gaze is subtly redirected from loss toward possibility... Not erasing what has happened, but finding the hidden gift within it...

[...]

The river that seemed to separate you from the distant castle now appears as a pathway connecting rather than dividing... This reversal asks not for denial of feelings but for their transformation—grief becoming gratitude, endings revealing beginnings not yet imagined."`,

        positiveReversed: `"# The Gentle Release
*A Tarot Liberation by Nayra*

Ali, the Tower reversed appears before you like a storm that has passed in the night. What once threatened total destruction now offers a gentler dismantling—the necessary releasing of what no longer serves, but with grace rather than upheaval...

[...]

In this orientation, the lightning illuminates without shattering... The divine intervention comes not as crisis but as revelation, allowing conscious surrender rather than forced abandonment...

[...]

The figures who in the upright position fall helplessly now appear to be descending with purpose—as if they have chosen to leave the confining structure that once defined their reality...

[...]

This reversed Tower whispers of transformation that doesn't require catastrophe... of awakenings that come through insight rather than emergency... It speaks of your readiness to release illusions before they collapse around you, to choose freedom before it becomes your only option."`,

        challenging: `"# The Alchemy of Destruction
*A Tarot Revelation by Nayra*

Ali, there are moments when the universe speaks not in thunder. The Tower appears before you now as sacred lightning—not as punishment, but as necessary awakening. 

I see the structure you've built with such care... The walls that once sheltered have become a prison of certainty...

[...]

The figures falling through empty space—they are you, beloved. Not one self, but the many selves you've outgrown yet cling to... 

[...]

Feel the scorching clarity of this moment. The lightning illuminates everything—your authentic nature beneath accumulated layers... 

[...]

Stand bare in the storm of revelation—what remains after lightning is what was always truly yours."`,

        uplifting: `"# Radiance Reclaimed
*A Tarot Blessing by Nayra*

Ali, the Sun rises in your reading not as mere optimism, but as the remembering of your essential nature. This light you now witness has always been within you, waiting beneath doubt's thin veil... 

[...]

See how the child rides bareback on the white horse—this is your spirit reuniting with your innocence, your wisdom dancing with your wonder... 

[...]

The sunflowers turn faithfully toward their celestial beloved—so too does your authentic self now orient toward wholeness... 

[...]

Your shadows haven't disappeared; they've simply been given context by this new illumination... Embrace this golden moment not as fleeting fortune but as glimpsed truth."`,

        transitional: `"# Sacred Surrender
*A Tarot Crossing by Nayra*

Ali, the Hanged Man arrives not as punishment but as invitation. To be suspended between worlds is to be given the rare gift of perspective... 

[...]

Notice how he hangs by one foot yet his face remains serene—this is the paradox of finding freedom within limitation, wisdom within waiting... 

[...]

The halo around his head speaks of the illumination that comes only through voluntary surrender... 

[...]

In this sacred pause between exhale and inhale, you are neither who you were nor who you will become."`,

        court: `"# The Sovereign's Mirror
*A Tarot Reflection by Nayra*

Ali, the Queen of Wands enters your reading as both invitation and reflection. She is the aspect of yourself that needs no external validation to know her worth... 

[...]

Notice how the black cat sits attentively at her feet—this is your intuition, awakened and alert, ready to move at your command... 

[...]

The sunflower she holds speaks of how she has learned to turn naturally toward what nourishes her spirit... 

[...]

To embody her energy is not to become someone new, but to recognize what has always lived within your deepest self... This sovereign energy asks not for your striving but for your recognition and embodiment."`,

        cups: `"# The Well of Feeling
*A Tarot Immersion by Nayra*

Ali, the Three of Cups appears as a sacred reminder that joy is not a luxury but a necessity. These figures dancing in celebration show us that our emotions flourish most honestly in the garden of connection... 

[...]

The raised cups form a triangle—symbol of creation, of bringing something new into being through shared intention... 

[...]

Notice how their feet touch the earth as their cups reach toward sky—this is the alchemy of bringing heaven to earth through authentic feeling... 

[...]

This card whispers of moments when the boundaries between separate selves become permeable, when your truth finds safe harbor in the witnessing of kindred spirits..."`,

        wands: `"# Kindled Purpose
*A Tarot Awakening by Nayra*

Ali, the Ace of Wands arrives like the first spark that will become your bonfire. This is not merely opportunity, but divine life-force seeking expression through your unique being... 

[...]

See how the hand extends from the cloud, offering this gift—inspiration comes not from striving but from receptivity to what already seeks you... 

[...]

The lush landscape below speaks to the fertility that awaits when passion aligns with purpose... 

[...]

This primal energy does not ask for your perfection, only your willingness to be a vessel for what wants to move through you... Let the warmth of this fire remind you that enthusiasm—from the Greek 'entheos'—means 'filled with god.'"`,

        swords: `"# The Clarity of Discernment
*A Tarot Illumination by Nayra*

Ali, the Two of Swords appears not as indecision, but as the sacred threshold of discernment. The blindfolded figure shows us that true seeing sometimes requires us to close our outer eyes and open our inner vision... 

[...]

The crossed swords form both boundary and balance—the mind's ability to hold opposing truths without premature resolution... 

[...]

The crescent moon illuminates the scene, reminding us that wisdom often emerges in the liminal spaces, in the patient darkness between what was and what will be... 

[...]

This moment of stillness is not avoidance but preparation—the gathering of inner resources before clarity crystallizes into choice... Trust the knowing that ripens in silence."`,

        pentacles: `"# The Garden of Manifestation
*A Tarot Embodiment by Nayra*

Ali, the Seven of Pentacles arrives as a sacred pause in your material journey. The figure leaning on their staff reminds us that periods of waiting are not separate from the work but essential to it... 

[...]

Notice how their gaze rests on the pentacles growing like fruit—this is the contemplation that transforms mere labor into stewardship... 

[...]

The plants have their own timeline, neither hurried nor delayed by our expectations... 

[...]

This card honors the wisdom of cycles—knowing when to act and when to observe, when to strive and when to allow natural processes their due season... In the waiting comes a different kind of harvest: the fruits of patience, discernment, and aligned timing."`,

        default: `"# The Soul's Compass
*A Tarot Guidance by Nayra*

Ali, this card emerges at precisely this moment as an invitation to deepen your relationship with its wisdom. The symbols before you are not static images but living energies seeking conversation with your spirit...

[...]

The imagery speaks a language older than words, connecting you to archetypal patterns that have guided humans through transitions since time immemorial...

[...]

Notice what elements of this card draw your eye first—this is your intuition highlighting what most needs your attention now...

[...]

Remember that each tarot image serves as both mirror and window—reflecting what already exists within while opening perspective to what might yet be possible... Trust the resonance you feel as you contemplate this messenger that has arrived at the threshold of your awareness."`
    }
};

const hinduExamples = {
    getExampleForDeity: () => {
        // Return the same mystical example for all deities
        return `"# The Divine Recognition
*A Sacred Darshan by Nayra*

Beloved, this deity arrives not as external force but as mirror of your own divine nature. See how their form speaks the language of your soul's current season...

[...]

Notice how their symbols are not mere ornaments but keys—each mudra a gateway, each attribute a teaching about consciousness itself...

[...]

In the mythology of this moment, you are both the devotee and the deity, the seeker and the sought. What appears as divine other is merely your own highest nature wearing a familiar face...

[...]

This presence whispers the secret all deities share: 'I am not here to be worshipped but to be recognized. You have been looking for me everywhere, yet I have always been looking through your own eyes.'

Remember, the divine doesn't arrive—it is revealed. And in this revelation, you discover that the temple you've been seeking has always been your own heart."`;
    }
};

const animalExamples = {
    /**
     * Categorize a tarot card into its appropriate Jungian archetype category
     * @param {string} cardName - The full name of the tarot card
     * @param {boolean} isReversed - Whether the card is reversed
     * @returns {string} The example text to use for this archetype type
     */
    getExampleForCard(cardName, isReversed = false) {
        const cardLower = cardName.toLowerCase().replace('reversed', '').trim();
        const cardIsReversed = isReversed || cardLower.includes('reversed') || cardName.includes('reversed');

        // Reversed cards represent shadow material seeking integration
        if (cardIsReversed) {
            // Shadow cards reversed often indicate integration beginning
            if (this.shadowCards.some(card => cardLower.includes(card.toLowerCase()))) {
                return this.examples.shadowIntegration;
            }
            // Otherwise standard reversed - unconscious material rising
            return this.examples.reversed;
        }

        // Check Major Arcana by Jungian categories
        if (this.shadowCards.some(card => cardLower.includes(card.toLowerCase()))) {
            return this.examples.shadow;
        }

        if (this.individuationCards.some(card => cardLower.includes(card.toLowerCase()))) {
            return this.examples.individuation;
        }

        if (this.transformationCards.some(card => cardLower.includes(card.toLowerCase()))) {
            return this.examples.transformation;
        }

        if (this.animaAnimusCards.some(card => cardLower.includes(card.toLowerCase()))) {
            return this.examples.animaAnimus;
        }

        if (this.personaCards.some(card => cardLower.includes(card.toLowerCase()))) {
            return this.examples.persona;
        }

        // Check Court cards - personality aspects
        if (this.courtRanks.some(rank => cardLower.includes(rank.toLowerCase()))) {
            return this.examples.personaAspects;
        }

        // Check Minor Arcana by psychological function
        if (cardLower.includes('cup') || cardLower.includes('chalice')) {
            return this.examples.feeling;
        }
        if (cardLower.includes('wand') || cardLower.includes('rod')) {
            return this.examples.intuition;
        }
        if (cardLower.includes('sword')) {
            return this.examples.thinking;
        }
        if (cardLower.includes('pentacle') || cardLower.includes('coin') || cardLower.includes('disk')) {
            return this.examples.sensation;
        }

        // Default example if no category matches
        return this.examples.default;
    },

    // Card category definitions based on Jungian archetypes
    shadowCards: [
        'Devil', 'Moon', 'Tower', 'Death', 'Nine of Swords', 'Five of Cups',
        'Five of Pentacles', 'Three of Swords', 'Eight of Swords'
    ],

    individuationCards: [
        'The Fool', 'Hermit', 'World', 'Star', 'Sun', 'Judgment'
    ],

    transformationCards: [
        'Death', 'Tower', 'Hanged Man', 'Temperance', 'Eight of Cups',
        'Six of Swords', 'Judgment'
    ],

    animaAnimusCards: [
        'High Priestess', 'Empress', 'Magician', 'Emperor', 'Lovers'
    ],

    personaCards: [
        'Emperor', 'Hierophant', 'Justice', 'Chariot'
    ],

    courtRanks: ['King', 'Queen', 'Knight', 'Page', 'Prince', 'Princess'],

    // Example text for each archetypal category
    examples: {
        reversed: `"# Unconscious Material Rising
*An Archetypal Integration by Nayra*

When this archetype appears reversed, it reveals aspects of your psyche that have been operating beneath conscious awareness. The animal energy presents itself inverted—not as negative, but as material ready for conscious integration.

[...]

In Jungian terms, this represents content from the personal or collective unconscious pushing toward consciousness. What has been repressed or ignored now demands acknowledgment...

[...]

Notice any resistance or discomfort—these are signals that important psychological work is available. The reversed position asks: What aspect of this energy have you denied or projected onto others?"`,

        shadowIntegration: `"# Embracing the Denied Self
*An Archetypal Reclamation by Nayra*

The shadow archetype reversed indicates that integration has begun. What once lurked in darkness now emerges into the light of consciousness—not to harm, but to complete you.

[...]

Jung said "One does not become enlightened by imagining figures of light, but by making the darkness conscious." This reversal shows your psyche ready to reclaim projected material...

[...]

The animal that once seemed threatening now reveals itself as a powerful ally. What you feared was actually your own unrecognized strength seeking acknowledgment."`,

        shadow: `"# Meeting the Shadow
*An Archetypal Confrontation by Nayra*

This archetype embodies what Jung called the Shadow—the rejected, repressed, and undeveloped aspects of your personality. The animal appearing represents qualities you've banished from conscious identity.

[...]

"Everyone carries a shadow," Jung wrote, "and the less it is embodied in the individual's conscious life, the blacker and denser it is." This energy appears not as enemy but as the missing piece of your wholeness...

[...]

Shadow work asks: What do you condemn in others that lives unacknowledged within yourself? What power have you given away by refusing aspects of your nature?"`,

        individuation: `"# The Journey to Wholeness
*An Archetypal Becoming by Nayra*

This archetype represents the individuation process itself—the psychological journey toward becoming who you truly are. The animal guide shows the path from fragmentation to integration.

[...]

Jung described individuation as "the process by which a person becomes a psychological 'in-dividual,' that is, a separate, indivisible unity or whole." This energy supports your unique becoming...

[...]

The appearance of this archetype asks: What authentic self seeks expression? How can you honor both your uniqueness and your connection to the collective?"`,

        transformation: `"# Death and Rebirth
*An Archetypal Metamorphosis by Nayra*

This archetype embodies the death-rebirth pattern—the psyche's way of facilitating profound transformation. The animal teacher shows that endings are beginnings in disguise.

[...]

In alchemical terms, this is the stage of dissolution before reconstitution. What must die is not you, but an outdated version of you that no longer serves your becoming...

[...]

Transformation asks: What identity have you outgrown? What awaits on the other side of this psychological death?"`,

        animaAnimus: `"# The Contrasexual Soul
*An Archetypal Union by Nayra*

This archetype represents the Anima (in masculine psyches) or Animus (in feminine psyches)—the contrasexual aspect that bridges conscious and unconscious realms. The animal embodies your soul's opposite nature.

[...]

Jung saw this as crucial for individuation: "The encounter with the anima/animus is the masterpiece." This energy invites integration of what seems foreign but is actually essential...

[...]

This archetype asks: What qualities of the opposite have you rejected in yourself? How might embracing these aspects create inner wholeness?"`,

        persona: `"# The Mask and the Face
*An Archetypal Recognition by Nayra*

This archetype represents the Persona—the mask you wear in social situations. The animal shows both the necessity and limitation of your adapted self.

[...]

Jung distinguished between healthy persona (conscious role-playing) and identification with persona (confusing mask with self). This energy helps you recognize the difference...

[...]

The Persona asks: Where have you confused your role with your identity? How can you wear necessary masks without losing authentic self?"`,

        personaAspects: `"# Aspects of Personality
*An Archetypal Mirror by Nayra*

Court cards represent differentiated aspects of personality—not who you are but capacities you possess. The animal reflects a particular mode of being in the world.

[...]

These represent what Jung called "functional types"—different ways consciousness can be organized and expressed. Each aspect serves specific purposes in your psychological economy...

[...]

This aspect asks: How developed is this capacity within you? When does this energy serve, and when does it limit?"`,

        feeling: `"# The Feeling Function
*An Archetypal Immersion by Nayra*

Cups represent the feeling function—the psyche's capacity to evaluate through emotional resonance. The animal guide navigates these waters of the heart.

[...]

Jung distinguished feeling from emotion: feeling is a rational function that assigns value, while emotion is affect. This archetype helps develop conscious relationship with both...

[...]

The feeling function asks: What does your heart know that your head denies? How can you trust emotional intelligence as valid guidance?"`,

        intuition: `"# The Intuitive Function
*An Archetypal Knowing by Nayra*

Wands represent the intuitive function—perception through the unconscious, knowing without knowing how you know. The animal embodies this fire of direct insight.

[...]

Jung saw intuition as "perception via the unconscious"—a function that perceives possibilities and connections beyond sensory data. This archetype awakens dormant intuitive capacities...

[...]

Intuition asks: What do you know beyond evidence? How can you trust the lightning strikes of inner knowing?"`,

        thinking: `"# The Thinking Function
*An Archetypal Clarity by Nayra*

Swords represent the thinking function—the psyche's capacity for discrimination, analysis, and objective judgment. The animal guide cuts through confusion with clarity.

[...]

Jung emphasized that thinking as a function differs from intelligence—it's about how consciousness organizes and evaluates information. This archetype develops discernment...

[...]

The thinking function asks: Where does clarity serve and where does it cut? How can you wield discrimination without losing connection?"`,

        sensation: `"# The Sensation Function
*An Archetypal Grounding by Nayra*

Pentacles represent the sensation function—consciousness of physical reality through the senses. The animal teacher grounds spiritual insight in material existence.

[...]

Jung recognized sensation as equally valuable to other functions—the psyche's way of confirming "what is" through tangible experience. This archetype honors embodied wisdom...

[...]

Sensation asks: What does your body know? How can you trust physical reality as spiritual teacher?"`,

        default: `"# Universal Pattern Emerging
*An Archetypal Recognition by Nayra*

This archetype emerges from the collective unconscious carrying patterns that transcend personal experience. The animal guide connects you to timeless wisdom.

[...]

Every archetype serves as what Jung called a "primordial image"—a universal pattern that takes specific form in your unique life. This energy seeks conscious recognition...

[...]

This pattern asks: How does this universal theme express in your personal story? What collective wisdom speaks through your individual experience?"`
    }
};

const orixaExamples = {
    getExampleForOrixa: () => {
        return `"# The Living Force Recognized
*An Orixá Reading by Nayra*

Beloved, this Orixá doesn't arrive—they've always been moving through your days. Feel them in the elements around you, in the rhythms of your own body...

[...]

Each Orixá is nature itself wearing a face you can recognize. Not distant deity but present force—in your breath, your heartbeat, your steps upon the earth...

[...]

Notice where this energy already dances in your life. Perhaps in how you move when no one watches, in what calls to you from the natural world, in the emotions that flow like rivers through your being...

[...]

This presence whispers the secret all Orixás share: 'I am not separate from life—I AM life expressing itself. You don't need to find me. You need only recognize where I already flow through your existence.'

The forces of nature don't visit—they inhabit. And in recognizing them, you remember that you too are force of nature, dressed temporarily in human form."`;
    }
};

