import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
    if (!_supabase) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase URL or Key missing in environment variables');
        }

        _supabase = createClient(supabaseUrl, supabaseKey);
    }
    return _supabase;
}

// Re-export for backwards compatibility (lazily initialized)
export const supabase = new Proxy({} as SupabaseClient, {
    get(_, prop) {
        return (getSupabase() as any)[prop];
    }
});
