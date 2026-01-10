
import dns from 'dns';

const domains = [
    'ppmplykbiwnftsrrxbuw.supabase.co',
    'db.ppmplykbiwnftsrrxbuw.supabase.co',
    'aws-0.db.ppmplykbiwnftsrrxbuw.supabase.co'
];

domains.forEach(host => {
    console.log(`\n--- Looking up ${host} ---`);
    dns.lookup(host, (err, address, family) => {
        if (err) {
            console.error(`[lookup] Error for ${host}:`, err.code);
        } else {
            console.log(`[lookup] Success: ${address} (IPv${family})`);
        }
    });
});
