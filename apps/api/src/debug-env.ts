
import dotenv from 'dotenv';
import path from 'path';

// Explicitly load .env from current directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { createClient } from '@supabase/supabase-js';

console.log('--- ENV DEBUG ---');
console.log('CWD:', process.cwd());
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Present' : 'MISSING');
console.log('SUPABASE_KEY:', process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ? 'Present' : 'MISSING');

try {
    console.log('Supabase JS found.');
    const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://missing.com',
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'missing'
    );
    console.log('Client created successfully.');
} catch (e: any) {
    console.error('Supabase Init Error:', e.message);
}
