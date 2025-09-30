// HTTP utility functions for iOS API

export function setupCORS(res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.nayra.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');
}

export function handlePreflight(req, res) {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }
    return false;
}

export function validateMethod(req, res, method) {
    if (req.method !== method) {
        res.status(405).json({ error: "Method not allowed" });
        return false;
    }
    return true;
}