
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

try {
    fs.appendFileSync('db-debug.log', `[Client] URL: ${supabaseUrl}, Key Length: ${supabaseKey.length}\n`);
} catch { }

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase URL or Key missing in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
