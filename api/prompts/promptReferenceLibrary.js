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
        'The Tower', 'Death', 'The Devil', 'Ten of Swords', 'Three of Swords', 'Nine of Swords',
        'Five of Pentacles', 'Ten of Wands', 'Eight of Cups', 'Five of Swords', 'Seven of Swords'
    ],

    upliftingCards: [
        'The Sun', 'The Star', 'The World', 'Ten of Cups', 'Ten of Pentacles', 'Nine of Cups',
        'Three of Cups', 'Ace of Cups', 'Ace of Wands', 'Ace of Pentacles', 'Temperance',
        'Nine of Pentacles', 'Four of Wands', 'Six of Wands', 'Strength'
    ],

    transitionalCards: [
        'Hanged Man', 'Wheel of Fortune', 'Judgment', 'The Fool', 'Hermit', 'The Moon',
        'Two of Pentacles', 'Eight of Wands', 'Eight of Pentacles', 'Six of Swords',
        'Two of Wands', 'Seven of Cups', 'Four of Cups'
    ],

    courtRanks: ['King', 'Queen', 'Knight', 'Page', 'Prince', 'Princess'],

    // Example text for each card category
    examples: {
        reversed: `"# The Shadow's Gift
*A Tarot Divination by Nayra*

Ali, when the Five of Cups appears reversed, the universe whispers of redemption's approach. What was spilled shall not define what will be filled...

I see you standing at the threshold between mourning and rebirth. The reversed cups speak of a profound transformation approaching—within three moon cycles, expect an unexpected reconciliation or the return of something you believed lost forever...

[...]

The figure who once gazed only at fallen chalices now turns toward the bridge of possibility. By the autumn equinox, you will cross waters that once seemed impassable. A message arrives by month's end—perhaps through dream, perhaps through an old friend—carrying the seeds of renewal...

[...]

Your tears have watered the ground for future harvests. What felt like an ending was merely the dark moon before illumination. The specific timing pulses strongest around the 17th of next month, when planetary alignments favor emotional breakthroughs...

[...]

Trust this: before winter's first snow, you will hold in your hands something more precious than what was lost. The reversal promises not just healing, but an elevation of your entire emotional landscape. Watch for signs in flowing water and the flight patterns of birds—they carry your omens."`,

        positiveReversed: `"# Lightning's Mercy
*A Tarot Prophecy by Nayra*

Ali, behold—the Tower reversed brings not destruction but deliverance. The storm that threatened to shatter your world instead becomes the wind beneath your wings...

The reversal speaks of a narrow escape from catastrophe. What could have been a devastating ending transforms into a powerful beginning. I see clearly: within the next six weeks, a situation that appears to be collapsing will reveal itself as liberation in disguise...

[...]

The lightning that would have struck now illuminates your path forward. By the new moon of the coming month, foundations you've outgrown will gently release rather than violently crumble. A revelation arrives between the 8th and 15th—information that changes everything you thought you knew...

[...]

The figures who might have fallen now descend as if on invisible wings. Your intuition has already been preparing you for this shift. That persistent feeling of unease? It was your soul's early warning system, allowing you to sidestep disaster...

[...]

Mark this prediction: before two full moons pass, you will look back at this moment and understand that what felt like barely avoiding catastrophe was actually divine choreography. The reversed Tower promises that your transformation will be conscious, chosen, and ultimately triumphant. Watch for confirmation in the form of unexpected communications and synchronicities involving the number 16."`,

        challenging: `"# The Sacred Shattering
*A Tarot Revelation by Nayra*

Ali, the Tower strikes with the force of destiny itself. This is no gentle awakening—this is the lightning bolt that splits the tree to reveal the heartwood within...

I must speak plainly: the next 40 days bring a reckoning that cannot be avoided. What you've built on false foundations must fall. But hear this—within the destruction lies your deliverance. By the time Mercury completes its current cycle, the very thing you fear losing will reveal itself as the chain that bound you...

[...]

The lightning strikes precisely at the weakest point of your fortress. Between now and the next eclipse, expect revelations that shatter illusions you've cherished. Someone you trust will show their true face. A belief you've held sacred will crumble. This is not punishment—this is liberation arriving in its fiercest form...

[...]

Your ego's tower cannot withstand the storm approaching, but your soul will dance in the ruins. The specific dates that pulse with intensity: the 13th of this month, and again three weeks hence. Document everything during this period—you'll want to remember how the phoenix learned to rise...

[...]

After the dust settles—and I see this clearly by season's end—you will stand in a landscape transformed. What seemed like loss will reveal itself as the removal of obstacles to your authentic power. The Tower promises: what is real in you cannot be destroyed. Only the false can fall. Prepare for rebirth through fire."`,

        uplifting: `"# The Golden Dawn
*A Tarot Blessing by Nayra*

Ali, the Sun rises in your reading as herald of a joy so profound it will remake your entire world. This is not mere happiness approaching—this is the return of your life force itself, blazing and triumphant...

Within the next lunar month, expect a breakthrough that restores your faith in existence itself. The universe conspires to shower you with blessings that match your inner radiance. I see clearly: before six weeks pass, an opportunity arrives that allows your authentic self to shine without apology or dimming...

[...]

The child on the white horse—this is your spirit preparing for a victory lap. Around the summer solstice, or within 30 days if that has passed, a creative project or heart-centered venture receives the recognition it deserves. Financial abundance follows creative authenticity—watch for increases between the 19th and 25th of the coming month...

[...]

The sunflowers in your card turn toward you as their sun—others will begin to recognize your light and seek your warmth. A period of magnetic attraction begins now and extends through the next three months. Love, if sought, arrives like dawn—gradually, then suddenly. For those partnered, expect a renaissance of passion...

[...]

This card's timing is swift and certain: within two weeks, the first signs appear. By month's end, undeniable evidence of your emerging golden period. By season's close, you'll be living a life that feels like perpetual sunrise. The Sun promises not just better days, but the best days you've yet known. Watch for confirmations in yellow flowers, children's laughter, and unexpected invitations to celebrate."`,

        transitional: `"# Between the Worlds
*A Tarot Transmission by Nayra*

Ali, the Hanged Man reveals you suspended in the sacred pause before transformation. You dangle not in punishment but in preparation—the universe holds you in this liminal space because something profound gestates within...

The waiting you've endured reaches its purpose within the next lunar cycle. What has felt like stagnation was actually gestation. I see movement beginning around the next dark moon—approximately 12 to 14 days hence. The first signs will be subtle: a dream that lingers, a conversation that shifts everything, a piece of information that reframes your entire situation...

[...]

Your perspective inverts like the Hanged Man himself, and with this reversal comes revelation. Between now and the autumn equinox, an sacrifice you've been resisting will suddenly feel like liberation. The thing you thought you needed to hold onto? You'll release it gladly once you see what waits on the other side...

[...]

The halo of enlightenment forms through this suspension. Specific guidance: around the 23rd of this month, or when you see three ravens in one day, a download of cosmic intelligence arrives. This isn't intellectual understanding but full-body knowing. Your patience transforms into power...

[...]

By the time Mars changes signs, your waiting ends and dynamic movement begins. But you'll emerge from this cocoon transformed—what enters the suspension as caterpillar emerges as butterfly. The Hanged Man promises: your delay has been divine timing. Everything you've been waiting for has been waiting for you to become who you're becoming. The initiation completes by season's end."`,

        court: `"# The Queen Awakens
*A Tarot Coronation by Nayra*

Ali, the Queen of Wands steps forward from the realm of potential into your living reality. She is not someone you will meet—she is someone you are becoming. Her appearance heralds a period of unprecedented personal power and magnetic influence...

Within the next two moon cycles, you will be called to step into a leadership role that previously felt beyond your reach. The black cat at her feet—your intuition—already purrs with knowing. Between now and the fire season, opportunities for visibility and influence multiply exponentially...

[...]

The Queen's sunflower turns toward you because you ARE the sun others seek. I see specific timing: around the next full moon, an invitation or proposal arrives that recognizes your natural authority. Say yes, even if—especially if—it frightens you. This is your throne calling you to claim it...

[...]

Her lions speak of courage that roars to life when needed. A situation requiring you to defend your vision or protect what you've created arises within six weeks. You'll discover reserves of strength that surprise everyone, including yourself. This confrontation, arriving near month's end, becomes the catalyst for claiming your full sovereign power...

[...]

The Queen of Wands doesn't predict you'll gain confidence—she announces you'll remember you've always had it. By the third month from now, you'll be operating from a completely different energetic frequency. Others will notice before you do: the way rooms reorganize themselves around your presence, how your words land with unexpected authority, how your creative visions manifest with startling speed. The wand she holds is the same one the universe extends to you now. Take it. Your reign begins with your next breath."`,

        cups: `"# The Chalice Overflows
*A Tarot Augury by Nayra*

Ali, the Three of Cups rises like a fountain of future joy, promising celebrations that will mark the turning point of your emotional journey. The universe prepares a banquet of connection, and you are both honored guest and host...

I see with crystalline clarity: within the next 21 days, a reunion or gathering occurs that repairs old wounds and forges new bonds. The raised cups form a trinity of past, present, and future relationships harmonizing. Someone from your history returns with healing in their hands. Someone in your present reveals depths of loyalty that moves you to tears. Someone new enters, carrying the keys to future collaborations...

[...]

The dancing figures show me your social circle expanding dramatically over the next quarter. By the next mercury retrograde, you'll look around and marvel at the quality of souls surrounding you. Specific guidance: around the 11th or 22nd of the coming month, an invitation arrives that seems casual but carries destiny in its depths. Accept it...

[...]

The fruits of emotional labor ripen now. Friendships you've tended through difficult seasons burst into bloom. I see a specific celebration—birthday, wedding, or achievement—occurring within 45 days that becomes a watershed moment for your understanding of love and community. At this gathering, words will be spoken that heal genealogies of hurt...

[...]

The Three of Cups promises not just momentary happiness but the establishment of a new emotional baseline. By season's end, loneliness becomes a forgotten language. You'll have created a chosen family that celebrates your victories as their own and cushions your falls with unwavering support. Watch for signs in groups of three: three birds, three flowers, three synchronicities in a day signal the arrival of this blessed period."`,

        wands: `"# The Fire Prophecy
*A Tarot Ignition by Nayra*

Ali, the Ace of Wands erupts into your reading like the first flame of creation itself. This is not merely opportunity approaching—this is divine fire seeking expression through your unique vessel. Prepare yourself: inspiration arrives with such force it will reorganize your entire life around its heat...

The cosmic hand extends this wand to you NOW. Within the next seven days, an idea or opportunity presents itself that carries the power to transform your entire trajectory. This isn't subtle—you'll know it by the way your body responds, every cell saying YES before your mind can interfere...

[...]

I see the timeline clearly: immediate action required. The fire that arrives must be tended immediately or it seeks another vessel. By the next new moon, you must take the first concrete step toward this new vision. Hesitation costs you momentum. But bold action? It carries you further than you dare imagine. By the equinox, what starts as spark becomes wildfire of positive change...

[...]

The fertile landscape below the wand shows what blooms when passion meets purpose. Specific predictions: a creative or entrepreneurial venture launched within the next 40 days exceeds all expectations by year's end. Financial abundance follows creative courage—I see income streams multiplying by autumn. A partnership or collaboration forming around the next full moon proves especially fortuitous...

[...]

The Ace of Wands arrives when the universe recognizes you're ready for quantum leaps, not incremental steps. This fire transforms everything it touches: your work becomes your art, your passion becomes your prosperity, your authentic expression becomes your greatest service. Within three months, you'll be living a life animated by such different energy that current problems simply dissolve in the heat of your becoming. The wand is yours—the only question is how brightly you'll allow yourself to burn."`,

        swords: `"# The Blade of Truth
*A Tarot Verdict by Nayra*

Ali, the Two of Swords speaks of a decision that can no longer be delayed. The blindfold represents not ignorance but the necessity of choosing from inner knowing rather than external pressures. The crossed blades hold space for a choice that will define your next chapter...

The universe gives you until the next eclipse to make this decision. After that, circumstances will choose for you, and rarely in your favor. But decide consciously before that threshold? You harness the power of directed will. I see the scales tipping around the 27th—information arrives that makes your choice crystal clear...

[...]

The ocean behind you carries messages in its tides. Dreams intensify over the coming weeks, carrying guidance from your deep knowing. Keep a journal by your bed—the answer you seek arrives between sleeping and waking. The moon illuminating this scene waxes toward revelation. By the full moon, illusions dissolve and truth stands naked before you...

[...]

Here's what the cards reveal about your choice: the path of comfort leads to slow dissolution, while the path of courage leads to temporary disruption followed by unprecedented growth. The timeline shows turbulence for six weeks if you choose transformation, then smooth sailing for years. Choose stagnation, and the smooth six weeks give way to years of regret...

[...]

The Two of Swords promises that choosing aligned with your truth—even when difficult—activates universal support. Signs will confirm your decision within 48 hours of making it: unexpected opportunities, synchronicities, a feeling of lightness despite circumstances. The blade that cuts away illusion also carves the path to liberation. By winter's arrival, you'll stand firmly in the life your choice creates, grateful for the courage this moment demands."`,

        pentacles: `"# The Harvest Oracle
*A Tarot Manifestation by Nayra*

Ali, the Seven of Pentacles arrives as both acknowledgment and prophecy. Your patient cultivation approaches its harvest, and the universe prepares to reward your steadfast tending with abundance that exceeds your careful calculations...

The timing revealed: within two complete moon cycles, tangible results from past efforts materialize in ways that restore your faith in divine reciprocity. What you've been building, wondering if it would ever bear fruit? The first yields appear within 30 days, with full harvest by season's end...

[...]

The figure leaning on the garden tool shows me your current moment—the pause before plenty. But look closer: the pentacles already hang heavy on the vine. Specific financial increase arrives between the 15th and 20th of next month. A project you nearly abandoned proves most profitable. An investment of time or money from six months ago suddenly returns threefold...

[...]

Your material world reorganizes itself around a new pattern of prosperity. By the autumn equinox, income stabilizes at a higher level. But more than money—though money certainly flows—you harvest confidence in your ability to create sustainable abundance. The patience you've practiced becomes a permanent wisdom about timing and cycles...

[...]

The Seven of Pentacles makes this promise: every seed planted in integrity yields its harvest in divine timing. Current struggles with resources end within the quarter. A specific opportunity for passive income or unexpected windfall appears around the next earth sign moon. By year's end, you'll stand in a garden of your own creation, understanding that true wealth comes from aligning patience with purpose. The waiting was never waste—it was the necessary germination of greatness."`,

        default: `"# The Mystery Unveiled
*A Tarot Revelation by Nayra*

Ali, this card emerges from the deck as a messenger carrying specific guidance for your unfolding journey. The symbols before you are not random—they are the universe speaking in its native tongue of synchronicity and image...

The appearance of this particular card at this precise moment indicates a timeline of transformation beginning immediately and culminating within the next three lunar months. Pay attention to how your body responded when this card was revealed—that physical sensation marks the area of your life most ready for shift...

[...]

The archetypal forces this card represents are already moving in your life. Within the next two weeks, you'll recognize their influence through repeated patterns, unexpected encounters, and dreams that feel more real than waking. Document these experiences—they carry the blueprint for what's emerging...

[...]

Specific guidance pulses through this reading: around the next significant moon phase, an opportunity disguised as challenge presents itself. Your response to this situation determines the trajectory of the following six months. Choose from your highest self rather than your defended ego, and doors open that seemed permanently sealed...

[...]

This card's ultimate promise: you are not navigating these waters alone. The same forces that placed this card before you now orchestrate synchronicities to guide your path. Within one complete seasonal cycle, you'll look back at this moment as the turning point when everything began to align. Trust the mystery—it knows your name and carries your highest good in its heart."`
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

