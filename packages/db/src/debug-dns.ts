
import dns from 'dns';

const host = 'db.ppmplykbiwnftsrrxbuw.supabase.co';

console.log(`Looking up ${host}...`);

dns.lookup(host, (err, address, family) => {
    if (err) {
        console.error('DNS Lookup Error:', err);
    } else {
        console.log(`Address: ${address}, Family: IPv${family}`);
    }
});

dns.resolve(host, (err, addresses) => {
    if (err) {
        console.error('DNS Resolve Error:', err);
    } else {
        console.log('Resolved Addresses:', addresses);
    }
});
