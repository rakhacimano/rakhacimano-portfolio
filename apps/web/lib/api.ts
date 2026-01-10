// Use relative URL for same-origin API calls (works in both dev and production)
const API_URL = '/api';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            cache: 'no-store', // Always fetch fresh data
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`API Error [${res.status}]:`, errorText);
            throw new Error(`API fetch failed: ${res.status} - ${errorText}`);
        }

        return res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            console.error('Network error:', error);
            throw new Error('Cannot connect to API. Please try again.');
        }
        throw error;
    }
}
