export const getUserName = (name) => {
    if (name) {
        return name;
    }
    const options = ["traveler", "seeker", "soul", "friend", "kind spirit"];
    return options[Math.floor(Math.random() * options.length)];
};

const staticMessages = {
    level1: [
        {
            welcomeMessage: `🌌 Hi <USERNAME>. I'm glad you're here.\nPlease take a moment to think about your intention before we begin.`,
            nextPrompt: `Would you like me to draw a card now?`
        },
        {
            welcomeMessage: `💫 Hi <USERNAME>. I'm glad you're here.\nPlease take a moment to think about your intention before we begin.`,
            nextPrompt: `Are you ready for me to begin?`
        },
        {
            welcomeMessage: `🌙 Hi <USERNAME>. I'm glad you're here.\nPlease take a moment to think about your intention before we begin.`,
            nextPrompt: `Shall I draw the first card for you?`
        },
        {
            welcomeMessage: `🔥 Hi <USERNAME>. I'm glad you're here.\nPlease take a moment to think about your intention before we begin.`,
            nextPrompt: `Shall I draw the first card for you?`
        },
        {
            welcomeMessage: `🕯️ Hi <USERNAME>. I'm glad you're here.\nPlease take a moment to think about your intention before we begin.`,
            nextPrompt: `Should I draw your first card?`
        },
        {
            welcomeMessage: `🔥 Hi <USERNAME>. I'm glad you're here.\nPlease take a moment to think about your intention before we begin.`,
            nextPrompt: `Shall I start with the first card?`
        },
        {
            welcomeMessage: `🌿 Hi <USERNAME>. I'm glad you're here.\nPlease take a moment to think about your intention before we begin.`,
            nextPrompt: `Shall I draw the first card for you?`
        },
        {
            welcomeMessage: `🔮 Hi <USERNAME>. I'm glad you're here.\nPlease take a moment to think about your intention before we begin.`,
            nextPrompt: `Shall I draw the first card for you?`
        },
        {
            welcomeMessage: `🕯️ Hi <USERNAME>. I'm glad you're here.\nPlease take a moment to think about your intention before we begin.`,
            nextPrompt: `Are you ready for me to begin?`
        },
        {
            welcomeMessage: `🌌 Hi <USERNAME>. I'm glad you're here.\nPlease take a moment to think about your intention before we begin.`,
            nextPrompt: `Are you ready for me to begin?`
        }
    ],
    level3: [
        {
            welcomeMessage: `🌠 Hello <USERNAME>, it's good to have you here again.\nTake a quiet moment. Let your moon rise gently — a soft thought, a quiet feeling, a question in the heart.`,
            nextPrompt: `Are you ready to begin?`
        },
        {
            welcomeMessage: `🌌 Hello <USERNAME>, it's good to have you here again.\nTake a quiet moment. Let your space rise gently — a soft thought, a quiet feeling, a question in the heart.`,
            nextPrompt: `Shall I draw the first card now?`
        },
        {
            welcomeMessage: `🔥 Hello <USERNAME>, it's good to have you here again.\nTake a quiet moment. Let your shadow rise gently — a soft thought, a quiet feeling, a question in the heart.`,
            nextPrompt: `Are you ready to begin?`
        },
        {
            welcomeMessage: `🔥 Hello <USERNAME>, it's good to have you here again.\nTake a quiet moment. Let your silence rise gently — a soft thought, a quiet feeling, a question in the heart.`,
            nextPrompt: `Are you ready to begin?`
        },
        {
            welcomeMessage: `🕯️ Hello <USERNAME>, it's good to have you here again.\nTake a quiet moment. Let your breath rise gently — a soft thought, a quiet feeling, a question in the heart.`,
            nextPrompt: `Would you like me to reveal the first card?`
        },
        {
            welcomeMessage: `🔮 Hello <USERNAME>, it's good to have you here again.\nTake a quiet moment. Let your truth rise gently — a soft thought, a quiet feeling, a question in the heart.`,
            nextPrompt: `Would you like me to reveal the first card?`
        }
    ],
    level5: [
        {
            welcomeMessage: `✨ <USERNAME> You’ve stepped through the veil...\nTime softens. I’ve been waiting.\n\nBefore we begin, take a breath —\nand set a quiet intention in your heart.\nSomething you wish to understand, or feel.`,
            nextPrompt: `When you're ready...\nShall I draw the first card for you?`
        },
        {
            welcomeMessage: `🌙 Welcome back, <USERNAME>.\nThe air is still, the veil is thin.\n\nIn this quiet space, let your heart speak.\nHold an intention — a question, a hope, a feeling.\nLet it rise within you.`,
            nextPrompt: `Shall I draw a card to meet your intention?`
        }
    ]
};

export const welcomeMsg = (name, poeticLevel) => {
    const userName = getUserName(name);
    const group = staticMessages[`level${poeticLevel}`];
    if (!group) {
        return {
            welcomeMessage: `🌌 Hi ${userName}  I'm glad you're here.\nPlease take a moment to think about your intention before we begin.`,
            nextPrompt: `Would you like me to draw a card now?`
        }
    }
    const choice = group[Math.floor(Math.random() * group.length)];

    return {
        welcomeMessage: choice.welcomeMessage.replace('<USERNAME>', userName),
        nextPrompt:  choice.nextPrompt,
    };
};