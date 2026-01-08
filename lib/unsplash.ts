import { createApi } from 'unsplash-js';

// Initialize the Unsplash API
// Note: You must add NEXT_PUBLIC_UNSPLASH_ACCESS_KEY to your .env.local file
export const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'YOUR_ACCESS_KEY',
    // fetch: fetch, // Next.js polyfills fetch, but explicit passing might be needed in some envs
});

export const projectImageIds = [
    'mxPiMiz7KCo',
    'o1SKqmgSDbg',
    'j9mgwCIOCSc',
    'yapBRdPWxik'
];

export async function fetchProjectImages() {
    try {
        const result = await unsplash.photos.get({ photoId: projectImageIds[0] }); // Just checking one to see if API works, or use list?
        // Better: Fetch multiple. Unsplash-js doesn't have a specific "get multiple by IDs" endpoint easily exposed that isn't 'list'.
        // We can loop.

        const validIds = projectImageIds;
        const requests = validIds.map(id => unsplash.photos.get({ photoId: id }));
        const responses = await Promise.all(requests);

        // transform to a simple map or array
        const images = responses.map(r => {
            if (r.errors) {
                console.error('Unsplash Error:', r.errors);
                return null;
            }
            return r.response;
        });

        return images;
    } catch (error) {
        console.error("Failed to fetch Unsplash images", error);
        return [];
    }
}
