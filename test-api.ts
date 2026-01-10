
// import { fetch } from 'undici';

const check = async () => {
    try {
        const url = 'http://localhost:4000/api/projects/saas-marketing-site';
        console.log(`Fetching ${url}...`);
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);
        if (res.ok) {
            const data = await res.json();
            console.log('Project found:', data.title);
        } else {
            const txt = await res.text();
            console.log('Error:', txt);
        }
    } catch (e) {
        console.error('Fetch failed:', e);
    }
};

check();
