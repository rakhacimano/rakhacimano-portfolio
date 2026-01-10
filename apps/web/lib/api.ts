// Use absolute URL for server-side calls, relative for client-side
const getBaseUrl = () => {
    if (typeof window !== 'undefined') return ''; // Browser should use relative path
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    return 'http://localhost:3000';
};

const API_URL = `${getBaseUrl()}/api`;

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
