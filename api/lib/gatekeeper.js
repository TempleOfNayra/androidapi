const stepBasedRateLimit = new Map();
const flatRateLimit = new Map();

const CLEAN_CHANCE = 0.01;

const DEFAULT_STEP_LIMITS = {
    interpretation: 1,   // AI-heavy
    card_detail: 20,     // Lightweight
    first_draw: 20,      // Lightweight
    welcome: 30,         // Very cheap
    general: 10          // Fallback
};

function cleanRateMap(map, cutoffMinute) {
    for (const key of map.keys()) {
        const keyMinute = parseInt(key.split('_').pop());
        if (keyMinute < cutoffMinute) {
            map.delete(key);
        }
    }
}

export function checkAuthAndRateLimit(req, step = 'general') {
    const API_KEY = process.env.NAYRA_API_KEY;
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== API_KEY) {
        return { allowed: false, status: 403, error: 'Unauthorized' };
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    const minute = Math.floor(Date.now() / 60000);
    const key = `${ip}_${step}_${minute}`;

    if (Math.random() < CLEAN_CHANCE) {
        cleanRateMap(stepBasedRateLimit, minute - 2);
    }

    const limit = DEFAULT_STEP_LIMITS[step] || DEFAULT_STEP_LIMITS.general;
    const count = stepBasedRateLimit.get(key) || 0;

    if (count >= limit) {
        return { allowed: false, status: 429, error: 'Too many requests' };
    }

    stepBasedRateLimit.set(key, count + 1);
    return { allowed: true };
}

export function checkFlatAuthAndLimit(req, limit = 10) {
    const API_KEY = process.env.NAYRA_API_KEY;
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== API_KEY) {
        return { allowed: false, status: 403, error: 'Unauthorized' };
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    const minute = Math.floor(Date.now() / 60000);
    const key = `${ip}_${minute}`;

    if (Math.random() < CLEAN_CHANCE) {
        cleanRateMap(flatRateLimit, minute - 2);
    }

    const count = flatRateLimit.get(key) || 0;

    if (count >= limit) {
        return { allowed: false, status: 429, error: 'Too many requests' };
    }

    flatRateLimit.set(key, count + 1);
    return { allowed: true };
}