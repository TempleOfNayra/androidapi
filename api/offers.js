import { checkFlatAuthAndLimit } from './lib/gatekeeper.js';

// export const config = {
//     runtime: 'nodejs',
// };
//
const REVENUE_CAT_API_KEY = process.env.REVENUECAT_SECRET_KEY;
const RC_ENDPOINT = 'https://api.revenuecat.com/v1/receipts';

// async function fetchSubscriptionCount() {
//     let page = 1;
//     let totalCount = 0;
//     let hasMore = true;
//
//     const subscriptionIds = ['founders_77', 'adopters_777', 'birds_7777', 'sacred_path'];
//
//     while (hasMore && page <= 5) {
//         const res = await fetch(`${RC_ENDPOINT}?page=${page}&page_size=100`, {
//             headers: {
//                 Authorization: `Bearer ${REVENUE_CAT_API_KEY}`,
//                 'Content-Type': 'application/json',
//             }
//         });
//
//         if (!res.ok) throw new Error(`RevenueCat error: ${res.status}`);
//         const data = await res.json();
//         const receipts = data.receipts || [];
//
//         const subs = receipts.filter(r =>
//             subscriptionIds.includes(r.product_identifier)
//         );
//
//         totalCount += subs.length;
//         hasMore = receipts.length === 100;
//         page += 1;
//     }
//
//     return totalCount;
// }

export default async function handler(req, res) {
    // const auth = checkFlatAuthAndLimit(req);
    // if (!auth.allowed) {
    //     return res.status(auth.status).json({ error: auth.error });
    // }

    try {
        // const total = await fetchSubscriptionCount();
        const total = 70;
        let offeringId = 'sacred_path';
        if (total < 77) {
            offeringId = 'founders_77';
        } else if (total < 777) {
            offeringId = 'adopters_777';
        } else if (total < 7777) {
            offeringId = 'birds_7777';
        }

        return res.status(200).json({ offeringId, total });
    } catch (err) {
        console.error('[offers.js] RevenueCat error:', err);
        return res.status(500).json({ error: 'Internal error' });
    }
}